'use client';

import Link from 'next/link';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import adminMenuData from '../../data/adminMenuData';
import {isActiveLink} from '../../utils/linkActiveChecker';

import {useDispatch, useSelector} from 'react-redux';
import {menuToggle} from '../../features/toggle/toggleSlice';
import {usePathname} from 'next/navigation';
import LogOutButton from '../common/LogOutButton/LogOutButton';
import {useState} from 'react';
const DashboardAdminSidebar = () => {
	//get current path name
	const pathname = usePathname();
	const [showMeetingMenu, setShowMeetingMenu] = useState(false);
	const [menuItem, setMenuItem] = useState('');
	const {menu} = useSelector((state) => state.toggle);
	const percentage = 30;
	const dispatch = useDispatch();

	// menu togggle handler
	const menuToggleHandler = () => {
		dispatch(menuToggle());
	};
	//handle sub menu toggle
	const handleSubMenuToggle = (name) => {
		setMenuItem(name);
		if (showMeetingMenu && menuItem !== name) {
			setShowMeetingMenu(false);
			setShowMeetingMenu(true);
		} else {
			setShowMeetingMenu(!showMeetingMenu);
		}
	};

	return (
		<div className={`user-sidebar ${menu ? 'sidebar_open' : ''}`}>
			{/* Start sidebar close icon */}
			<div className="pro-header text-end pb-0 mb-0 show-1023">
				<div className="fix-icon" onClick={menuToggleHandler}>
					<span className="flaticon-close"></span>
				</div>
			</div>
			{/* End sidebar close icon */}

			<div className="sidebar-inner">
				<ul className="navigation">
					{adminMenuData.map((item, i) => (
						<li
							className={`${isActiveLink(item.routePath, usePathname()) ? 'active' : ''} mb-1`}
							key={i}
							onClick={menuToggleHandler}
						>
							{item.Children ? (
								<div
									className={`transition-all duration-500 ${
										showMeetingMenu && menuItem === item.name ? 'bg-[#c1d7edc7] rounded-xl' : ''
									}`}
								>
									<button
										onClick={() => handleSubMenuToggle(item.name)}
										className=" mb-1 transition-all duration-500 w-full "
									>
										<i className={`la ${item.icon}`}></i>
										{item.name}
										<span
											className={`la ${
												showMeetingMenu && item.name === menuItem ? 'la-angle-up' : 'la-angle-down'
											} size-1 ml-auto mb-[10px] font-bold`}
										></span>
									</button>

									<ul
										className={`submenu transition-all duration-500 ease-in-out overflow-hidden rounded-lg w-full ${
											showMeetingMenu && item.name === menuItem
												? 'opacity-100 max-h-[500px]'
												: 'opacity-0 max-h-0'
										}`}
									>
										{item.Children.map((subItem, i) => (
											<li
												key={i}
												className={`${
													isActiveLink(subItem.routePath, usePathname()) ? 'active' : ''
												} mb-1`}
											>
												<Link href={subItem.routePath}>
													<i className={`la ${subItem.icon}`}></i>
													{subItem.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							) : (
								<Link href={item.routePath} className="">
									<i className={`la ${item.icon}`}></i> {item.name}
								</Link>
							)}
						</li>
					))}
					<LogOutButton />
				</ul>
				{/* End navigation */}

				{/* <div className="skills-percentage">
					<h4>Skills Percentage</h4>
					<p>
						`Put value for <strong>Cover Image</strong> field to increase your skill up to{' '}
						<strong>85%</strong>`
					</p>
					<div style={{width: 200, height: 200, margin: 'auto'}}>
						<CircularProgressbar
							background
							backgroundPadding={6}
							styles={buildStyles({
								backgroundColor: '#7367F0',
								textColor: '#fff',
								pathColor: '#fff',
								trailColor: 'transparent',
							})}
							value={percentage}
							text={`${percentage}%`}
						/>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default DashboardAdminSidebar;
