package routes

import (
	"MyTask/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/tasks/:id", controllers.GetTaskByID)
	r.POST("/tasks", controllers.CreateTask)
	r.PUT("/tasks/:id", controllers.UpdateTask)
	r.GET("/tasks", controllers.GetTasks)
	r.DELETE("/tasks/:id", controllers.DeleteTask)

	return r
}
