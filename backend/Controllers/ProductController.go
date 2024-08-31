package Controllers

import (
	dbContext "app/Infrastructure"
	scopes "app/Infrastructure/Scopes"
	"app/Models"
	"errors"
	"gorm.io/gorm"
	"net/http"
)

const ProductNotFound = "Product not found"

func GetAllProducts(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var products []Models.Product
	db.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var product *Models.Product
	err := db.First(&product, c.Param("id"))

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, ProductNotFound)
		}
	}

	return c.JSON(http.StatusOK, product)
}

func GetExpensiveProducts(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var products *[]Models.Product
	err := scopes.PriceGreaterThan100(db).Find(&products)

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, ProductNotFound)
		}
	}

	return c.JSON(http.StatusOK, products)
}

func AddProduct(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var product Models.Product
	err := c.Bind(&product)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	db.Create(&product)
	return c.JSON(http.StatusCreated, product.ID)
}

func DeleteProduct(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var product *Models.Product
	err := db.First(&product, c.Param("id"))

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, ProductNotFound)
		}
	}

	db.Delete(&product)
	return c.NoContent(http.StatusOK)
}

func UpdateProduct(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var product Models.Product
	err := c.Bind(&product)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	db.Save(&product)
	return c.NoContent(http.StatusOK)
}
