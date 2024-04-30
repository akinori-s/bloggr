CREATE TABLE m_user (
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	blog_title VARCHAR(255) NOT NULL,
	blog_subtitle VARCHAR(255) NOT NULL,
	blog_color_theme_id INT NOT NULL DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE m_blog (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	user_id INT NOT NULL REFERENCES m_user(id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('johndoe', 'johndoe@example.com', 'password123', 'John''s Adventures', 'Exploring the world one day at a time', 1);
INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('janedoe', 'janedoe@example.com', 'securepassword', 'Jane''s Kitchen', 'Delicious recipes and cooking tips', 2);
INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('aliceb', 'aliceb@example.com', 'alicepass', 'Alice in DataLand', 'Data science and analytics explored', 3);
INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('bobsmith', 'bobsmith@example.com', 'bobssecure', 'Bob the Builder', 'DIY projects and home repairs', 4);
INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('carolm', 'carolm@example.com', 'carolspass', 'Travel with Carol', 'Adventures around the globe', 5);
INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('davet', 'davet@example.com', 'davesecret', 'Dave''s Tech Hub', 'Latest in technology and gadgets', 6);
INSERT INTO m_user (username, email, password, blog_title, blog_subtitle, blog_color_theme_id) VALUES ('emmaj', 'emmaj@example.com', 'emmapass123', 'Emma''s Art Corner', 'Creative projects and art discussions', 7);

-- Posts for user_id 1 (John Doe)
INSERT INTO m_blog (title, content, user_id) VALUES
('My First Adventure', 'This is a post about my first adventure...', 1),
('Hiking the Blue Mountains', 'Detailed account of my recent hiking trip...', 1),
('Visiting New Zealand', 'Exploring the beautiful landscapes of New Zealand...', 1);

-- Posts for user_id 2 (Jane Doe)
INSERT INTO m_blog (title, content, user_id) VALUES
('Welcome to My Kitchen', 'Here''s what my blog is about...', 2),
('Best Recipes for Breakfast', 'Discover top breakfast recipes...', 2),
('Cooking Tips', 'Learn some of my favorite cooking tips...', 2);

-- Posts for user_id 3 (Alice)
INSERT INTO m_blog (title, content, user_id) VALUES
('Introduction to Data Science', 'What is Data Science? Let me explain...', 3),
('Big Data Analytics', 'Exploring the impacts of Big Data in various industries...', 3),
('Machine Learning Basics', 'An introduction to machine learning...', 3),
('Data Visualization Techniques', 'How to visually represent data...', 3);

-- Posts for user_id 4 (Bob Smith)
INSERT INTO m_blog (title, content, user_id) VALUES
('DIY Home Office Setup', 'Steps to create your home office...', 4),
('Fixing Common Household Items', 'Common fixes for your home...', 4);

-- Posts for user_id 5 (Carol)
INSERT INTO m_blog (title, content, user_id) VALUES
('Guide to Budget Traveling', 'How to travel on a budget...', 5),
('Must-visit Places in Europe', 'Here are some must-visit places...', 5),
('Packing Essentials for Travel', 'What to pack for your travels...', 5);

-- Posts for user_id 6 (Dave)
INSERT INTO m_blog (title, content, user_id) VALUES
('Emerging Tech Trends', 'Stay updated with the latest trends...', 6),
('Reviews of New Gadgets', 'My thoughts on the latest gadgets...', 6),
('Building a PC', 'Guide to building your custom PC...', 6);

-- Posts for user_id 7 (Emma)
INSERT INTO m_blog (title, content, user_id) VALUES
('Getting Started with Watercolors', 'Beginner tips for watercolor painting...', 7),
('Creating Your First Mural', 'Steps to create your first mural...', 7),
('Art Supplies Review', 'My review of various art supplies...', 7);
