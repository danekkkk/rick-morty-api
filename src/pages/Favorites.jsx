import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/SearchList/SearchList.module.css";
import favoriteIcon from "../assets/favoriteIcon.svg";
import favoriteIconSet from "../assets/favoriteIconSet.svg";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoggedInStatus === "true");
  }, []);

  function switchSpecies(species) {
    switch (species) {
      case "Human":
        species = " Człowiek";
        break;
      case "Alien":
        species = " Kosmita";
        break;
      case "Animal":
        species = " Zwierze";
        break;
      case "Humanoid":
        species = " Humanoid";
        break;
      case "Mythological Creature":
        species = " Stworzenie mitologiczne";
        break;
      case "Robot":
        species = " Robot";
        break;
      case "Cronenberg":
        species = " Cronenberg";
        break;
      case "Disease":
        species = " Choroba";
        break;
      case "unknown":
        species = " nieznane";
        break;
      case "Poopybutthole":
        species = " Poopybutthole";
        break;
    }

    return species;
  }

  function switchStatus(status) {
    switch (status) {
      case "Dead":
        status = "Martwy";
        break;
      case "Alive":
        status = "Żywy";
        break;
      case "unknown":
        status = "nieznane";
        break;
    }

    return status;
  }

  function toggleFavorite(character) {
    const isAlreadyAdded = favorites.some(
      (favorite) => favorite.id === character.id
    );

    if (isAlreadyAdded) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.id !== character.id
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const newFavorites = [...favorites, character];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  }

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  if (!isLoggedIn) {
    return navigate("/login");
  }

  return (
    <main className="container">
      <AsideMenu />
      <div className="aside"></div>
      <div className="source">
        {/* osobny componment */}
        <h1 className={styles.heading}>Ulubione postacie</h1>
        {favorites.length === 0 ? (
          <p className={styles.isAnyResult}>
            Nie polubiono żadnych bohaterów :(
          </p>
        ) : (
          favorites.map((favorite, index) => (
            <div className={styles.card} key={index}>
              <img
                src={favorite.image}
                alt={favorite.name}
                onClick={() => handleCharacterClick(favorite.id)}
              />
              <div className={styles.cardInfo}>
                <div>
                  <p className={styles.characterName}>{favorite.name}</p>
                  <div className={styles.characterInfo}>
                    <span
                      className={`${
                        favorite.status === "Alive" ? styles.isAlive : ""
                      }
                    ${favorite.status === "Dead" ? styles.isDead : ""}
                    ${favorite.status === "unknown" ? styles.isUnknown : ""}
                    `}
                    ></span>
                    <p>
                      {switchStatus(favorite.status)} -
                      {switchSpecies(favorite.species)}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className={styles.addToFavorite}
                    onClick={() => {
                      if (!isLoggedIn) {
                        return navigate("/login");
                      } else {
                        toggleFavorite(favorite);
                      }
                    }}
                  >
                    <img
                      src={
                        favorites.some(
                          (favorite) => favorite.id === favorite.id
                        ) && isLoggedIn
                          ? favoriteIconSet
                          : favoriteIcon
                      }
                      alt="like button"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
