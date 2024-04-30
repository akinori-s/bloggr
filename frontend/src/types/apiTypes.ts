export interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	blog_title: string;
	blog_subtitle: string;
	blog_color_theme_id: string;
}

export interface Blogs {
	id: number;
	title: string;
	content: string;
	user_id: number;
	created_at: Date;
}

export class StatusError extends Error {
	status: number | undefined;
}
