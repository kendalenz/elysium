import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductsByCategory = () => {
  const { products } = useSelector((state) => state);

  const Card = (props) => {
    return (
      <div className="card mx-4 my-4">
        <Link to={`/products?category=${props.category}`}>
          <img
            src={props.photo}
            className="card-img-top"
            alt="Product"
          />
          <div className="card-body">
            <div className="card-text">
              {props.category} <span>&#8594;</span>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const productsByCategoryMap = new Map();

  products.forEach((product) => {
    const category = product.category;
    if (!productsByCategoryMap.has(category)) {
      productsByCategoryMap.set(category, product);
    }
  });

  const groupedProducts = Array.from(productsByCategoryMap, ([category, product]) => ({ category, product }));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-center">
      {groupedProducts.map(({ category, product }) => (
        <Card
          key={category}
          photo={product.photo}
          category={category}
        />
      ))}
    </div>
  );
};

export default ProductsByCategory;