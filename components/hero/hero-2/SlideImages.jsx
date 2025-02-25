'use client';
import Slider from 'react-slick';
const SliderImages = () => {
	const images = [
		{src: '/images/hero/hero-1.png', alt: 'hero-1'},
		{src: '/images/hero/hero-2.png', alt: 'hero-2'},
		{src: '/images/hero/hero-3.png', alt: 'hero-3'},
		{src: '/images/hero/hero-4.png', alt: 'hero-4'},
	];

	// Settings
	const settings = {
		dots: false,
		speed: 1400,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		cssEase: 'linear',
		pauseOnHover: false,
		pauseOnFocus: false,
		pauseOnDotsHover: false,
		fade: true,
		autoplay: true,
		autoplaySpeed: 5000,
	};

	return (
		<>
			<Slider {...settings} arrows={false}>
				{images.map((img, i) => (
					<img key={i} src={img.src} alt={img.alt} className="img-fluid hero-image" />
				))}
			</Slider>
		</>
	);
};

export default SliderImages;
