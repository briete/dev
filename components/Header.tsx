import React from 'react';

export const Header: React.FC = () => {
  return (
    <nav className="uk-navbar-container uk-margin" data-uk-navbar>
      <div className="uk-navbar-center">
        <div className="uk-navbar-center-left"></div>
        <a className="uk-navbar-item uk-logo" href="#">
          YANAO.DEV
        </a>
      </div>
    </nav>
  );
};
