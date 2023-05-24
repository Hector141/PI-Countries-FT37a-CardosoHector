import Cards from "../cards/cards"
import './home.css';
import SearchBar from "../searchBar/searchBar";
import Filter from "../Filters/filter";

const Home = () => {


  return (
    <div className="home_container">

        <SearchBar></SearchBar>        
        <Filter></Filter>
        <Cards></Cards>
    </div>
  );
};

export default Home;
