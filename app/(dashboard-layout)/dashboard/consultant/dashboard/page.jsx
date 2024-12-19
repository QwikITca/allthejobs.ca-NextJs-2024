import dynamic from 'next/dynamic';
import DashboadHome from '@/components/dashboard-pages/employers-dashboard/dashboard';

export const metadata = {
	title: 'Consultant  Dashboard || AllTheJobs',
	description: 'AllTheJobs',
};

const index = () => {
	return (
		<>
			<DashboadHome />
		</>
	);
};

export default dynamic(() => Promise.resolve(index), {ssr: false});
