import React, { useEffect, useState } from "react";
import { RiHome4Line } from "react-icons/ri";
import { slide as Menu } from "react-burger-menu";
import { GiHamburgerMenu } from "react-icons/gi";
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
    background: "var(--bodyColor)",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: "0",
  },
  bmMenu: {
    background: "var(--textColor)",
  },
  bmItemList: {
    color: "var(--bodyColor)",
    padding: "var(--smallGap)",
  },
  bmItem: {
    display: "flex",
    flexDirection: "column",
  },
};

const navList = () => {
  return [
    {
      name: "Log-In",
      link: "/login",
    },
    {
      name: "Sign-Up",
      link: "/signup",
    },
  ];
};

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
        {navList().map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                history.push(`${item.link}`);
              }}
            >
              {item.name}
            </p>
          );
        })}
        <div
          onClick={() => {
            history.push("/");
          }}
          className="hover_field"
        >
          <RiHome4Line size="1.5rem" />
        </div>
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
            <div
              onClick={() => {
                history.push("/");
                handleDrawerClose(false);
              }}
              style={{ marginBottom: "var(--smallGap)" }}
            >
              <RiHome4Line color="black" size="1.5rem" />
            </div>
            {navList().map((item, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    handleDrawerClose(false);
                    history.push(`/${item.link}`);
                  }}
                >
                  {item.name}
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
          <button>LOGO Here</button>
        </a>
      </div>
      {mobileView ? DisplayMobile() : DisplayDesktop()}
    </div>
  );
};

export default Navbar;
