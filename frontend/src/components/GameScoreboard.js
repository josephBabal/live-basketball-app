import React from 'react'
import styles from '../styles/GameScoreboard.module.css'
import GammeScoreTable from './GameScoreTable'


export default function GameScoreboard({game, awayTeamLogo, homeTeamLogo, fullDate}) {
  console.log("==game", game)
  return (
    <div className={styles.scoreboardContainer}>
      <div className={styles.awayTeamContent}>
        <div>
          <div className={styles.teamName}> {game.awayTeam.teamCity} {game.awayTeam.teamName}  </div>
          <div className={styles.record}> {game.awayTeam.wins} - {game.awayTeam.losses} </div>
        </div>
        <img className={styles.logo} src={awayTeamLogo.url} />
        <div className={styles.score}> {game.awayTeam.score} </div>
      </div>

      <div className={styles.gameStatus}>
        <div> {game.gameClock === "" ? fullDate : <></>}</div>
        <div className={styles.gameStatusText}> {game.gameStatusText}</div>
        {game.gameClock !== "" && game.gameStatus !== "Final" ? <></> : <GammeScoreTable game={game}/>}
      </div>

      <div className={styles.homeTeamContent}>
        <div className={styles.score}> {game.homeTeam.score} </div>
        <img className={styles.logo} src={homeTeamLogo.url} />
        <div>
          <div className={styles.teamName}> {game.homeTeam.teamCity} {game.homeTeam.teamName}  </div>         
          <div className={styles.record}> {game.awayTeam.wins} - {game.awayTeam.losses} </div> 
        </div>
      </div>

    </div>
  )
}
