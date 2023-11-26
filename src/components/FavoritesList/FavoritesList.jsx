import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../SearchList/SearchList.module.css";
import favoriteIcon from "../../assets/favoriteIcon.svg";
import favoriteIconSet from "../../assets/favoriteIconSet.svg";
import Skeleton from "@mui/material/Skeleton";

export function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const delayLoading = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1500);

    return () => clearTimeout(delayLoading);
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
      const newFavorites = [character, ...favorites];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  }

  const handleCharacterClick = (characterId) => {
    navigate(`/rick-morty-api/character/${characterId}`);
  };

  if (skeletonLoading) {
    const skeletonArray = [];

    for (let i = 0; i < favorites.length; i++) {
      skeletonArray.push("#" + i);
    }
    return (
      <>
        <h1 className={styles.heading}>Ulubione postacie</h1>
        <div className={styles.sourceContainer}>
          {skeletonArray.map((el, index) => (
            <div key={index} className={styles.card}>
              <Skeleton variant="rounded" width={340} height={320} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className={styles.heading}>Ulubione postacie</h1>
      <div className={styles.sourceContainer}>
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
                      toggleFavorite(favorite);
                    }}
                  >
                    <img
                      src={
                        favorites.some(
                          (favorite) => favorite.id === favorite.id
                        )
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
    </>
  );
}
