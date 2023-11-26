import { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrowLeft.svg";

export function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginError(false);
    setPasswordError(false);
    setError(false);

    if (!login || login.length < 5) {
      setLoginError("Nazwa użytkownika musi mieć przynajmniej 5 znaków");
    }

    if (!password || password.length < 5) {
      setPasswordError("Hasło musi mieć przynajmniej 5 znaków");
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.login === login &&
      storedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      setError("Nieprawidłowy login lub hasło");
    }
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setLoginError(false);
    setLoginError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setError("");
  };

  if (isLoggedIn) {
    return navigate("/rick-morty-api/");
  }

  return (
    <>
      <Link to="/rick-morty-api/" className={styles.goBackBtn}>
        <img src={arrowLeft} alt="Go back" />
      </Link>

      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Zaloguj się</h1>
          <form action="" className={styles.form}>
            <input
              type="text"
              className={`${styles.formInput} ${loginError && styles.error}`}
              placeholder="Login"
              value={login}
              onChange={handleLoginChange}
            />
            {loginError && <p className={styles.textError}>{loginError}</p>}
            <input
              type="password"
              className={`${styles.formInput} ${passwordError && styles.error}`}
              placeholder="Hasło"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className={styles.textError}>{passwordError}</p>
            )}
            {error && !passwordError && (
              <p className={styles.textError}>{error}</p>
            )}
            <input
              type="button"
              value="Zaloguj"
              className={styles.button}
              onClick={handleLogin}
            />
            <div className={styles.register}>
              <p>Nie masz jeszcze konta?</p>
              <Link to="/rick-morty-api/register" className={styles.link}>
                Zarejestruj się
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
