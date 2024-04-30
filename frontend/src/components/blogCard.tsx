import React from "react"
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Button,
} from "@/components/ui/button"

interface BlogCardProps {
  id: number,
	title: string,
	subtitle: string,
	datetimePublished: Date
}

const BlogCard: React.FC<BlogCardProps> = ({id, title, subtitle, datetimePublished}) => {
	const timeAgo = (date: Date) => {
		if (date  === undefined || date === null) {
			return "...";
		}
		const now = new Date();
		date = new Date(date);
		datetimePublished = new Date(datetimePublished);

		const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
		const minutes = Math.round(seconds / 60);
		const hours = Math.round(minutes / 60);
		const days = Math.round(hours / 24);
		const months = Math.round(days / 30);
		const years = Math.round(months / 12);
		const rtf = new Intl.RelativeTimeFormat('jp', { numeric: 'auto' });

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="ml-auto text-xs">{timeAgo(datetimePublished)}</TooltipTrigger>
              <TooltipContent>
                <p>{datetimePublished?.toLocaleTimeString() + ', ' + datetimePublished?.toDateString()}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <i className="bi bi-three-dots-vertical text-gray-400 text-lg"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#dc3545] focus:text-white dark:focus:text-white  ">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
				</div>
				<div className='line-clamp-2 text-md font-medium h-12'>{subtitle}</div>
				<div className='text-md font-medium text-right'><Link to={`blog/${id}`}>Read more...</Link></div>
			</div>
		</div>
	);
};

export default BlogCard;
