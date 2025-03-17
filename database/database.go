package database

import (
	"MyTask/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDataBase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("Task.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database!")
	}

	DB.AutoMigrate(&models.Task{})
}
