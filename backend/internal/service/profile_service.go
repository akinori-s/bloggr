package service

import (
	"backend/internal/repository"
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
func (s *ProfileService) GetProfile(userID string) interface{} {
	user, err := s.userRepository.GetUserByID(userID)
	if err != nil {
		return err
	}
	return user
}
