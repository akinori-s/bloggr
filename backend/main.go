package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	api := router.Group("/api")
	{
		api.POST("/login", LoginHandler)
		api.POST("/register", RegisterHandler)
		api.POST("/logout", LogoutHandler)

		user := api.Group("/:user_id")
		{
			profile := user.Group("/profile")
			{
				profile.GET("/", GetProfileHandler)
				profile.POST("/", CreateProfileHandler)
				profile.PATCH("/", UpdateProfileHandler)
				profile.DELETE("/", DeleteProfileHandler)
			}
			blog := api.Group("/blog")
			{
				blog.GET("/", GetBlogsHandler)
				blog.GET("/:id", GetBlogHandler)
				blog.POST("/:id", CreateBlogHandler)
				blog.PATCH("/:id", UpdateBlogHandler)
				blog.DELETE("/:id", DeleteBlogHandler)
			}
		}
	}

	router.Run(":8080")
}

func LoginHandler(c *gin.Context) {}

func RegisterHandler(c *gin.Context) {}

func LogoutHandler(c *gin.Context) {}

func GetProfileHandler(c *gin.Context) {}

func CreateProfileHandler(c *gin.Context) {}

func UpdateProfileHandler(c *gin.Context) {}

func DeleteProfileHandler(c *gin.Context) {}

func GetBlogsHandler(c *gin.Context) {}

func GetBlogHandler(c *gin.Context) {}

func CreateBlogHandler(c *gin.Context) {}

func UpdateBlogHandler(c *gin.Context) {}

func DeleteBlogHandler(c *gin.Context) {}
