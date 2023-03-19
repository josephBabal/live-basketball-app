import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import GameList from '../../components/GameList'
import { useDispatch, useSelector } from 'react-redux'
import { addGames } from '@/redux/store'
import { getGameList } from '../../redux/selectors'
import styles from '../../styles/GamePage.module.css'

export default function GamePage({gameList, oldGames}) {
  const dispatch = useDispatch()
  dispatch(addGames({list :gameList}))
  // const list = useSelector(getGameList)

  // console.log("==list", list.value.list)
  console.log("==allGames", gameList)
  console.log("==old games", oldGames)
  // console.log("teamList", teamList)
  return (
    <div className={styles.GamePageContainer}>
      Todays games
      <GameList gameList={gameList}/>
    </div>
  )
}

export const getServerSideProps = async() => {
  const res = await fetch(`http://127.0.0.1:8000/scoreboard`)
  const gameList = await res.json()
  // const oldGamesRes = await fetch(`http://127.0.0.1:8000/yesterday`)
  // const oldGames = await oldGamesRes.json()
  
  return {
    props: {
      gameList,
      // oldGames,
    }
  }
}


// export const getStaticProps = async() => {
//   const res = await fetch(`http://127.0.0.1:8000/scoreboard`)
//   const gameList = await res.json()
//   return {
//     props: {
//       gameList,
//     },
//     revalidate: 20
//   }
// }

// export const getStaticPaths = async() => {
//   const res = await fetch(`http://127.0.0.1:8000/scoreboard`)
//   const gameList = await res.json()

//   const ids = gameList.map(game => game.gameId)
//   const paths = ids.map(id => (
//     { params: {id: id.toString()} }
//     ))
//   return {
//     paths: paths,
//     fallback: false
//   }
// }