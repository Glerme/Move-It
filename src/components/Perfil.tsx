import styles from "../styles/components/Perfil.module.css"

export function Perfil(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Glerme.png" alt="Guilherme Felipe" />
            <div>
                <strong>Guilherme Felipe</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}