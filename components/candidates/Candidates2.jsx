import Link from 'next/link';
import candidates from '../../data/candidates';
import Image from 'next/image';

const Candidates2 = () => {
	return (
		<>
			{candidates.slice(0, 6).map((candidate) => (
				<div className="candidate-block-two col-lg-6 col-md-12 col-sm-12" key={candidate.id}>
					<div className="inner-box">
						<div className="content-box">
							<figure className="image">
								<Image width={90} height={90} src={candidate.avatar} alt="avatar" />
							</figure>
							<h4 className="name">{candidate.name}</h4>
							<span className="designation">{candidate.designation}</span>
							<div className="location">
								<i className="flaticon-map-locator"></i> {candidate.location}
							</div>
						</div>
						{/* End .content-box */}
						<button
							href={`/candidates-single-v1/${candidate.id}`}
							className="theme-btn btn-style-one"
						>
							<span className="btn-title">View Profile</span>
						</button>
					</div>
				</div>
			))}
		</>
	);
};

export default Candidates2;
