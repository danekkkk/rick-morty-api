import { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrowLeft.svg";

export function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.login === login &&
      storedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      setIsLoggedIn(true);
      // Tutaj możesz przekierować użytkownika do innej strony po zalogowaniu
    } else {
      setError("Nieprawidłowy login lub hasło");
    }
  };

  if (isLoggedIn) {
    return navigate("/");
  }

  return (
    <>
      <Link to="/">
        <img
          src={arrowLeft}
          style={{
            height: "50px",
            position: "absolute",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        />
      </Link>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.nazwa}>Zaloguj się</h1>
          <form action="" className={styles.form}>
            <input
              type="text"
              className={styles.login}
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="text"
              className={styles.password}
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="button"
              value="Zaloguj"
              className={styles.button}
              onClick={handleLogin}
            />
            <div className={styles.register}>
              <p className={styles.error}>{error}</p>
              <p className={styles.paragraph}>Jeszcze nie masz konta?</p>
              <Link to="/register" className={styles.link}>
                Zarejestruj się
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
