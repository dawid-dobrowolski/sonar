package main

import (
	"app/Controllers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173", "http://127.0.0.1:5173"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	e.GET("/product/getAll", Controllers.GetAllProducts)
	e.GET("/product/:id", Controllers.GetProduct)
	e.POST("/product", Controllers.AddProduct)
	e.DELETE("/product/:id", Controllers.DeleteProduct)
	e.PUT("product", Controllers.UpdateProduct)
	e.GET("product/expensive", Controllers.GetExpensiveProducts)

	e.GET("/category/getAll", Controllers.GetAllCategories)
	e.GET("/category/:id", Controllers.GetCategory)
	e.POST("/category", Controllers.AddCategory)
	e.DELETE("/category/:id", Controllers.DeleteCategory)
	e.PUT("category", Controllers.UpdateCategory)

	e.GET("/cart/getAll", Controllers.GetAllCarts)
	e.GET("/cart/:id", Controllers.GetCart)
	e.POST("/cart", Controllers.AddCart)
	e.DELETE("/cart/:id", Controllers.DeleteCart)
	e.PUT("cart", Controllers.UpdateCart)

	e.Logger.Fatal(e.Start(":1323"))
}
