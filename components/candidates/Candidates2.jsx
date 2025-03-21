'use client';

import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Loader/Loader';
import {useSelector} from 'react-redux';

const Candidates2 = () => {
	//get all talents from the store
	const {talents: data, loading} = useSelector((state) => state.data);
	//reverse the order of the candidates
	const talents = data?.map((talent) => talent).reverse();

	if (loading) return <Loader />;
	return (
		<>
			{talents?.slice(0, 6).map((talent) => (
				<div className="candidate-block-two col-lg-6 col-md-12 col-sm-12" key={talent.talent_id}>
					<div className="inner-box">
						<div className="content-box">
							<figure className="image">
								<Image
									width={90}
									height={90}
									src={talent.user.photo || '/images/common-avatar.jpeg'}
									alt="avatar"
								/>
							</figure>
							<h4 className="name">{talent.user.name}</h4>
							<span className="designation">{talent.headline}</span>
							<div className="location">
								<i className="flaticon-map-locator"></i> {talent.country}
							</div>
						</div>
						{/* End .content-box */}
						<Link href={`/talents/${talent.talent_id}`} className="theme-btn btn-style-one">
							<span className="btn-title">View Profile</span>
						</Link>
					</div>
				</div>
			))}
		</>
	);
};

export default Candidates2;
