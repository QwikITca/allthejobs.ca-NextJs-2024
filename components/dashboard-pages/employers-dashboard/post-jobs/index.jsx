import MobileMenu from '../../../header/MobileMenu';
import LoginPopup from '../../../common/form/login/LoginPopup';
import DashboardEmployerSidebar from '../../../header/DashboardEmployerSidebar';
import BreadCrumb from '../../BreadCrumb';
import CopyrightFooter from '../../CopyrightFooter';
import MenuToggler from '../../MenuToggler';
import DashboardEmployersHeader from '@/components/header/DashboardEmployersHeader';
import PostJobs from './components/PostJobs';

const index = () => {
	return (
		<div className="page-wrapper dashboard">
			<span className="header-span"></span>
			{/* <!-- Header Span for hight --> */}

			<LoginPopup />
			{/* End Login Popup Modal */}

			<DashboardEmployersHeader />
			{/* End Header */}

			<MobileMenu />
			{/* End MobileMenu */}

			<DashboardEmployerSidebar />
			{/* <!-- End User Sidebar Menu --> */}

			{/* <!-- Dashboard --> */}
			<section className="user-dashboard">
				<div className="dashboard-outer">
					<BreadCrumb title="Post a New Job!" />
					{/* breadCrumb */}

					<MenuToggler />
					{/* Collapsible sidebar button */}

					<div className="row">
						<div className="col-lg-12">
							{/* <!-- Ls widget --> */}
							<div className="ls-widget">
								<div className="tabs-box">
									<div className="widget-title d-block">
										<h4>Post Job</h4>
										<h6 className="text-blue-700">All Fields are Required</h6>
									</div>

									<div className="widget-content">
										<PostJobs />
										{/* End post box form */}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* End .row */}
				</div>
				{/* End dashboard-outer */}
			</section>
			{/* <!-- End Dashboard --> */}

			<CopyrightFooter />
			{/* <!-- End Copyright --> */}
		</div>
		// End page-wrapper
	);
};

export default index;
