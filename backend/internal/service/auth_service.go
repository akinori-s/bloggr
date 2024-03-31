package service

import (
	"time"

	"github.com/akinori-s/bloggr/internal/model"
	"github.com/akinori-s/bloggr/internal/repository"
)

// AuthService is a service for auth.
type AuthService struct {
	userRepository repository.UserRepository
}

// NewAuthService creates a new auth service.
func NewAuthService(userRepository repository.UserRepository) *AuthService {
	return &AuthService{
		userRepository: userRepository,
	}
}

// RegisterUser registers a user.
func (s *AuthService) RegisterUser(user *model.User) error {
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	err := s.userRepository.CreateUser(user)
	if err != nil {
		return err
	}
	return nil
}
