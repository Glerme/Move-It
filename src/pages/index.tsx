import { ExperienceBar } from '../components/ExperienceBar'
import Head from 'next/head'
import { Perfil } from '../components/Perfil'
import styles from '../styles/pages/Home.module.css'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'


export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Inicio - MoveIt</title>
      </Head>


      <ExperienceBar/>

      <section>
        <div>
          <Perfil/>
          <CompletedChallenges/>
          <Countdown/>
        </div>

        <div>

        </div>
      </section>
    </div>
  )
}
