package Infrastructure

import (
	"app/Models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func CreateDbConnection() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("eCommerce.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	productMigrationError := db.AutoMigrate(&Models.Product{})
	if productMigrationError != nil {
		panic("products migration fail")
	}

	cartMigrationError := db.AutoMigrate(&Models.Cart{})
	if cartMigrationError != nil {
		panic("cart migration fail")
	}

	categoriesMigrationError := db.AutoMigrate(&Models.Category{})
	if categoriesMigrationError != nil {
		panic("categories migration fail")
	}

	cartProductMigrationError := db.AutoMigrate(&Models.CartProduct{})
	if cartProductMigrationError != nil {
		panic("cart products migration fail")
	}

	return db
}
