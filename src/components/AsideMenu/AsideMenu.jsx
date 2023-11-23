import styles from "./AsideMenu.module.css";
import heartIcon from "../../assets/heartIcon.svg";
import homeIcom from "../../assets/homeIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import shekelSignIcon from "../../assets/shekelSignIcon.svg";

export function AsideMenu() {
  return (
    <aside className={styles.asideMenu}>
      <div>
        <h1 className={styles.heading}>Rick & Morty</h1>
        <ul className={styles.links}>
          <a href="#">
            <li className={styles.active}>
              <div className={styles.linksFlex}>
                <img src={homeIcom} />
                Strona główna
              </div>
            </li>
          </a>
          <a href="#">
            <li>
              <div className={styles.linksFlex}>
                <img src={searchIcon} />
                Wyszukaj
              </div>
            </li>
          </a>
          <a href="#">
            <li>
              <div className={styles.linksFlex}>
                <img src={heartIcon} />
                Polubione
              </div>
            </li>
          </a>
        </ul>
      </div>
      <div className={styles.loginBtn}>
        <a href="#">
          <div className={styles.linksFlex}>
            <img src={shekelSignIcon} />
            Zaloguj się
          </div>
        </a>
      </div>
    </aside>
  );
}
