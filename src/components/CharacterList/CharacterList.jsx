import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import styles from "./CharacterList.module.css";
import favoriteIcon from "../../assets/favoriteIcon.svg";

export function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const newCharacters = response.data.results;
      if (newCharacters.length > 0) {
        setTimeout(() => {
          setLoading(false);
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
      console.error("Error fetching characters:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    {character.status} - {character.species}
                  </p>
                </div>
              </div>
              <div>
                <button className={styles.addToFavorite}>
                  <img src={favoriteIcon} alt="like button" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}