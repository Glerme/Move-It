import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css"
export function ExperienceBar(){

    const {currentXP, xpNextLvl} = useContext(ChallengesContext)


    const porcentNextLvl = Math.round((currentXP * 100) / xpNextLvl)



    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>

            <div>
                <div style={{ width: `${porcentNextLvl}%`}}></div>
                
                <span className={styles.currentXp} style={{left:`${porcentNextLvl}%`}}>{currentXP} xp</span>
            </div>

            <span>{xpNextLvl} xp</span>

        </header>
    );
}