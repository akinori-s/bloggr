import React from "react"

interface ProfileCardProps {
	username: string,
	blogTitle: string,
}

const ProfileCard: React.FC<ProfileCardProps> = ({username, blogTitle}) => {

	return (
    <div className='col-span-1 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted'>
      <div className='flex flex-col w-full gap-2 text-center  '>
        <div className='flex items-center justify-center text-lg'>
          <div className='font-semibold'>{username}</div>
        </div>
        <div className='line-clamp-1 text-md font-medium h-auto'>{blogTitle}</div>
      </div>
    </div>
	);
};

export default ProfileCard;
