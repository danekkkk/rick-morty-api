import "../App.css";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";
import styles from "../components/CharacterList/CharacterList.module.css";
import searchIcon from "../assets/searchIcon.svg";

import { SearchList } from "../components/SearchList/SearchList";

export function Search() {
  return (
    <>
      <main className="container">
        <AsideMenu />
        <div className="aside"></div>
        <div className="source">
          <label htmlFor="search">
            <img src={searchIcon} alt="searchIcon" />
          </label>
          <input type="text" id="search" />
          <h1 className={styles.heading}>Ostatnie wyszukania</h1>
          <button>Usuń</button>
          <div>
            <img
              src="https://rickandmortyapi.com/api/character/avatar/252.jpeg"
              alt=""
            />
            <p>Noob-Noob</p>
            <p>Alive</p>
          </div>
          <h1 className={styles.heading}>Kategorie</h1>
          <div className={styles.sourceContainer}>
            <SearchList />
          </div>
        </div>
      </main>
    </>
  );
}
