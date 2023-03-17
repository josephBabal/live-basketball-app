import React, { useState } from 'react'
import styles from '../styles/Boxscore.module.css'
import TeamBoxscore from '../components/TeamBoxscore'

export default function Boxscore({game}) {
  // true = awayTeam, false = homeTeam
  const [isSelected, setIsSelected] = useState(true)
  const handleSelected = () => {
    setIsSelected(prev => !prev)
  }


  // store all starters and sort by points max to min
  const awayStarters = game.awayTeam.players.filter(player => player.starter === "1")
  awayStarters.sort((a,b) => (b.statistics.points - a.statistics.points ))

  // store all bench players and sort by points max to min
  const awayBench =  game.awayTeam.players.filter(player => player.starter === "0")
  awayBench.sort((a,b) => (b.statistics.points - a.statistics.points))
  console.log("==starters", awayStarters, "bench:", awayBench)

  // home team
  const homeStarters = game.homeTeam.players.filter(player => player.starter === "1")
  homeStarters.sort((a,b) => (b.statistics.points - a.statistics.points ))

  // store all bench players and sort by points max to min
  const homeBench =  game.homeTeam.players.filter(player => player.starter === "0")
  homeBench.sort((a,b) => (b.statistics.points - a.statistics.points))
  console.log("==starters", homeStarters, "bench:", homeBench)

  return (
    <div className={styles.boxscoreContainer}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.teamButton} 
          id={isSelected ? styles.selected : styles.notSelected}
          onClick={handleSelected}
        > 
          {game.awayTeam.teamName} 
        </button> 
        <button 
          className={styles.teamButton} 
          id={isSelected ? styles.notSelected : styles.selected}
          onClick={handleSelected}
        > 
          {game.homeTeam.teamName}
        </button>
      </div>

      {isSelected ? 
      <TeamBoxscore starters={awayStarters} bench={awayBench}/>
      : <TeamBoxscore starters={homeStarters} bench={homeBench}/>
      }

    </div>
  )
}
