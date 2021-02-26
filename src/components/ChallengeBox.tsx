import { useContext } from "react"
import { ChallengesContext } from "../contexts/ChallengesContext"
import { countdownContext } from "../contexts/CountdownContext"
import styles from "../styles/components/ChallengeBox.module.css"

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext)
    const {resetCountdown} = useContext(countdownContext)

    function handleChallengeSucceeded(){
        completeChallenge()
        resetCountdown()
    }


    function handleChallengeFailed(){
        resetChallenge()
        resetCountdown()
    }

    return(
        <div className={styles.ChallengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} XP</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.btnFailed} onClick={handleChallengeFailed}>Falhei</button>
                        <button type="button" className={styles.btnSuccess} onClick={handleChallengeSucceeded}>Completei</button>
                    </footer>

                </div>
            ) : (
                
                <div className={styles.ChallengeBoxNotActive}>  
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de Level completando desafios
                    </p>
                </div>
            )}

        </div>

            
    )
}