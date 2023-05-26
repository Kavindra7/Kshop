import React from 'react';
import product_card from '../data/product_data';
import { Button } from 'react-bootstrap';

const ProductListing = () => {
  const listItems = product_card.map((item) => (
    <div className="card" key={item.id}>
      <div className="card_img">
        <img src={item.thumb} style={{ maxWidth: '300px' }} />
      </div>
      <div className="card_header">
        <h2>{item.product_name}</h2>
        <p>{item.description}</p>
        <p className="price">
          {item.price}
          <span>{item.currency}</span>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="dark" className="mx-auto">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  ));

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="main_content">
        <h3>The best quality TShirts</h3>
        {listItems}
      </div>
    </div>
  );
};

export default ProductListing;
