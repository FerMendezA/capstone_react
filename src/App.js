import './App.css';
import Header from './Header';
import HomePage from './Homepage';
import Footer from './Footer';
import {Route,Routes} from "react-router-dom"
import BookingPage from './Booking';
import ConfirmedBooking from './ConfirmedBooking';

function App() {
  return (
    <div className='container'>
      <Routes> 
      <Route path="/" exact element={<HomePage />}></Route>
      {<Route path="/booking" element={<BookingPage />}></Route>}
      <Route path="/success" exact element={<ConfirmedBooking/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
