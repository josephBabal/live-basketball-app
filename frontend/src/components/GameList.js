import React from 'react'
import GameCard from './GameCard'
export default function GameList({gameList}) {
  return (
    <div>
      hello
      {gameList.map((game, idx) => (
        <GameCard game={game} key={idx}/>
      ))}
    </div>
  )
}
