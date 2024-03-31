package model

import (
	"time"
)

// User is a model for ueers.
type User struct {
	ID               int       `gorm:"id" json:"id" validate:"required"`
	Username         string    `gorm:"username" json:"username" validate:"required, min=4, max=20"`
	Email            string    `gorm:"email" json:"email" validate:"required, email, max=255"`
	Password         string    `gorm:"password" json:"password"`
	BlogTitle        string    `gorm:"blog_title" json:"blog_title" validate:"required, min=1, max=255"`
	BlogSubtitle     string    `gorm:"blog_subtitle" json:"blog_subtitle" validate:"required, max=255"`
	BlogColorThemeID int       `gorm:"blog_color_theme_id" json:"blog_color_theme_id" validate:"required, min=0"`
	CreatedAt        time.Time `gorm:"created_at"`
	UpdatedAt        time.Time `gorm:"updated_at"`
}

// table name
func (u *User) TableName() string {
	return "m_user"
}

type UpdateUserRequest struct {
	ID               int     `gorm:"id" json:"id" validate:"required"`
	Username         *string `gorm:"username" json:"username,omitempty" validate:"required, min=4, max=20"`
	Email            *string `gorm:"email" json:"email,omitempty" validate:"required, email, max=255"`
	Password         *string `gorm:"password" json:"password,omitempty"`
	BlogTitle        *string `gorm:"blog_title" json:"blog_title,omitempty" validate:"required, min=1, max=255"`
	BlogSubtitle     *string `gorm:"blog_subtitle" json:"blog_subtitle,omitempty" validate:"required, max=255"`
	BlogColorThemeID *int    `gorm:"blog_color_theme_id" json:"blog_color_theme_id,omitempty" validate:"required, min=0"`
}
