package Models

type Category struct {
	ID          uint `gorm:"primaryKey;autoIncrement:true"`
	Name        string
	Description string
	Products    *[]Product `gorm:"foreignKey:CategoryId"`
}
