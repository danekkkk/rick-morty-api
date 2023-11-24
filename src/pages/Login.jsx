import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import arrowLeft from "../assets/arrowLeft.svg";

export function Login() {
  return (
    <>
      <Link to="/"><img src={arrowLeft} style={{height: "50px",position: "absolute", marginTop: "10px", marginLeft: "10px"}}/></Link>
      <div className={styles.container}>
      
        <div className={styles.main}>
          <h1 className={styles.nazwa}>Zaloguj się</h1>
          <form action="" className={styles.form}>
            {/* <label htmlFor="" className={styles.loginlabel}>Login</label> */}
            <input type="text" className={styles.login} placeholder="Login" />
            {/* <label htmlFor="" className={styles.passwordlabel}>Hasło</label> */}
            <input type="text" className={styles.password} placeholder="Hasło" />
            <input type="button" value="Zaloguj" className={styles.button} />
            <div className={styles.register}>
              <p className={styles.paragraph}>Jeszcze nie masz konta?</p>
              <Link to="/register" className={styles.link}>Zarejestruj się</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
