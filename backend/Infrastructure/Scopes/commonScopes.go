package Scopes

import "gorm.io/gorm"

func WithProductData(db *gorm.DB) *gorm.DB {
	return db.Preload("Products")
}

func PriceGreaterThan100(db *gorm.DB) *gorm.DB {
	return db.Where("price > 100")
}
