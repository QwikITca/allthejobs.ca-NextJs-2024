import Image from 'next/image';
import Link from 'next/link';

const SidebarHeader = () => {
	return (
		<div className="pro-header">
			<div className="logo-box">
				<Link href="/">
					<div className="logo uppercase">allthejobs.ca</div>
				</Link>
			</div>
			{/* End logo */}

			<div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
				<span className="flaticon-close"></span>
			</div>
			{/* icon close */}
		</div>
	);
};

export default SidebarHeader;
