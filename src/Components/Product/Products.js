import React from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const { products } = useSelector((state) => state);
  console.log( products)

  const Card = (props) => {
    return (
      <div className="card mx-4 my-4">
        <img
          src={props.photo}
          className="card-img-top"
        />
        <div className="card-text">
          {props.name}
          <br/>
          ${props.price}
        </div>
      </div>
    )
  };

  return (
    <div>
    {
      products.map((product) => {
        return (
          <div className='d-flex flex-row flex-wrap justify-content-center'>
            <Card
              id={product.id}
              key={product.id}
              photo={product.photo}
              name={product.name}
              price={product.price}
            />
           </div>
        );
      })
    }
    </div>
  );
};

export default Products;

//join email list popup