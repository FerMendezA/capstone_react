import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Menu from './Menu';
import BookingPage from './Booking';

function HomePage() {
  return (
    <div className='container'>
      <Header />
      <Main />
      <Menu />
      <Footer />
    </div>
  );
}

export default HomePage;
