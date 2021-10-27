import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home';
import Explore from './pages/explore';
// import ItemDetailRedux from './pages/ItemDetailRedux';
import Author from './pages/Author';
import Wallet from './pages/wallet';
import Create from './pages/create';
import { useWeb3React } from '@web3-react/core';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const App = () => {
  const { account } = useWeb3React()
  return (
    <div className="wraper">
      <GlobalStyles />
      <Header />
      <PosedRouter>
        <ScrollTop path="/">
          <Home exact path="/">
            <Redirect to="/home" />
          </Home>
          {/* 
            <ItemDetailRedux path="/ItemDetail" />
          */}
          {
            account &&
            <>
              <Create path="/create" />
              <Author path="/Author" />
            </>
          }
          <Explore path="/explore" />
          <Wallet path="/wallet" />
        </ScrollTop>
      </PosedRouter>
      <ScrollToTopBtn />
    </div>
  );
}
export default App;