import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const CategoriesList = () => {
  return (
    <>
    <h2>Shop our popular gift categories</h2>
    <div className="d-flex flex-wrap">
      <Card style={{ width: '18rem', marginLeft: '10px' }}>
        <Card.Img
          variant="top"
          src="https://i.ibb.co/5GpKJwm/happy-birthday-gffea5623f-1920.jpg"
        />
        <Card.Body>
          <Card.Title>
            <Card.Link as={Link} to={'/populargiftcategories/birthdaygift'}>Bithday Gift</Card.Link>
          </Card.Title>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginLeft: '10px' }}>
        <Card.Img
          variant="top"
          src="https://i.ibb.co/9WTb2C1/3-12.jpg"
        />
        <Card.Body>
          <Card.Title>
          <Card.Link as={Link} to={'/populargiftcategories/anniversarygift'}>Anniversary Gifts</Card.Link>
          </Card.Title>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
      <Card style={{ width: '18rem', marginLeft: '10px' }}>
        <Card.Img
          variant="top"
          src="https://i.ibb.co/6FxK2TN/images.jpg"
        />
        <Card.Body>
          <Card.Title>
          <Card.Link as={Link} to={'/populargiftcategories/weddinggift'}>Wedding Gift</Card.Link>
          </Card.Title>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
    </div>
    </>
  );
};

export default CategoriesList;
