package repository

import (
	"github.com/akinori-s/bloggr/internal/model"
	"gorm.io/gorm"
)

// UserRepository is an interface for user repository.
type UserRepository interface {
	GetUserByID(id int) (*model.User, error)
	CreateUser(user *model.User) error
	UpdateUser(user *model.User) error
	DeleteUser(id int) error
}

// userRepository is a repository for user.
type userRepository struct {
	DB *gorm.DB
}

// NewUserRepository creates a new user repository.
func NewUserRepository(db *gorm.DB) *userRepository {
	return &userRepository{
		DB: db,
	}
}

// GetUserByID gets a user by ID.
func (r *userRepository) GetUserByID(id int) (*model.User, error) {
	user := &model.User{}
	if err := r.DB.First(user, id).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// CreateUser creates a user.
func (r *userRepository) CreateUser(user *model.User) error {
	if err := r.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

// UpdateUser updates a user.
func (r *userRepository) UpdateUser(user *model.User) error {
	if err := r.DB.Save(user).Error; err != nil {
		return err
	}
	return nil
}

// DeleteUser deletes a user.
func (r *userRepository) DeleteUser(id int) error {
	if err := r.DB.Delete(&model.User{}, id).Error; err != nil {
		return err
	}
	return nil
}
