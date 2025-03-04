'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import HeaderNavContent from './HeaderNavContent';
import {useSelector} from 'react-redux';
import DashboardAvatar from './AvatarMenu/DashboardAvatar';
const DashboardEmployersHeader = () => {
	const {userRoleBasedData} = useSelector((state) => state.data);
	const [navbar, setNavbar] = useState(false);
	const changeBackground = () => {
		if (window.scrollY >= 0) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', changeBackground);
	}, []);

	return (
		// <!-- Main Header-->
		<header className={`main-header header-shaddow  ${navbar ? 'fixed-header ' : ''}`}>
			<div className="container-fluid">
				{/* <!-- Main box --> */}
				<div className="main-box">
					{/* <!--Nav Outer --> */}
					<div className="nav-outer">
						<div className="logo-box">
							<Link href="/">
								<div className="logo">allthejobs.ca</div>
							</Link>
						</div>
						{/* End .logo-box */}

						<HeaderNavContent />
						{/* <!-- Main Menu End--> */}
					</div>
					{/* End .nav-outer */}

					<div className="outer-box">
						<div
							className="d-inline-flex align-items-center text-primary"
							style={{
								background: '#e2eaf8',
								borderRadius: '2rem',
								padding: '0.4rem 1rem',
								fontWeight: 'bold',
								fontSize: '1rem',
							}}
						>
							<Image
								src="/images/coin.png"
								alt="coins"
								width={300}
								height={20}
								style={{width: '30px'}}
							/>
							<span>{userRoleBasedData?.credit}</span>
						</div>
						<Link href={'/dashboard/employer'} className="menu-btn theme-btn btn-style-three h-10">
							Buy Credits
						</Link>
						{/* wishlisted menu */}

						<button className="menu-btn">
							<span className="count">3</span>
							<span className="icon la la-bell"></span>
						</button>
						{/* End notification-icon */}

						{/* End dropdown */}
						<DashboardAvatar />
					</div>
					{/* End outer-box */}
				</div>
			</div>
		</header>
	);
};

export default DashboardEmployersHeader;
