import './App.css';
import { Route, Routes } from "react-router-dom";
import Landing from './components/landing-page/landing';
import Home from './components/home/home';

function App() {

  return (
    <div>
    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
       </Routes>
       </div>
  )
}

export default App;
