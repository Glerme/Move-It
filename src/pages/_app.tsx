import "../styles/global.css";
import { ChallengesProvider, ChallengesContext } from "../contexts/ChallengesContext";
import { useState } from "react";


function MyApp({ Component, pageProps }) {
  return(
    <ChallengesProvider>
        <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
