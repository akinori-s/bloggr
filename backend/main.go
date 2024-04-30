package main

import (
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/akinori-s/bloggr/internal/model"
	"github.com/akinori-s/bloggr/internal/repository"
	"github.com/akinori-s/bloggr/internal/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Application struct {
	db *gorm.DB
}

func main() {
	router := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:5173",
	}
	config.MaxAge = 12 * time.Hour
	config.AllowCredentials = true
	router.Use(cors.New(config))

	db, err := InitDB()
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	app := Application{db: db}

	api := router.Group("/api")
	{
		api.POST("/login", app.LoginHandler)
		api.POST("/register", app.RegisterHandler)
		api.POST("/logout", app.LogoutHandler)

		profiles := api.Group("/profiles")
		{
			profiles.GET("/", app.GetProfilesHandler)
		}

		user := api.Group("/:user_id")
		{
			profile := user.Group("/profile")
			{
				profile.GET("/", app.GetProfileHandler)
				profile.PATCH("/", app.UpdateProfileHandler)
				profile.DELETE("/", app.DeleteProfileHandler)
			}
			blog := user.Group("/blog")
			{
				blog.GET("/", app.GetBlogsHandler)
				blog.GET("/:blog_id/", app.GetBlogHandler)
				blog.POST("/", app.CreateBlogHandler)
				blog.PATCH("/", app.UpdateBlogHandler)
				blog.DELETE("/:blog_id/", app.DeleteBlogHandler)
			}
		}
	}

	err = router.Run(":8080")
	if err != nil {
		log.Fatalf("failed to run server: %v", err)
	}
}

func InitDB() (*gorm.DB, error) {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// create db connection using gorm
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	sqlDB.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func (app *Application) LoginHandler(c *gin.Context) {}

func (app *Application) RegisterHandler(c *gin.Context) {
	user := &model.User{}
	if err := c.BindJSON(user); err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user object in request",
		})
		return
	}
	err := service.NewAuthService(
		repository.NewUserRepository(app.db),
	).RegisterUser(user)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to register user",
		})
		return
	}
	c.JSON(200, gin.H{})
}

func (app *Application) LogoutHandler(c *gin.Context) {}

func (app *Application) GetProfilesHandler(c *gin.Context) {
	res, err := service.NewProfileService(
		repository.NewUserRepository(app.db),
	).GetProfiles()
	if res == nil && errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{
			"error": "not profiles found",
		})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to get profiles",
		})
		return
	}
	c.JSON(200, res)
}

func (app *Application) GetProfileHandler(c *gin.Context) {
	userID := c.Param("user_id")
	id, err := strconv.Atoi(userID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user id",
		})
		return
	}
	res, err := service.NewProfileService(
		repository.NewUserRepository(app.db),
	).GetProfile(id)
	if res == nil && errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{
			"error": "profile not found",
		})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to get profile",
		})
		return
	}
	c.JSON(200, res)
}

func (app *Application) UpdateProfileHandler(c *gin.Context) {
	userID := c.Param("user_id")
	id, err := strconv.Atoi(userID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user id",
		})
		return
	}
	user := &model.UpdateUserRequest{}
	if err := c.BindJSON(user); err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user object in request",
		})
		return
	}
	user.ID = id
	err = service.NewProfileService(
		repository.NewUserRepository(app.db),
	).UpdateProfile(user)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to update profile",
		})
		return
	}
	c.JSON(200, gin.H{})
}

func (app *Application) DeleteProfileHandler(c *gin.Context) {
	userID := c.Param("user_id")
	id, err := strconv.Atoi(userID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user id",
		})
		return
	}
	err = service.NewProfileService(
		repository.NewUserRepository(app.db),
	).DeleteProfile(id)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to delete profile",
		})
		return
	}
	c.JSON(200, gin.H{})
}

func (app *Application) GetBlogsHandler(c *gin.Context) {
	userID := c.Param("user_id")
	id, err := strconv.Atoi(userID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user id",
		})
		return
	}
	res, err := service.NewBlogService(
		repository.NewBlogRepository(app.db),
	).GetBlogs(id)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to get blogs",
		})
		return
	}
	if len(res) == 0 {
		c.JSON(404, gin.H{
			"error": "blogs not found",
		})
		return
	}
	c.JSON(200, res)
}

func (app *Application) GetBlogHandler(c *gin.Context) {
	blogID := c.Param("blog_id")
	bid, err := strconv.Atoi(blogID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid blog id",
		})
		return
	}
	res, err := service.NewBlogService(
		repository.NewBlogRepository(app.db),
	).GetBlog(bid)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to get blog",
		})
		return
	}
	if res == nil {
		c.JSON(404, gin.H{
			"error": "blog not found",
		})
		return
	}
	c.JSON(200, res)
}

func (app *Application) CreateBlogHandler(c *gin.Context) {
	userID := c.Param("user_id")
	uid, err := strconv.Atoi(userID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid blog id",
		})
		return
	}
	blog := &model.Blog{}
	if err := c.BindJSON(blog); err != nil {
		c.JSON(400, gin.H{
			"error": "invalid blog object in request",
		})
		return
	}
	blog.UserID = uid
	// TODO: add a validator
	err = service.NewBlogService(
		repository.NewBlogRepository(app.db),
	).CreateBlog(blog)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to create blog",
		})
		return
	}
	c.JSON(200, gin.H{})
}

func (app *Application) UpdateBlogHandler(c *gin.Context) {
	blog := &model.Blog{}
	if err := c.BindJSON(blog); err != nil {
		c.JSON(400, gin.H{
			"error": "invalid blog object in request",
		})
		return
	}
	// TODO: add a validator
	err := service.NewBlogService(
		repository.NewBlogRepository(app.db),
	).UpdateBlog(blog)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to update blog",
		})
		return
	}
	c.JSON(200, gin.H{})
}

func (app *Application) DeleteBlogHandler(c *gin.Context) {
	blogID := c.Param("blog_id")
	bid, err := strconv.Atoi(blogID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid blog id",
		})
		return
	}
	err = service.NewBlogService(
		repository.NewBlogRepository(app.db),
	).DeleteBlog(bid)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "failed to delete blog",
		})
		return
	}
	c.JSON(200, gin.H{})
}
