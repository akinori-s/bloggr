package model

import (
	"time"
)

// Blog is a model for blog.
type Blog struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	UserID    int       `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// table name
func (b *Blog) TableName() string {
	return "m_blog"
}
