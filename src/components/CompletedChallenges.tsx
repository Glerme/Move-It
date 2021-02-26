import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){

    const{ desafiosCompletos } = useContext(ChallengesContext)

    return(
        <div className={styles.CompletedChallengesContainer}>
            <span>
                Desafios Completos
            </span>

            <span>
                {desafiosCompletos}
            </span>
        </div>
    )
}