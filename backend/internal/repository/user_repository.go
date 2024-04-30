package repository

import (
	"log"

	"github.com/akinori-s/bloggr/internal/model"
	"gorm.io/gorm"
)

// UserRepository is an interface for user repository.
type UserRepository interface {
	GetUsers() ([]*model.User, error)
	GetUserByID(id int) (*model.User, error)
	CreateUser(user *model.User) error
	UpdateUser(user *model.UpdateUserRequest) error
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

// GetUsers randomly gets the first 10 users.
func (r *userRepository) GetUsers() ([]*model.User, error) {
	user := []*model.User{}
	err := r.DB.Limit(10).Find(&user).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// GetUserByID gets a user by ID.
func (r *userRepository) GetUserByID(id int) (*model.User, error) {
	user := &model.User{}
	err := r.DB.First(user, id).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

// CreateUser creates a user.
func (r *userRepository) CreateUser(user *model.User) error {
	err := r.DB.Create(user).Error
	if err != nil {
		return err
	}
	return nil
}

// UpdateUser updates a user.
func (r *userRepository) UpdateUser(user *model.UpdateUserRequest) error {
	r.DB = r.DB.Debug()
	log.Println(user)
	err := r.DB.Model(&model.User{}).Where("id = ?", user.ID).Updates(user).Error
	if err != nil {
		return err
	}
	return nil
}

// DeleteUser deletes a user.
func (r *userRepository) DeleteUser(id int) error {
	err := r.DB.Delete(&model.User{}, id).Error
	if err != nil {
		return err
	}
	return nil
}
