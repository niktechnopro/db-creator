import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Carousel } from 'react-bootstrap';

class Carousels extends Component {
  render() {
    return (
        <Carousel
        pauseOnHover={false}
        wrap = {true}
        >
          <Carousel.Item>
            <img alt="900x500" src="/slider-images/slide1.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img alt="900x500" src="/slider-images/slide2.jpg" />
          </Carousel.Item>
          <Carousel.Item>
            <img alt="900x500" src="/slider-images/slide3.jpg" />
          </Carousel.Item>
        </Carousel>
      )
  }
}

export default Carousels;