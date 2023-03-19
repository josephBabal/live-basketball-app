import React from 'react'
import GameCard from './GameCard'
import styles from '../styles/GamePage.module.css'
export default function GameList({gameList}) {
  return (
    <div className={styles.grid}>
      {gameList.map((game, idx) => (
        <GameCard game={game} key={idx}/>
      ))}
    </div>
  )
}
