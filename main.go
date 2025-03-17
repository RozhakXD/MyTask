package main

import (
	"MyTask/database"
	"MyTask/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	database.InitDataBase()
	r := routes.SetupRouter()

	r.Static("/static", "./static")

    r.LoadHTMLGlob("templates/*")

    r.GET("/", func(c *gin.Context) {
        c.HTML(200, "index.html", nil)
    })

    r.Run(":8080")
}