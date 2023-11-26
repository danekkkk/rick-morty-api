import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SearchList.module.css";
import favoriteIcon from "../../assets/favoriteIcon.svg";
import favoriteIconSet from "../../assets/favoriteIconSet.svg";
import searchIcon from "../../assets/searchIcon.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";

export function SearchList() {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchName, setSearchName] = useState("");

  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [blurTimeout, setBlurTimeout] = useState(null);

  const navigate = useNavigate();

  const handleCharacterClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

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
          console.log(page, hasMore, characters, searchName);
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
      setPage(1);
      setCharacters([]);
      setHasMore(true);
      setLoading(true);
      setSkeletonLoading(true);
      fetchCharacters();
      if (searchName.trim() !== "") {
        addToSearchHistory(searchName);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchName]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoggedInStatus === "true");

    const storedSearchHistory = localStorage.getItem("searchHistory");
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToSearchHistory = (searchValue) => {
    const updatedHistory = [
      searchValue,
      ...searchHistory.filter((item) => item !== searchValue),
    ].slice(0, 3);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeFromSearchHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  function handleInputBlur() {
    const timeout = setTimeout(() => {
      setShowSearchHistory(false);
    }, 200);
    setBlurTimeout(timeout);
  }

  function handleInputFocus() {
    if (blurTimeout) {
      clearTimeout(blurTimeout);
    }
    setShowSearchHistory(true);
  }

  let isAnyResult = characters.length == 0;

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

  if (skeletonLoading) {
    const skeletonArray = [];

    for (let i = 0; i < 20; i++) {
      skeletonArray.push("#" + i);
    }

    return (
      <>
        <form action="#" className={styles.searchForm}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>
              <img src={searchIcon} alt="searchIcon" />
            </span>
            <input
              type="text"
              value={searchName}
              placeholder="Wyszukaj..."
              maxLength={70}
              onChange={(e) => {
                setPage(1);
                setSearchName(e.target.value);
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleInputBlur();
                setSearchName(e.target.value);
              }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
        </form>
        {searchHistory.length > 0 && showSearchHistory && (
          <div className={styles.searchHistory}>
            <div className={styles.searchHistoryHeading}>
              <h1>Ostatnie wyszukiwania:</h1>
              <button
                className={styles.deleteAllBtn}
                onClick={clearSearchHistory}
              >
                Wyczyść
              </button>
            </div>
            <ul className={styles.searchHistoryList}>
              {searchHistory.map((item, index) => (
                <li key={index}>
                  <span
                    onClick={() => {
                      setPage(1);
                      setSearchName(item);
                    }}
                  >
                    {item}
                  </span>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromSearchHistory(index);
                    }}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
      <form action="#" className={styles.searchForm}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>
            <img src={searchIcon} alt="searchIcon" />
          </span>
          <input
            type="text"
            value={searchName}
            placeholder="Wyszukaj..."
            maxLength={70}
            onChange={(e) => {
              setPage(1);
              handleInputBlur();
              setSearchName(e.target.value);
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setSearchName(e.target.value);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </form>
      {searchHistory.length > 0 && showSearchHistory && (
        <div className={styles.searchHistory}>
          <div className={styles.searchHistoryHeading}>
            <h1>Ostatnie wyszukiwania:</h1>
            <button
              className={styles.deleteAllBtn}
              onClick={clearSearchHistory}
            >
              Wyczyść
            </button>
          </div>
          <ul className={styles.searchHistoryList}>
            {searchHistory.map((item, index) => (
              <li key={index}>
                <span
                  onClick={() => {
                    setPage(1);
                    setSearchName(item);
                  }}
                >
                  {item}
                </span>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromSearchHistory(index);
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h1 className={styles.heading}>Wszystkie postacie</h1>
      <div className={styles.sourceContainer}>
        {isAnyResult && (
          <p className={styles.isAnyResult}>
            Brak danych z takim kryterium wyszukiwania :(
          </p>
        )}
        {characters.map((character, index) => (
          <div className={styles.card} key={index}>
            <img
              src={character.image}
              alt={character.name}
              onClick={() => handleCharacterClick(character.id)}
            />
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
                  onClick={() => {
                    if (!isLoggedIn) {
                      return navigate("/login");
                    } else {
                      toggleFavorite(character);
                    }
                  }}
                >
                  <img
                    src={
                      favorites.some(
                        (favorite) => favorite.id === character.id
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
        ))}
      </div>
    </InfiniteScroll>
  );
}
