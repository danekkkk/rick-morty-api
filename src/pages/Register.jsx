import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import arrowLeft from "../assets/arrowLeft.svg";

export function Register() {
  return (
    <>
      <Link to="/"><img src={arrowLeft} style={{height: "50px",position: "absolute", marginTop: "10px", marginLeft: "10px"}}/></Link>
      <div className={styles.container}>
        
        <div className={styles.main}>
          <h1 className={styles.nazwa}>Zarejestruj się</h1>
          <form action="" className={styles.form}>
            <input type="text" className={styles.login} placeholder="Login" />
            <input type="text" className={styles.password} placeholder="Hasło" />
            <input type="button" value="Rejestruj" className={styles.button} />
            <div className={styles.register}>
              <p className={styles.paragraph}>Masz już konto?</p>
              <Link to="/login" className={styles.link}>Zaloguj się</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
