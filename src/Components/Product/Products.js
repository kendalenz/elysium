import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Products = () => {

  const { products } = useSelector((state) => state);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategoryParam = queryParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryParam || "All");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    queryParams.set("category", category);
    const queryString = queryParams.toString();
    window.history.replaceState(null, "", `?${queryString}`);
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const Card = (props) => {
    return (
      <div className="card mx-4 my-4">
        <Link to={`/products/${props.id}`}>
          <img
            src={props.photo}
            className="card-img-top"
            alt="Product"
          />
          <div className="card-text">
            {props.name}
            <br />
            ${props.price}
          </div>
        </Link>
      </div>
    );
  };

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
  uniqueCategories.unshift("All"); // Add "All" as the first option

  return (
    <div>
      <div className="d-flex justify-content-left ms-4 mb-4">
        <select
          className="form-select"
          id='product-filter'
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {filteredProducts.map((product) => {
          return (
            <Card
              id={product.id}
              key={product.id}
              photo={product.photo}
              name={product.name}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;