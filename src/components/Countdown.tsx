import { count } from "console";
import { useState, useEffect, useContext } from "react";
import { start } from "repl";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

  const { startNewChallenge } = useContext(ChallengesContext)





  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutos = Math.floor(time / 60);
  const segundos = time % 60;

  const [minutoEsquerda, minutoDireita] = String(minutos)
    .padStart(2, "0")
    .split("");
  const [secundosEsquerda, secundosDireita] = String(segundos)
    .padStart(2, "0")
    .split("");

  function startCountdown() {
    setActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setActive(false);
    setTime(0.05 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setActive(false);
      startNewChallenge()
    }
  }, [isActive, time]);

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
