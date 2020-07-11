import React from 'react';

export default function Header() {
  return (
    <React.Fragment>
      <h2 className="header center red-text text-darken-3 bold">HappySitting</h2>
      <div className="row center">
        <h4 className="header col s12 bold">Connect with the best babysitters around you !</h4>
        <h4 className="header col s12 bold">Find the best babysitting jobs around you !</h4>
      </div>
      <div className="row center">
        <a
          href="http://materializecss.com/getting-started.html"
          id="download-button"
          className="btn waves-effect waves-light pink accent-3"
        >
          View my Offers
        </a>
      </div>
    </React.Fragment>
  );
}
