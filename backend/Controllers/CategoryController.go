package Controllers

import (
	dbContext "app/Infrastructure"
	scopes "app/Infrastructure/Scopes"
	"app/Models"
	"errors"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
)

func GetAllCategories(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var categories []Models.Category
	scopes.WithProductData(db).Find(&categories)

	return c.JSON(http.StatusOK, categories)
}

func GetCategory(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var category *Models.Category
	err := scopes.WithProductData(db).First(&category, c.Param("id"))

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, "Category not found")
		}
	}

	return c.JSON(http.StatusOK, category)
}

func AddCategory(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var category Models.Category
	err := c.Bind(&category)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	db.Create(&category)
	return c.JSON(http.StatusCreated, category.ID)
}

func DeleteCategory(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var category *Models.Category
	err := db.First(&category, c.Param("id"))

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, "Category not found")
		}
	}

	db.Delete(&category)
	return c.NoContent(http.StatusOK)
}

func UpdateCategory(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var category Models.Category
	err := c.Bind(&category)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Bad request")
	}

	db.Save(&category)
	return c.NoContent(http.StatusOK)
}
