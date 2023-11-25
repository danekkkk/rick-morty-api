import { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../assets/arrowLeft.svg";

export function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistred, setIsRegistred] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = () => {
    if (login && password) {
      localStorage.setItem("user", JSON.stringify({ login, password }));
      console.log(JSON.stringify({ login, password }));
      setError("");
      setIsRegistred(true);
    } else {
      setError("Wypełnij wszystkie pola");
    }
  };

  if (isRegistred) {
    return navigate("/login");
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
          <h1 className={styles.nazwa}>Zarejestruj się</h1>
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
              value="Rejestruj"
              className={styles.button}
              onClick={handleRegistration}
            />
            <div className={styles.register}>
              <p className={styles.error}>{error}</p>
              <p className={styles.paragraph}>Masz już konto?</p>
              <Link to="/login" className={styles.link}>
                Zaloguj się
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
