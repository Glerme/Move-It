import { create } from 'domain'
import {createContext, useState, ReactNode, useEffect} from 'react'
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
    resetChallenge: () => void,
    completeChallenge: () => void
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

    useEffect(() => {
        Notification.requestPermission()
    }, [])


    function levelUp(){
        setLevel( level + 1)
    }


    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex] 

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🧗🏼‍♀️ 🧗🏼',{
                body:`Valendo ${challenge.amount} XP`
            })
        }
    }


    function resetChallenge(){
        setActiveChallenge(null)        
    }


    function completeChallenge(){   
        if(!activeChallenge){
            return
        }

        const { amount }= activeChallenge

        let finalXp = currentXP + amount

        if( finalXp > xpNextLvl){
            finalXp = finalXp - xpNextLvl
            levelUp()
        }

        setCurrentXP(finalXp)
        setActiveChallenge(null)
        setDesafiosCompletos(desafiosCompletos + 1)


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
                    resetChallenge,
                    completeChallenge
                    }}>
            {children}
        </ChallengesContext.Provider>
    )
}

