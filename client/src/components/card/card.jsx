import React from 'react';
import { Link } from 'react-router-dom';
import "./card.css"

const Card = ({ item }) => (
  <div key={item.id} className="card">
    <Link to={`/detail/${item.id}`}>
      <img src={item.image} alt={item.name} />
    </Link>
    <div className="img_data">
      <h3>{item.name}</h3>
      <p>Continent: {item.continent}</p>
    </div>
  </div>
);

export default Card;
