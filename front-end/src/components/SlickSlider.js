import React, { Component } from 'react';
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SlickSlider extends Component{
	render(){
		const settings = {
			dots: true,
			infinite: true,
			speed: 1000,
			slidesToShow: 0,
			slidesToScroll: 0,
			autoplay: true,
			fade: true,
			centerMode: true,
			pauseOnHover: false,
			variableWidth: false
		    // lazyLoad: true,
			// arrows: true
		}
		return(
			<div className="fromTop">
				<Slider {...settings}>
					<div className="slick-image"><img src="/slider-images/slide1.jpg" alt="slide1"/></div>
					<div className="slick-image"><img src="/slider-images/slide2.jpg" alt="slide2" /></div>
					<div className="slick-image"><img src="/slider-images/slide3.jpg" alt="slide3" /></div>
					<div className="slick-image"><img src="/slider-images/slide4.jpg" alt="slide4" /></div>
				</Slider>
			</div>
		)
	}
}

export default SlickSlider;