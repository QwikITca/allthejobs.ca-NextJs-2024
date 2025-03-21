module.exports = [
	{
		id: 1,
		name: 'Dashboard',
		icon: 'la-home',
		routePath: '/dashboard/talent',
		active: 'active',
	},

	{
		id: 2,
		name: 'My Profile',
		icon: 'la-user',
		active: '',
		Children: [
			{
				id: 2,
				name: 'Edit Profile',
				icon: 'la-user-edit',
				routePath: '/dashboard/talent/my-profile',
				active: '',
			},
			{
				id: 2,
				name: 'Upgrade To Verified',
				icon: 'la-check-circle',
				routePath: '/dashboard//talent/#',
				active: '',
			},
			{
				id: 10,
				name: 'CV manager',
				icon: 'la la-file-invoice',
				routePath: '/dashboard/talent/cv-manager',
				active: '',
			},
			{
				id: 12,
				name: 'Change Password',
				icon: 'la-lock',
				routePath: '/dashboard/talent/change-password',
				active: '',
			},
		],
	},
	{
		id: 133,
		name: 'Meeting DashBoard',
		icon: 'la-video-camera',
		active: '',
		Children: [
			{
				id: 3,
				name: 'Book A Meeting',
				icon: 'la-calendar-plus',
				routePath: '/consultants',
				active: '',
			},
			{
				id: 4,
				name: 'Booked Meetings',
				icon: 'la-business-time',
				routePath: '/dashboard/talent/booked-meeting',
				active: '',
			},
			{
				id: 5,
				name: 'Previous Meetings',
				icon: 'la-digital-tachograph',
				routePath: '/dashboard/talent/previous-meeting',
				active: '',
			},
			{
				id: 6,
				name: 'Recordings',
				icon: 'la-file-video',
				routePath: '/dashboard/talent/meeting-recording',
				active: '',
			},
		],
	},

	{
		id: 16,
		name: 'Resume Builder',
		icon: 'la-rocket',
		routePath: '/dashboard/talent/resume-builder',
		active: '',
	},
	{
		id: 169,
		name: 'Jobs',
		icon: 'la-list',
		active: '',
		Children: [
			{
				id: 7,
				name: 'Applied Jobs',
				icon: 'la-briefcase',
				routePath: '/dashboard/talent/applied-jobs',
				active: '',
			},
			{
				id: 8,
				name: 'Matched Job',
				icon: 'la la-bell',
				routePath: '/dashboard/talent/job-alerts',
				active: '',
			},
			{
				id: 9,
				name: 'Shortlisted Jobs',
				icon: 'la-bookmark-o',
				routePath: '/dashboard/talent/short-listed-jobs',
				active: '',
			},
			{
				id: 9,
				name: 'Auto Job Apply',
				icon: 'la-tachometer-alt',
				routePath: '/dashboard/talent/#',
				active: '',
			},
		],
	},

	{
		id: 11,
		name: 'Packages',
		icon: 'la-box',
		routePath: '/dashboard/talent/packages',
		active: '',
	},
	{
		id: 12,
		name: 'Feedback & Reviews',
		icon: 'la-star',
		routePath: '/dashboard/talent/feedback',
		active: '',
	},
];
