import React from 'react'
import OldGameCard from '@/components/OldGameCard'

export default function YesterdayGames({gameList}) {
  console.log("==old games", gameList)
  const listGameIds = gameList.map(game => (game.GAME_ID))
  const uniqueGameIds = [...new Set(listGameIds)]
  console.log("==uniqueGameIds",uniqueGameIds)
  return (
    <div>
      {uniqueGameIds.map(gameId => (
        <OldGameCard gameId={gameId} key={gameId} /> 
      ))}
    </div>
  )
}

export const getStaticProps = async() => {
  const res = await fetch(`http://127.0.0.1:8000/getYesterdayGames`)
  const gameList = await res.json()
  console.log(gameList)
  
  return {
    props: {
      gameList,
    }
  }
}