import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Link } from '@reach/router';
import { useWeb3React } from '@web3-react/core'


setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);



const Header = function () {
  const { account, deactivate } = useWeb3React()
  const [showmenu, btn_icon] = useState(false);
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  const loggout = () => {
    if (window.confirm("Are you sure to disconnect the wallet?")) deactivate();
  }
  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>
        <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                <img
                  src="./img/logo.svg"
                  className="d-block"
                  alt="#"
                  height="40px"
                  />
                <img
                  src="./img/logo-light.svg"
                  className="d-none"
                  height="40px"
                  alt="#"
                />
              </NavLink>
            </div>
          </div>

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu &&
                <div className='menu'>
                  <div className='navbar-item'>
                    <NavLink to="/">
                      <div className="dropdown-custom btn">
                        Home
                      </div>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/explore">
                      <div className="dropdown-custom btn">
                        Explore
                      </div>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/create">
                      <div className="dropdown-custom btn">
                        Create
                      </div>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/ItemDetail">
                      <div className="dropdown-custom btn">
                        Detail
                      </div>
                    </NavLink>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/Author">
                      <div className="dropdown-custom btn">
                        Author
                      </div>
                    </NavLink>
                  </div>
                </div>
              }
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <NavLink to="/">
                    <div className="dropdown-custom btn">
                      Home
                      <span className='lines'></span>
                    </div>
                  </NavLink>
                </div>
                <div className='navbar-item'>
                  <NavLink to="/explore">
                    <div className="dropdown-custom btn">
                      Explore
                      <span className='lines'></span>
                    </div>
                  </NavLink>
                </div>
                {/* <div className='navbar-item'>
                  <NavLink to="/ItemDetail">
                    <div className="dropdown-custom btn">
                      Detail
                      <span className='lines'></span>
                    </div>
                  </NavLink>
                </div> */}
                {
                  account? <div className='navbar-item'>
                  <NavLink to="/create">
                    <div className="dropdown-custom btn">
                      Create
                      <span className='lines'></span> 
                    </div>
                  </NavLink>
                </div>: ''
                }
                {
                  account? <div className='navbar-item'>
                  <NavLink to="/Author">
                    <div className="dropdown-custom btn">
                      My NFTs
                      <span className='lines'></span> 
                    </div>
                  </NavLink>
                </div>: ''
                }
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className='mainside'>
            {
              account?<div className="btn-main" onClick={loggout}>{account.slice(0,5)}...{account.slice(-5)}</div> :
                <NavLink to="/wallet" className="btn-main">Connect Wallet</NavLink>
            }
          </div>

        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>
    </header>
  );
}
export default Header;