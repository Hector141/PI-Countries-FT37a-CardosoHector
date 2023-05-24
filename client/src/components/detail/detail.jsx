import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountryDetail } from '../../redux/actions';
import './detail.css';

const Detail = () => {
  const { id } = useParams();
  const countryDetail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryDetail(id));
  }, [dispatch, id]);

  return (
    <div className="container main-container">
      <div className="cont_det">
        <h1 className="detail_h1">Detail</h1>
        <h2 className="h">Name: {countryDetail?.name}</h2>
        <h2 className="h">Continent: {countryDetail?.continent}</h2>
        <h2 className="h">Capital: {countryDetail?.capital}</h2>
        <h2 className="h">Subregion: {countryDetail?.subregion}</h2>
        <h2 className="h">Area: {countryDetail?.area}</h2>
        <h2 className="h">Population: {countryDetail?.population}</h2>
        <div className='act_cont'>
        <h2 >Activities:</h2>
        <ul className='ul_actividades'>
          {countryDetail?.activities?.map((activity) => (
          <li key={activity.id}>
          Name: {activity.name}<br />
          Dificulty: {activity.dificulty}<br />
          Duration: {activity.duration} Hours<br />
          Season: {activity.season}
        </li>
          ))}
        </ul>
        </div>
      </div>
      <img className="detail_img" src={countryDetail?.image} alt={countryDetail?.name} />
    </div>
  );
};

export default Detail;
