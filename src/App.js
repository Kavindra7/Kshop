import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import TShirts from './pages/Categories/TShirts';
import Caps from './pages/Categories/Caps';
import Denims from './pages/Categories/Denims';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import HelpCenter from './pages/HelpCenter';
import Policies from './pages/Policies';
import Newsletter from './pages/Newsletter';
import Birthdaygift from './pages/Gift/Birthdaygift';
import Anniversarygifts from './pages/Gift/Anniversarygifts';
import Weddinggift from './pages/Gift/Weddinggift';
import Admindashboard from './pages/Admindashboard';
import Userdashboard from './pages/Userdashboard';
import ForgotPasssword from './pages/ForgotPasssword';

function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<Userdashboard/>} />
        <Route path="/admin" element={<Admindashboard />} />
        <Route path="/categories/tshirts" element={<TShirts />} />
        <Route path="/categories/caps" element={<Caps />} />
        <Route path="/categories/denims" element={<Denims />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/inquiries/helpcenter" element={<HelpCenter />} />
        <Route path="/aboutUs/policies" element={<Policies />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route
          path="/populargiftcategories/birthdaygift"
          element={<Birthdaygift />}
        />
        <Route
          path="//populargiftcategories/anniversarygift"
          element={<Anniversarygifts />}
        />
        <Route
          path="/populargiftcategories/weddinggift"
          element={<Weddinggift />}
        />
      </Routes>
      <Footer />
    </>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
