import { create } from "domain";
import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import LevelUpModal from "../components/levelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentXP: number;
  desafiosCompletos: number;
  activeChallenge: Challenge;
  xpNextLvl: number;
  isLevelUpModalOpen;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentXP: number;
  desafiosCompletos: number;
}

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
  const [desafiosCompletos, setDesafiosCompletos] = useState(
    rest.desafiosCompletos ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const xpNextLvl = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentXP", String(currentXP));
    Cookies.set("desafiosCompletos", String(desafiosCompletos));
  }, [level, currentXP, desafiosCompletos]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🧗🏼‍♀️ 🧗🏼", {
        body: `Valendo ${challenge.amount} XP`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalXp = currentXP + amount;

    if (finalXp > xpNextLvl) {
      finalXp = finalXp - xpNextLvl;
      levelUp();
    }

    setCurrentXP(finalXp);
    setActiveChallenge(null);
    setDesafiosCompletos(desafiosCompletos + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentXP,
        desafiosCompletos,
        activeChallenge,
        isLevelUpModalOpen,
        xpNextLvl,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
