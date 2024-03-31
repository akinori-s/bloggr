package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

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

	router.Use(cors.Default())

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

		user := api.Group("/:user_id")
		{
			profile := user.Group("/profile")
			{
				profile.GET("/", app.GetProfileHandler)
				profile.PATCH("/", app.UpdateProfileHandler)
				profile.DELETE("/", app.DeleteProfileHandler)
			}
			blog := api.Group("/blog")
			{
				blog.GET("/", app.GetBlogsHandler)
				blog.GET("/:blog_id", app.GetBlogHandler)
				blog.POST("/", app.CreateBlogHandler)
				blog.PATCH("/", app.UpdateBlogHandler)
				blog.DELETE("/:blog_id", app.DeleteBlogHandler)
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

func (app *Application) RegisterHandler(c *gin.Context) {}

func (app *Application) LogoutHandler(c *gin.Context) {}

func (app *Application) GetProfileHandler(c *gin.Context) {
	userID := c.Param("user_id")
	id, err := strconv.Atoi(userID)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "invalid user id",
		})
		return
	}
	res := service.NewProfileService(
		repository.NewUserRepository(app.db),
	).GetProfile(id)
	c.JSON(200, gin.H{
		"user_id": res,
	})
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
	res := service.NewProfileService(
		repository.NewUserRepository(app.db),
	).GetProfile(id)
	c.JSON(200, gin.H{
		"user_id": res,
	})
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
	res := service.NewProfileService(
		repository.NewUserRepository(app.db),
	).GetProfile(id)
	c.JSON(200, gin.H{
		"user_id": res,
	})
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
	c.JSON(200, gin.H{
		"user_id": res,
	})
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
	c.JSON(200, gin.H{
		"user_id": res,
	})
}

func (app *Application) CreateBlogHandler(c *gin.Context) {
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
