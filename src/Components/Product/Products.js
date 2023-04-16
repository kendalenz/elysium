import React from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector(state => state);

  const Card = (props) => {
    return (
      <div>
        <img
          src={props.photo}
        />
        {props.name}
        {props.price}
      </div>
    )
  };

  return (
    <div>
      <hr></hr>
      {/* {
        products.map(product => (
         <Card
          id={props.id}
          key={props.id}
          photo={props.photo}
          name={props.name}
          price={props.price}
        />
        ))
      } */}
    </div>
  );
};

export default Products;

//join email list popup