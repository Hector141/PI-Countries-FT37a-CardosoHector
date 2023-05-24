import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCountries } from '../../redux/actions';
import Card from '../card/card';
import './cards.css';

const Cards = () => {
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const continent = useSelector((state) => state.continent);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);


  const countriesToShow = continent === 'All' ? allCountries : filteredCountries;

  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = countriesToShow.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(countriesToShow.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="cards-container">
      <div className="card-container">
        {currentItems.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      {countriesToShow.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <p>{currentPage}</p>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Cards;