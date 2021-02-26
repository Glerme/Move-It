import { create } from 'domain'
import {createContext, useState, ReactNode} from 'react'
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData{
    level: number,
    currentXP: number,
    desafiosCompletos: number,
    activeChallenge: Challenge,
    xpNextLvl:number,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () =>void
}

export const ChallengesContext = createContext({} as ChallengesContextData)


interface ChallengesProviderProps{
    children: ReactNode
}

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level , setLevel] = useState(1)
    const [currentXP, setCurrentXP] = useState(0)
    const [desafiosCompletos , setDesafiosCompletos] = useState(0)
    const[activeChallenge, setActiveChallenge] = useState(null)
    const xpNextLvl = Math.pow((level + 1)* 4 ,2)

    function levelUp(){
        setLevel( level + 1)
    }


    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex] 

        setActiveChallenge(challenge)
    }


    function resetChallenge(){
        setActiveChallenge(null)        
    }



    return(
        <ChallengesContext.Provider 
            value={{level ,
                    currentXP ,
                    desafiosCompletos, 
                    activeChallenge,
                    xpNextLvl,
                    levelUp,
                    startNewChallenge,
                    resetChallenge
                    }}>
            {children}
        </ChallengesContext.Provider>
    )
}

