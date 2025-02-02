import Link from 'next/link';
import MobileSidebar from './mobile-sidebar';
import AvatarMenu from './AvatarMenu/AvatarMenu';

const MobileMenu = () => {
	return (
		// <!-- Main Header-->
		<header className="main-header main-header-mobile">
			<div className="auto-container">
				{/* <!-- Main box --> */}
				<div className="inner-box">
					<div className="nav-outer">
						<div className="logo-box">
							<Link href="/">
								<div className="logo">allthejobs.ca</div>
							</Link>
						</div>
						{/* End .logo-box */}

						<MobileSidebar />

						{/* <!-- Main Menu End--> */}
					</div>
					{/* End .nav-outer */}

					<div className="outer-box">
						{/* <div className="login-box">
							<a
								href="#"
								className="call-modal"
								data-bs-toggle="modal"
								data-bs-target="#loginPopupModal"
							>
								<span className="icon icon-user"></span>
							</a>
						</div> */}
						{/* login popup end */}

						<a
							href="#"
							className="mobile-nav-toggler"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasMenu"
						>
							<span className="flaticon-menu-1"></span>
						</a>
						{/* right humberger menu */}
					</div>
				</div>
			</div>
		</header>
	);
};

export default MobileMenu;
