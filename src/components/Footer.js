import React, { useState } from 'react';
import { BsInstagram, BsPinterest, BsTelephoneOutbound } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { MdHome, MdOutlineFax } from 'react-icons/md';
import { MDBFooter } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function SubscriptionForm() {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted email:', email);
    // TODO: Send email to server
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="emailInput">Subscribe to our newsletter</label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px' }} // add margin to input field
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary text-white"
        style={{ backgroundColor: 'blue' }}
      >
        <Link as={Link} to={'/Newsletter'}>
          Subscribe
        </Link>
      </button>
    </form>
  );
}

function Footer() {
  return (
    <MDBFooter color="white" bgColor="dark">
      <div className="container bg-dark text-white">
        <div className="main-footer border border-dark">
          <div className="container">
            <div className="row">
              {/* Column 1 */}
              <div className="col-md-3 col-5m-6 bg-dark">
                <h4> Inquiries</h4>
                <ul className="list-unstyled">
                  <Link as={Link} to={'/inquiries/helpcenter'}>
                    <li>Help Center</li>
                  </Link>
                </ul>
              </div>
              {/* Column 2 */}
              <div className="col-md-3 col-5m-6 bg-dark">
                <h4> About US</h4>
                <ul className="list-unstyled">
                  <Link as={Link} to={'/aboutUs/policies'}>
                    <li>Policies</li>
                  </Link>
                </ul>
              </div>
              {/* Column 3 */}
              <div className="col-md-3 col-5m-6">
                <h4> Contact Us</h4>
                <ul className="list-unstyled">
                  <li>
                    <MdHome /> New York, NY 10012, US
                  </li>
                  <li>
                    <AiOutlineMail /> info@example.com
                  </li>
                  <li>
                    <BsTelephoneOutbound /> + 01 234 567 88
                  </li>
                  <li>
                    <MdOutlineFax /> + 01 234 567 89
                  </li>
                </ul>
              </div>
              {/* Column 4 */}
              <div className="col-md-3 col-5m-6 bg-dark">
                <h4>Connect With Us</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="https://www.instagram.com/kvproduction/">
                      <BsInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com/kvproduction/">
                      <BsPinterest />
                    </a>
                  </li>
                </ul>
                <SubscriptionForm />
              </div>
            </div>
            {/*Footer Bottom */}
            <div className="footer-bottom">
              <p className="text-xs-center">
                &copy;{new Date().getFullYear()} KSHOP BY KAVINDRA -All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MDBFooter>
  );
}

export default Footer;
