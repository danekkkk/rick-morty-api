import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";
import styles from "./CharacterDetails.module.css";

export function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      setCharacter(response.data);
    } catch (error) {
      console.error("Wystąpił bład podczas pobierania danych: ", error);
      setTimeout(() => {
        navigate("/rick-morty-api/");
      }, 2000);
    }
  };

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

  function switchGender(gender) {
    switch (gender) {
      case "Male":
        gender = "Mężczyzna";
        break;
      case "Female":
        gender = "Kobieta";
        break;
      default:
        gender = "nieznana";
    }

    return gender;
  }

  if (!character) {
    return (
      <>
        <h1 className={styles.error}>Error 404</h1>
        <p className={styles.errorDescription}> brak danych o tej postaci!</p>
      </>
    );
  }

  return (
    <>
      <main className="container">
        <AsideMenu />
        <div className="aside"></div>
        <div className="source">
          <h1 className={styles.heading}>Informacje o bohaterze</h1>
          <div className={styles.displayInformations}>
            <div>
              <p>
                <b>Imię:</b> {character.name}
              </p>
              <p>
                <b>Status:</b> {switchStatus(character.status)}
              </p>
              <p>
                <b>Gatunek:</b> {switchSpecies(character.species)}
              </p>
              <p>
                <b>Płeć:</b> {switchGender(character.gender)}
              </p>
              <p>
                <b>Lokalizacja:</b> {character.location.name}
              </p>
              {character.origin.name !== "unknown" && (
                <p>
                  <b>Planeta:</b> {character.origin.name}
                </p>
              )}
            </div>
            <div>
              <img src={character.image} alt={character.name} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
