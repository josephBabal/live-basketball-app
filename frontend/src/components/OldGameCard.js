import React, { useState, useEffect } from 'react'
import CardStyles from '../styles/GameCard.module.css'
import teamLogos from '../data/teamLogos'
import router from 'next/router'
import useFetchLogos from '../hooks/useFetchLogos'
import useFetchDate from '../hooks/useFetchDate'

export default function OldGameCard({gameId}) {
  const [game, setGame] = useState({})
  useEffect(() => {
    async function getGameDetails() {
      let gameDetails = {}
      try {
        const res = await fetch(`http://127.0.0.1:8000/getYesterdayGameDetails/${gameId}`)
        if (res.status !== 200) {
          console.log("== bad status:", res.status)
        } else {
          console.log("== good status:", res.status)
          gameDetails = await res.json()
        }
      } catch(e) {
        if (e instanceof DOMException) {
          console.log("HTTP request cancelled")
        } else {
          console.error("Error:", e)
          throw e
        }
      }
      setGame(gameDetails)
    }
    getGameDetails()
  }, [])
  

  console.log("==after setting", game.homeTeam)
  

  // const [ awayTeamLogo, homeTeamLogo] = useFetchLogos(game.awayTeam.teamTricode, game.homeTeam.teamTricode)
  


  return (
    <div className={CardStyles.card} 
          
    >

    </div>
  )
}

