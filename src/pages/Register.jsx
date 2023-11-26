import { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrowLeft.svg";

export function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isRegistred, setIsRegistred] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = () => {
    if (!login || login.length < 5) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }

    if (!password || password.length < 5) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (login && login.length >= 5 && password && password.length >= 5) {
      localStorage.setItem("user", JSON.stringify({ login, password }));
      setIsRegistred(true);
    }
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setLoginError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  if (isRegistred) {
    return navigate("/rick-morty-api/login");
  }

  return (
    <>
      <Link to="/rick-morty-api/" className={styles.goBackBtn}>
        <img src={arrowLeft} alt="Go back" />
      </Link>

      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Zarejestruj się</h1>
          <form action="" className={styles.form}>
            <input
              type="text"
              className={`${styles.formInput} ${loginError && styles.error}`}
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
            />
            {loginError && (
              <p className={styles.textError}>
                Nazwa musi zawierać przynajmniej 5 znaków
              </p>
            )}
            <input
              type="password"
              className={`${styles.formInput} ${passwordError && styles.error}`}
              placeholder="Hasło"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className={styles.textError}>
                Hasło musi zawierać przynajmniej 5 znaków
              </p>
            )}
            <input
              type="button"
              value="Rejestruj"
              className={styles.button}
              onClick={handleRegistration}
            />
            <div className={styles.register}>
              <p>Masz już konto?</p>
              <Link to="/rick-morty-api/login" className={styles.link}>
                Zaloguj się
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
