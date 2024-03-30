package repository

import (
	"github.com/akinori-s/bloggr/internal/model"
	"gorm.io/gorm"
)

// UserRepository is a repository for user.
type UserRepository struct {
	DB *gorm.DB
}

// NewUserRepository creates a new user repository.
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

// GetUserByID gets a user by ID.
func (r *UserRepository) GetUserByID(id int) (*model.User, error) {
	user := &model.User{}
	if err := r.DB.First(user, id).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// CreateUser creates a user.
func (r *UserRepository) CreateUser(user *model.User) error {
	if err := r.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

// UpdateUser updates a user.
func (r *UserRepository) UpdateUser(user *model.User) error {
	if err := r.DB.Save(user).Error; err != nil {
		return err
	}
	return nil
}

// DeleteUser deletes a user.
func (r *UserRepository) DeleteUser(user *model.User) error {
	if err := r.DB.Delete(user).Error; err != nil {
		return err
	}
	return nil
}
