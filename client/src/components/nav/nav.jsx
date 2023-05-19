import "./nav.css"
import { NavLink} from "react-router-dom";

const Nav = ()=> {



    return (
        <div className="nav">
           <NavLink to="/home"><button className="home">HOME</button></NavLink> 
           <NavLink to="/form">< button className="form">Crear Actividad</button></NavLink>
        </div>
      );
      
}

export default Nav