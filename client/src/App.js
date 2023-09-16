import Favorites from "./components/Favorites";
import Header from "./components/Header";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Media from "./components/Media";
import SearchResults from "./components/SearchResults";
import SignUp from "./components/SignUp";

import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="routes">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search_results/:searchTerm' element={<SearchResults searchTerm={'brad pitt'}/>}/>
          <Route path='/media/:media_type/:media_id' element={<Media media_id={114461} media_type={'tv'}/>}/>
          <Route path='/favorites' element={<Favorites user='Mike'/>}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<LogIn />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
