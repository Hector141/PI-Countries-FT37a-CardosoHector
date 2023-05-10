import './landing.css';
import { NavLink} from "react-router-dom";

const Landing = ()=> {


    return(
        <div className='lan_cont'>
            <NavLink to="/home" className="home"><button className='lanBtn'>HOME</button></NavLink>
        </div>
    )
}

export default Landing