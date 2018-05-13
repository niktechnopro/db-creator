import React from 'react';
import StarRatings from 'react-star-ratings';
  
 
const Stars = (props) => {
    // console.log(props)//;
    var starColor = (props.starColor) ? props.starColor : '243, 200, 7';
    var starDimention = (props.starDimention) ? props.starDimention : "40px";
    console.log(starDimention);
    console.log(starColor);
    return (
      <StarRatings
        rating={Number(props.rating)}
        starRatedColor= {`rgb(${starColor})`}
        starDimension={`${starDimention}`}
        starSpacing="1px"
      />
    );
}

export default Stars;