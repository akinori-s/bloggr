package repository

import (
	"github.com/akinori-s/bloggr/internal/model"
	"gorm.io/gorm"
)

// BlogRepository is an interface for blog repository.
type BlogRepository interface {
	GetBlogsByUserID(user_id int) ([]*model.Blog, error)
	GetBlogByID(id int) (*model.Blog, error)
	CreateBlog(blog *model.Blog) error
	UpdateBlog(blog *model.Blog) error
	DeleteBlog(id int) error
}

// blogRepository is a repository for blog.
type blogRepository struct {
	DB *gorm.DB
}

// NewBlogRepository creates a new blog repository.
func NewBlogRepository(db *gorm.DB) *blogRepository {
	return &blogRepository{
		DB: db,
	}
}

// GetBlogsByUserID gets blogs.
func (r *blogRepository) GetBlogsByUserID(user_id int) ([]*model.Blog, error) {
	blogs := []*model.Blog{}
	err := r.DB.Where("user_id = ?", user_id).Find(&blogs).Error
	if err != nil {
		return nil, err
	}
	return blogs, nil
}

// GetBlogByID gets a blog by ID.
func (r *blogRepository) GetBlogByID(id int) (*model.Blog, error) {
	blog := &model.Blog{}
	err := r.DB.First(blog, id).Error
	if err != nil {
		return nil, err
	}
	return blog, nil
}

// CreateBlog creates a blog.
func (r *blogRepository) CreateBlog(blog *model.Blog) error {
	err := r.DB.Create(blog).Error
	if err != nil {
		return err
	}
	return nil
}

// UpdateBlog updates a blog.
func (r *blogRepository) UpdateBlog(blog *model.Blog) error {
	err := r.DB.Save(blog).Error
	if err != nil {
		return err
	}
	return nil
}

// DeleteBlog deletes a blog.
func (r *blogRepository) DeleteBlog(id int) error {
	err := r.DB.Delete(&model.Blog{}, id).Error
	if err != nil {
		return err
	}
	return nil
}
