package Models

type Product struct {
	ID          uint `gorm:"primaryKey;autoIncrement:true"`
	Name        string
	Description string
	Price       float64
	Url         string
	CategoryId  *uint
}
