import './App.css';
import { Route, Routes } from "react-router-dom";
import Landing from './components/landing-page/landing';
import {  useLocation } from 'react-router-dom';
import Cards from './components/cards/cards';
import Detail from './components/detail/detail';
import Nav from './components/nav/nav';
import Form from './components/form/form';


function App() {
const location = useLocation()

  return (
    
    <div>

      {
        location.pathname !== "/" && location.pathname !== "/home" && <Nav />
      }

    <Routes>

        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Cards/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/form" element={<Form/>} />
       </Routes>
       </div>
  )
}

export default App;
