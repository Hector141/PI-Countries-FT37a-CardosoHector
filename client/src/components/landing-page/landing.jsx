import './landing.css';
import { NavLink } from "react-router-dom";
import Footer from '../footer/footer';

const Landing = () => {
  return (
    <div className='lan_cont'>
      <h1 className='h1_count'>COUNTRIES OF THE WORLD</h1>
      <NavLink to="/home" className="lanBtn">
        <button className='lanBtn'>Ingresar</button>
      </NavLink>

      <Footer className="landing-footer"/>
    </div>
  );
};

export default Landing;
