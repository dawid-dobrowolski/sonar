package Models

type Cart struct {
	ID       uint      `gorm:"primaryKey;autoIncrement:true"`
	Products []Product `gorm:"many2many:cart_products;"`
}

type CartProduct struct {
	CartID    uint `gorm:"primaryKey;"`
	ProductID uint `gorm:"primaryKey;"`
}
