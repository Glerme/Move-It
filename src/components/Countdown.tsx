import { count } from "console";
import { useState, useEffect, useContext } from "react";
import { start } from "repl";
import { countdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css";


export function Countdown() {

  const {minutos,segundos,hasFinished,startCountdown,resetCountdown,isActive} = useContext(countdownContext)

  const [minutoEsquerda, minutoDireita] = String(minutos)
    .padStart(2, "0")
    .split("");
  const [secundosEsquerda, secundosDireita] = String(segundos)
    .padStart(2, "0")
    .split("");


  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutoEsquerda}</span>
          <span>{minutoDireita}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secundosEsquerda}</span>
          <span>{secundosDireita}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.CountdownBtn}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.CountdownBtn} ${styles.CountdownBtnActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.CountdownBtn}
              onClick={startCountdown}
            >
              Iniciar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
