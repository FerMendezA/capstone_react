import './App.css';
import Header from './Header';
import HomePage from './Homepage';
import Footer from './Footer';
import {Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className='container'>
      <Routes> 
      <Route path="/" exact element={<HomePage />}></Route>
      {/*<Route path="/booking" element={<BookingPage />}></Route>*/}
      </Routes>
    </div>
  );
}

export default App;
