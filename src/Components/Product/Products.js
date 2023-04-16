import React, { useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector((state) => state);
  console.log( products)

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
    {
      products.map((product) => {
        return (
          <Card
            id={product.id}
            key={product.id}
            photo={product.photo}
            name={product.name}
            price={product.price}
          />
            
        )
      })
    }
    </div>
  );
};

export default Products;

//join email list popup