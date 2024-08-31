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

func GetAllCarts(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var carts []Models.Cart
	scopes.WithProductData(db).Find(&carts)
	return c.JSON(http.StatusOK, carts)
}

func GetCart(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var cart *Models.Cart
	err := scopes.WithProductData(db).First(&cart, c.Param("id"))

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, "Cart not found")
		}
	}

	return c.JSON(http.StatusOK, cart)
}

func AddCart(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var cart Models.Cart
	err := c.Bind(&cart)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	db.Create(&cart)
	return c.JSON(http.StatusCreated, cart.ID)
}

func DeleteCart(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var cart *Models.Cart
	err := db.First(&cart, c.Param("id"))

	if err != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, "Cart not found")
		}
	}

	db.Delete(&cart)
	return c.NoContent(http.StatusOK)
}

func UpdateCart(c echo.Context) error {
	db := dbContext.CreateDbConnection()
	var cart Models.Cart
	err := c.Bind(&cart)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	db.Save(&cart)
	return c.NoContent(http.StatusOK)
}
