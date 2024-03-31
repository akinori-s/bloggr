package service

import (
	"github.com/akinori-s/bloggr/internal/model"
	"github.com/akinori-s/bloggr/internal/repository"
)

// ProfileService is a service for profile.
type ProfileService struct {
	userRepository repository.UserRepository
}

// NewProfileService creates a new profile service.
func NewProfileService(userRepository repository.UserRepository) *ProfileService {
	return &ProfileService{
		userRepository: userRepository,
	}
}

// GetProfile gets a profile.
func (s *ProfileService) GetProfile(userID int) interface{} {
	user, err := s.userRepository.GetUserByID(userID)
	if err != nil {
		return err
	}
	return user
}

// UpdateProfile updates a profile.
func (s *ProfileService) UpdateProfile(user *model.User) error {
	err := s.userRepository.UpdateUser(user)
	if err != nil {
		return err
	}
	return nil
}

// DeleteProfile deletes a profile.
func (s *ProfileService) DeleteProfile(userID int) error {
	err := s.userRepository.DeleteUser(userID)
	if err != nil {
		return err
	}
	return nil
}
