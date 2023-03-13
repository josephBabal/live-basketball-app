import React from 'react'
import CardStyles from '../styles/GameCard.module.css'
import teamLogos from '../data/teamLogos'
import router from 'next/router'
import useFetchLogos from '../hooks/useFetchLogos'
import useFetchDate from '../hooks/useFetchDate'
export default function GameCard({game}) {
  // const router = useRouter()

  const [ awayTeamLogo, homeTeamLogo] = useFetchLogos(game.awayTeam.teamTricode, game.homeTeam.teamTricode)
  const [ fullDate ] = useFetchDate()
 
 
  console.log(teamLogos)
  console.log("==date", fullDate)
  console.log("==game", game)
  console.log("==awayTeamlogo", awayTeamLogo)
  console.log("==homeTeamlogo", homeTeamLogo)
  
  function sendData() {
    router.push({
      pathname: `/Game/${game.gameId}`
    })
  }
  

  return (
    <div className={CardStyles.card} 
          onClick={() => sendData()}
    >
     
      <div className={CardStyles.time}> 
        <div> {fullDate}  </div>
        <div className={CardStyles.gameStatus}> {game.gameStatusText}</div>
      </div>
      <div className={CardStyles.awayTeamContent}>
        <img className={CardStyles.logo} src={awayTeamLogo.url} />
        <div className={CardStyles.teamName} > {game.awayTeam.teamName} </div>
        {game.gameClock === "" && game.gameStatusText !== "Final" ? <div className={CardStyles.record}> {game.awayTeam.wins} - {game.awayTeam.losses} </div>  : <div className={CardStyles.liveScore}> {game.awayTeam.score} </div>}
      </div>
      <div className={CardStyles.homeTeamContent}>
        <img className={CardStyles.logo} src={homeTeamLogo.url} />
        <div className={CardStyles.teamName}> {game.homeTeam.teamName} </div>
        {game.gameClock === "" && game.gameStatusText !== "Final" ? <div className={CardStyles.record}> {game.homeTeam.wins} - {game.homeTeam.losses} </div> : <div className={CardStyles.liveScore}> {game.homeTeam.score} </div>}
      </div>
    </div>
    // <div className={CardStyles.card}>
    //   <div className={CardStyles.cardContent}>
    //     <div className={CardStyles.awayTeam}>
    //       {awayTeam.teamName}
    //       {awayTeam.teamTricode}

    //     </div>
    //     <div className={CardStyles.scoreAndtime}>
    //       {game.gameStatusText}
    //     </div>
    //     <div className={CardStyles.homeTeam}>
    //       {homeTeam.teamName}
    //     </div>

    //   </div>
      
    // </div>
  )
}
