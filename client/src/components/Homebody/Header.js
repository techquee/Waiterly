import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    id: 1,
    src:'https://nice-branding.com/wp-content/uploads/2017/04/output_jVfEfz.gif',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    id: 2,
    src:'http://survivalchic.com/wp-content/uploads/2015/03/Jamies-italian-slideshare.gif',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    id: 3,
    src:'http://westchestersocialmedia.com/wp-content/uploads/2012/03/Simplicious-Feb-2012-178-proof.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const header = {
  'backgroundSize':'cover',
  height:'100%',
  width:'100%'
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
         <img src={item.src} style={header} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `.custom-tag {
                max-width: 100%;
                height: 500px;
                background-color:#666266;
              }`
          }
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
      </div>
    );
  }
}

export default Header;