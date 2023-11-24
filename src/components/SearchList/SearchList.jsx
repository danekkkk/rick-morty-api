import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../CharacterList/CharacterList.module.css";
import favoriteIcon from "../../assets/favoriteIcon.svg";
import favoriteIconSet from "../../assets/favoriteIconSet.svg";
import Skeleton from "@mui/material/Skeleton";

export function SearchList() {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState(false);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${searchName}`
      );
      const newCharacters = response.data.results;
      if (newCharacters.length > 0) {
        setTimeout(() => {
          setLoading(false);
          setSkeletonLoading(false);
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...newCharacters,
          ]);
          setPage((prevPage) => prevPage + 1);
        }, 1000);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setLoading(false);
      setSkeletonLoading(false);
      return;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCharacters([]);
      setHasMore(true);
      setPage(1);
      setLoading(true);
      setSkeletonLoading(true);
      fetchCharacters();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

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
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, character]);
    }
  }

  if (skeletonLoading) {
    const skeletonArray = [];

    for (let i = 0; i < 20; i++) {
      skeletonArray.push("#" + i);
    }

    return (
      <>
        <h1 className={styles.heading}>Wszystkie postacie</h1>
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

  if (error) {
    return <p>Brak danych z takim kryterium wyszukiwania :(</p>;
  }

  return (
    <InfiniteScroll
      dataLength={characters.length}
      next={fetchCharacters}
      hasMore={hasMore}
      loader={
        loading && (
          <div className={styles.loading}>
            <CircularProgress
              variant="indeterminate"
              size={30}
              color="inherit"
            />
          </div>
        )
      }
    >
      <input
        type="text"
        placeholder="Search by character name..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <h1 className={styles.heading}>Wszystkie postacie</h1>
      <div className={styles.sourceContainer}>
        {characters.map((character, index) => (
          <div className={styles.card} key={index}>
            <img src={character.image} alt={character.name} />
            <div className={styles.cardInfo}>
              <div>
                <p className={styles.characterName}>{character.name}</p>
                <div className={styles.characterInfo}>
                  <span
                    className={`${
                      character.status === "Alive" ? styles.isAlive : ""
                    }
                    ${character.status === "Dead" ? styles.isDead : ""}
                    ${character.status === "unknown" ? styles.isUnknown : ""}
                    `}
                  ></span>
                  <p>
                    {switchStatus(character.status)} -
                    {switchSpecies(character.species)}
                  </p>
                </div>
              </div>
              <div>
                <button
                  className={styles.addToFavorite}
                  onClick={() => toggleFavorite(character)}
                >
                  <img
                    src={
                      favorites.some((favorite) => favorite.id === character.id)
                        ? favoriteIconSet
                        : favoriteIcon
                    }
                    alt="like button"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}