import { useState, useEffect } from "react";
import styles from "./AsideMenu.module.css";
import heartIcon from "../../assets/heartIcon.svg";
import homeIcom from "../../assets/homeIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import burgerMenu from "../../assets/burgerMenuIcon.svg";
import burgerClose from "../../assets/burgerCloseIcon.svg";
import shekelSignIcon from "../../assets/shekelSignIcon.svg";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

export function AsideMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 925);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 925);
  };

  const isPathActive = (path) => {
    return location.pathname === path ? styles.active : "";
  };

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className={styles.burgerMenu}>
            <button onClick={() => setIsExpanded((prevValue) => !prevValue)}>
              <img
                src={isExpanded ? burgerClose : burgerMenu}
                alt="Expand Menu"
              />
            </button>
          </div>
          <aside
            className={`${styles.asideMenuMobile} ${
              isExpanded ? styles.menuVisible : ""
            }`}
          >
            <div>
              <h1 className={styles.heading}>Rick & Morty</h1>
              <ul className={styles.links}>
                <Link to="/rick-morty-api/">
                  <li className={isPathActive("/rick-morty-api/")}>
                    <div className={styles.linksFlex}>
                      <img src={homeIcom} />
                      Strona główna
                    </div>
                  </li>
                </Link>
                <Link to="/rick-morty-api/search">
                  <li className={isPathActive("/rick-morty-api/search")}>
                    <div className={styles.linksFlex}>
                      <img src={searchIcon} />
                      Wyszukaj
                    </div>
                  </li>
                </Link>
                <Link to="/rick-morty-api/favorites">
                  <li className={isPathActive("/rick-morty-api/favorites")}>
                    <div className={styles.linksFlex}>
                      <img src={heartIcon} />
                      Polubione
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
            <div className={styles.loginBtn}>
              <Link
                to={isLoggedIn ? "/rick-morty-api/" : "/rick-morty-api/login"}
                onClick={handleLogout}
              >
                <div className={styles.linksFlex}>
                  <img src={shekelSignIcon} />
                  {isLoggedIn ? "Wyloguj się" : "Zaloguj się"}
                </div>
              </Link>
            </div>
          </aside>
        </>
      ) : (
        <aside className={styles.asideMenu}>
          <div>
            <h1 className={styles.heading}>Rick & Morty</h1>
            <ul className={styles.links}>
              <Link to="/rick-morty-api/">
                <li className={isPathActive("/rick-morty-api/")}>
                  <div className={styles.linksFlex}>
                    <img src={homeIcom} />
                    Strona główna
                  </div>
                </li>
              </Link>
              <Link to="/rick-morty-api/search">
                <li className={isPathActive("/rick-morty-api/search")}>
                  <div className={styles.linksFlex}>
                    <img src={searchIcon} />
                    Wyszukaj
                  </div>
                </li>
              </Link>
              <Link to="/rick-morty-api/favorites">
                <li className={isPathActive("/rick-morty-api/favorites")}>
                  <div className={styles.linksFlex}>
                    <img src={heartIcon} />
                    Polubione
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div className={styles.loginBtn}>
            <Link
              to={isLoggedIn ? "/rick-morty-api/" : "/rick-morty-api/login"}
              onClick={handleLogout}
            >
              <div className={styles.linksFlex}>
                <img src={shekelSignIcon} />
                {isLoggedIn ? "Wyloguj się" : "Zaloguj się"}
              </div>
            </Link>
          </div>
        </aside>
      )}
    </>
  );
}
