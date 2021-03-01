import { ExperienceBar } from "../components/ExperienceBar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Perfil } from "../components/Perfil";
import styles from "../styles/pages/Home.module.css";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";


interface HomeProps{
  level: number,
  currentXP: number,
  desafiosCompletos: number; 
}


export default function Home(props:HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentXP={props.currentXP}
      desafiosCompletos={props.desafiosCompletos}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio - MoveIt</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Perfil />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentXP, desafiosCompletos } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXP: Number(currentXP),
      desafiosCompletos: Number(desafiosCompletos),
    },
  };
};
