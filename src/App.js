// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Faviourite from './Components/Favourite'
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Moviesnfo from './Components/Moviesnfo';

// 51:00
function App() {
  return (
    <>
      <Router >
        <Navbar />
        <Routes>
          <Route path='/' exact element={[<Banner />, <Movies />]} />
          <Route path='/favourites' element={<Faviourite />} />
          <Route path='/moviesInfo' element={<Moviesnfo />}></Route>
        </Routes>

        {/* <Movies />
        <Faviourite /> */}
      </Router >
    </>
  );
}

export default App;
