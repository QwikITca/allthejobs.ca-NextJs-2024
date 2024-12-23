import Login from '@/components/common/form/login/Login';
import FormContent2 from '../../common/form/login/FormContent2';
import MobileMenu from '../../header/MobileMenu';
import Header from './Header';

const index = () => {
	return (
		<>
			<Header />
			{/* <!--End Main Header -->  */}

			<MobileMenu />
			{/* End MobileMenu */}

			<div className="login-section">
				<div
					className="image-layer"
					style={{backgroundImage: 'url(/images/background/login-register.png)'}}
				></div>
				<div className="outer-box">
					{/* <!-- Login Form --> */}
					<div className="login-form default-form">
						<Login />
					</div>
					{/* <!--End Login Form --> */}
				</div>
			</div>
			{/* <!-- End Info Section --> */}
		</>
	);
};

export default index;
