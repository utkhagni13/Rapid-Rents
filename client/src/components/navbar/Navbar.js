import React, { useEffect, useState } from "react";
import { RiHome4Line } from "react-icons/ri";
import { slide as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoSignIn } from "react-icons/go";
import { HiOutlineLogin } from "react-icons/hi";
import { VscChecklist } from "react-icons/vsc";
import { useHistory } from "react-router-dom";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "30px",
    height: "24px",
    right: "26px",
    top: "16px",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "var(--textColor)",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0",
  },
  bmMenu: {
    background: "var(--themeColor)",
    border: "5px solid var(--bodyColor)",
  },
  bmItemList: {
    color: "var(--textColor)",
    padding: "var(--smallGap)",
  },
  bmItem: {
    display: "flex",
    flexDirection: "column",
  },
};

const navlist = [
  {
    name: "Home",
    icon: <RiHome4Line />,
    path: "/",
  },
  {
    name: "Login",
    icon: <HiOutlineLogin />,
    path: "/login",
  },
  {
    name: "Register",
    icon: <GoSignIn />,
    path: "/register",
  },
  {
    name: "Bookings",
    icon: <VscChecklist />,
    path: "/bookings",
  },
];

const Navbar = () => {
  const [navbarState, setNavbarState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView } = navbarState;
  const history = useHistory();

  // when in desktop view
  const DisplayDesktop = () => {
    return (
      <div className="links">
        {navlist.map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                history.push(`${item.path}`);
              }}
            >
              <div className="menu_item">
                <div style={{ marginTop: "5px" }}>{item.icon}</div>
                <div>{item.name}</div>
              </div>
            </p>
          );
        })}
      </div>
    );
  };

  //when in mobile view
  const DisplayMobile = () => {
    //functions to handle states
    const handleDrawerOpen = () => {
      setNavbarState((prevState) => ({ ...prevState, drawerOpen: true }));
    };
    const handleDrawerClose = (state) => {
      setNavbarState((prevState) => ({ ...prevState, drawerOpen: state }));
    };

    return (
      <div className="mobile_navbar">
        <Menu
          styles={styles}
          width={"40%"}
          isOpen={navbarState.drawerOpen}
          className={"slider"}
          customBurgerIcon={
            <GiHamburgerMenu
              onClick={() => {
                handleDrawerOpen();
              }}
            />
          }
          onStateChange={(state) => handleDrawerClose(state.isOpen)}
          right
        >
          <div>
            {navlist.map((item, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    handleDrawerClose(false);
                    history.push(`${item.path}`);
                  }}
                >
                  <div className="menu_item">
                    <div style={{ marginTop: "5px" }}>{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                </p>
              );
            })}
          </div>
        </Menu>
      </div>
    );
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 952
        ? setNavbarState((prevState) => ({ ...prevState, mobileView: true }))
        : setNavbarState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return function cleanup() {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  return (
    <div className="navbar">
      <div className="common_btn">
        <a href="/" rel="noreferrer">
          <button>Rapid-Rents</button>
        </a>
      </div>
      {mobileView ? DisplayMobile() : DisplayDesktop()}
    </div>
  );
};

export default Navbar;
