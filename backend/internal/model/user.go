package model

import (
	"time"
)

// User is a model for ueers.
type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// table name
func (u *User) TableName() string {
	return "m_user"
}
