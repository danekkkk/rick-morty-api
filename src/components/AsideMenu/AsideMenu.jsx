import { useState, useEffect } from "react";
import styles from "./AsideMenu.module.css";
import heartIcon from "../../assets/heartIcon.svg";
import homeIcom from "../../assets/homeIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import shekelSignIcon from "../../assets/shekelSignIcon.svg";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

export function AsideMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isPathActive = (path) => {
    return location.pathname === path ? styles.active : "";
  };

  // mozna wyniesc do pages/Home
  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  return (
    <aside className={styles.asideMenu}>
      <div>
        <h1 className={styles.heading}>Rick & Morty</h1>
        <ul className={styles.links}>
          <Link to="/">
            <li className={isPathActive("/")}>
              <div className={styles.linksFlex}>
                <img src={homeIcom} />
                Strona główna
              </div>
            </li>
          </Link>
          <Link to="/search">
            <li className={isPathActive("/search")}>
              <div className={styles.linksFlex}>
                <img src={searchIcon} />
                Wyszukaj
              </div>
            </li>
          </Link>
          <Link to="/favorites">
            <li className={isPathActive("/favorites")}>
              <div className={styles.linksFlex}>
                <img src={heartIcon} />
                Polubione
              </div>
            </li>
          </Link>
        </ul>
      </div>
      <div className={styles.loginBtn}>
        <Link to={isLoggedIn ? "/" : "/login"} onClick={handleLogout}>
          <div className={styles.linksFlex}>
            <img src={shekelSignIcon} />
            {isLoggedIn ? "Wyloguj się" : "Zaloguj się"}
          </div>
        </Link>
      </div>
    </aside>
  );
}
