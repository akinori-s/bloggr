import React from "react"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"

interface BlogCardProps {
	title: string,
	subtitle: string,
	datetimePublished: Date
}

const BlogCard: React.FC<BlogCardProps> = ({title, subtitle, datetimePublished}) => {
	const timeAgo = (date: Date) => {
		const now = new Date();
		const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
		const minutes = Math.round(seconds / 60);
		const hours = Math.round(minutes / 60);
		const days = Math.round(hours / 24);
		const months = Math.round(days / 30);
		const years = Math.round(months / 12);
	
		const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	
		if (seconds < 60) {
			return rtf.format(-seconds, 'second');
		} else if (minutes < 60) {
			return rtf.format(-minutes, 'minute');
		} else if (hours < 24) {
			return rtf.format(-hours, 'hour');
		} else if (days < 30) {
			return rtf.format(-days, 'day');
		} else if (months < 12) {
			return rtf.format(-months, 'month');
		} else {
			return rtf.format(-years, 'year');
		}
		};

	return (
		<div className='col-span-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
			<div className='flex flex-col w-full gap-2'>
				<div className='flex items-center text-lg'>
					<div className='font-semibold'>{title}</div>
					<HoverCard>
							<HoverCardTrigger asChild>
						<div className='ml-auto text-xs text-foreground'>{timeAgo(datetimePublished)}</div>
						</HoverCardTrigger>
						<HoverCardContent className="px-3 py-1 m-0 w-auto">
						<span className="text-xs">
							{datetimePublished.toLocaleTimeString() + ', ' + datetimePublished.toDateString()}
						</span>
						</HoverCardContent>
					</HoverCard>
				</div>
				<div className='line-clamp-3 text-md font-medium h-16'>{subtitle}</div>
				<div className='line-clamp-3 text-md font-medium text-right'>Read more...</div>
			</div>
		</div>
	);
};

export default BlogCard;
