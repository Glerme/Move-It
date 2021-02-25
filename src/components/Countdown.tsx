import { useState, useEffect } from "react";
import { start } from "repl";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {

    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)

    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    const [minutoEsquerda, minutoDireita] = String(minutos).padStart(2,'0').split('')
    const [secundosEsquerda, secundosDireita] = String(segundos).padStart(2,'0').split('')


    function startCountdown(){
        setActive(true)
    }

    useEffect(()=>{
        if(active && time > 0){
            setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        }
    },[active, time])


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

        <button type="button" className={styles.CountdownBtn} onClick={startCountdown}>Iniciar um ciclo</button>


    </div>
  );
}
