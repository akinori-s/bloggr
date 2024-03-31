package model

import (
	"time"
)

// Blog is a model for blog.
type Blog struct {
	ID        int       `gorm:"id" json:"id"`
	Title     string    `gorm:"title" json:"title" validate:"required, min=1, max=255"`
	Content   string    `gorm:"content" json:"content" validate:"required, max=10000"`
	UserID    int       `gorm:"user_id" json:"user_id" validate:"required, min=0"`
	CreatedAt time.Time `gorm:"created_at"`
	UpdatedAt time.Time `gorm:"updated_at"`
}

// table name
func (b *Blog) TableName() string {
	return "m_blog"
}
