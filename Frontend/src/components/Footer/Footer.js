import React from 'react';

export default function Footer() {
  return (
    <footer className="page-footer light-red">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Company Bio</h5>
            <p className="grey-text text-lighten-4">
              We make babysitting easy, both for Parents and Babysitters!
            </p>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">More information</h5>
            <ul>
              <li>
                <a className="white-text" href="#!">
                  Tips for Parents
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  Tips for Babysitters
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  Parents FAQ
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  Babysitters FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">Contact us</h5>
            <ul>
              <li>
                <a className="white-text" href="#!">
                  savov.venko@gmail.com
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  +359 898 344 940
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          Made by{' '}
          <a
            className="orange-text text-lighten-3"
            href="https://github.com/VenkoSavov" target="_blank" rel="noopener noreferrer"
          >
            Venko Savov
          </a>
        </div>
      </div>
    </footer>
  );
}
