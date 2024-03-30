package service

import (
	"github.com/akinori-s/bloggr/internal/repository"
)

// ProfileService is a service for profile.
type ProfileService struct {
	userRepository *repository.UserRepository
}

// NewProfileService creates a new profile service.
func NewProfileService(userRepository *repository.UserRepository) *ProfileService {
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
func (s *ProfileService) UpdateProfile(userID string) {}

// DeleteProfile deletes a profile.
func (s *ProfileService) DeleteProfile(userID string) {}
