import React, { useEffect, useState } from 'react';

const EmptyBlogsPlaceholder: React.FC = () => {
		// Array of messages
		const messages = [
			"Wow, such empty... 🐶",
			"It's a desert out here... 🌵",
			"Looks like the cat's got our content... 🐱",
			"We must have left it in our other pants... 👖",
			"It's so empty, I can hear an echo... 📢"
		];

		const [message, setMessage] = useState<string>('');

		useEffect(() => {
			const randomMessage = messages[Math.floor(Math.random() * messages.length)];
			setMessage(randomMessage);
		}, []);

		return (
			<div className="col-span-full mx-auto w-full block text-center py-5">
					<h2 className="text-2xl font-bold text-slate-400 mb-3">{message}</h2>
					<p className="text-lg text-slate-600">Try adding some items, or check back later!</p>
			</div>
		);
};

export default EmptyBlogsPlaceholder;
