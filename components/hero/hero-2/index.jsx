import SearchForm from '@/components/common/job-search/SearchForm';
import Image from 'next/image';
const index = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted');
	};

	return (
		<div className="job-search-section py-5">
			<div className="auto-container">
				<div className="row align-items-center hero">
					{/* Left Content */}
					<div className="col-lg-6 left-content" data-aos="fade-up" data-aos-delay="500">
						<h1 className="mb-1">
							Discover <br />
							more than <br />
							<span className="text-primary">5000+ Jobs</span>
						</h1>
						<img
							src="https://mamtaz.com/desFour/images/hero-svg.svg"
							alt=""
							style={{height: '25px'}}
							className="hero-svg"
						/>
						<p className="mb-4">
							Great platform for the job seeker that searching for
							<br />
							new career heights and passionate about startups.
						</p>

						<div className="job-search-form">
							<SearchForm />
						</div>

						<p className="mt-2 text-muted">Popular: UI Designer, UX Researcher, Android, Admin</p>
					</div>

					{/* Right Content with Background Image */}
					<div
						className="d-none d-lg-block col-lg-6 text-center right-content"
						data-aos="fade-in"
						data-aos-delay="500"
					>
						{/* Sub Images */}
						<img
							src="https://mamtaz.com/desFour/images/Rectangle1.png"
							alt="Sub Image 1"
							className="sub-image one"
						/>
						<img
							src="https://mamtaz.com/desFour/images/Rectangle2.png"
							alt="Sub Image 2"
							className="sub-image two"
						/>
						<img
							src="https://mamtaz.com/desFour/images/Rectangle3.png"
							alt="Sub Image 3"
							className="sub-image three"
						/>
						<img
							src="https://mamtaz.com/desFour/images/Rectangle4.png"
							alt="Sub Image 4"
							className="sub-image four"
						/>
						<img
							src="https://mamtaz.com/desFour/images/frame5.png"
							alt="Sub Image 5"
							className="sub-image five"
						/>
						{/* <!-- Info BLock One --> */}
						<div className="image-box">
							<div className="info_block hr" data-aos="fade-in" data-aos-delay="1000">
								<div>
									<span className="icon">
										<Image
											width={40}
											height={40}
											src="/images/video-icon.png"
											alt="mulit people"
											className="video-icon"
										/>
									</span>
									<p className="text-start">
										Meet With Our <br />
										HR Professionals.
									</p>
								</div>
							</div>

							{/* <!-- Info BLock Four --> */}
							<div className="info_block_four cv" data-aos="fade-in" data-aos-delay="2500">
								<span className="icon flaticon-file"></span>
								<div className="inner">
									<p>Upload Your CV</p>
									<span className="sub-text">It only takes a few seconds</span>
								</div>
							</div>
						</div>

						{/* Main Image */}
						<img
							src="https://mamtaz.com/desFour/images/hero3.png"
							alt="Person"
							className="img-fluid hero-image"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default index;