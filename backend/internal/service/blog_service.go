package service

import (
	"github.com/akinori-s/bloggr/internal/model"
	"github.com/akinori-s/bloggr/internal/repository"
)

// BlogService is a service for blog.
type BlogService struct {
	blogRepository repository.BlogRepository
}

// NewBlogService creates a new blog service.
func NewBlogService(blogRepository repository.BlogRepository) *BlogService {
	return &BlogService{
		blogRepository: blogRepository,
	}
}

// GetBlogs gets blogs.
func (s *BlogService) GetBlogs(userID int) ([]*model.Blog, error) {
	blogs, err := s.blogRepository.GetBlogsByUserID(userID)
	if err != nil {
		return nil, err
	}
	return blogs, nil
}

// GetBlog gets a blog.
func (s *BlogService) GetBlog(id int) (*model.Blog, error) {
	blog, err := s.blogRepository.GetBlogByID(id)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

// CreateBlog creates a blog.
func (s *BlogService) CreateBlog(blog *model.Blog) error {
	err := s.blogRepository.CreateBlog(blog)
	if err != nil {
		return err
	}
	return nil
}

// UpdateBlog updates a blog.
func (s *BlogService) UpdateBlog(blog *model.Blog) error {
	err := s.blogRepository.UpdateBlog(blog)
	if err != nil {
		return err
	}
	return nil
}

// DeleteBlog deletes a blog.
func (s *BlogService) DeleteBlog(id int) error {
	err := s.blogRepository.DeleteBlog(id)
	if err != nil {
		return err
	}
	return nil
}
