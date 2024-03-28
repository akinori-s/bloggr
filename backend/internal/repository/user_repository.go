package repository

import (
	"backend/internal/model"
	"backend/internal/repository"
)

// UserRepository is a repository for user.
type UserRepository struct {
	db *repository.Gorm
}

// NewUserRepository creates a new user repository.
func NewUserRepository() *UserRepository {
	return &UserRepository{
		db: repository.NewGorm(),
	}
}

// GetUserByID gets a user by ID.
func (r *UserRepository) GetUserByID(id int) (*model.User, error) {
	user := &model.User{}
	if err := r.db.DB().First(user, id).Error; err != nil {
		return nil, err
	}
	return user, nil
}
