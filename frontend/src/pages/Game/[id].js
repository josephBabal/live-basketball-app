import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { Socket, io } from 'socket.io-client'
import Chat from '../../components/Chat'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getGameList } from '@/redux/selectors'
import GameScoreBoard from '../../components/GameScoreboard'
import useFetchLogos from '../../hooks/useFetchLogos'
import useFetchDate from '../../hooks/useFetchDate'
import GammeScoreTable from '../../components/GameScoreTable'
import styles from '../../styles/curGamePage.module.css'
import Boxscore from '../../components/Boxscore'

let socket

export default function GamePage({gameList, gameStats}) {
  console.log("==gameStats", gameStats)
  const router = useRouter()
  const gameId = router.query.id
  // const gameList = useSelector(getGameList)
  const curGame = gameList.find(game => game.gameId === gameId)
  console.log("==curGame", curGame)

  const [ awayTeamLogo, homeTeamLogo ] = useFetchLogos(curGame.awayTeam.teamTricode, curGame.homeTeam.teamTricode)
  const [ fullDate ] = useFetchDate()


  const room = curGame.gameId
  const [username, setUsername] = useState("")
  const [showChat, setShowChat] = useState(false)
  console.log("==id game", gameId)
  function joinRoom() {
    if (username !== "") {
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }

  // const [boxScore, setBoxScore] = useState()
  useEffect(() => {
    socketInitializer()
    // async function fetchBoxScore() {
    //   const res2 = await fetch(`http://127.0.0.1:8000/boxScore/${router.query.id}`)
    //   const boxScore = await res2.json()
    //   setBoxScore(boxScore())
    // }
    // fetchBoxScore()
  }, [])


  // console.log("==boxScore", boxScore)

  async function socketInitializer() {
    await fetch("/api/socket");
    socket = io();
  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.scoreboardContainer}>
        <GameScoreBoard 
          game={curGame} 
          awayTeamLogo={awayTeamLogo}
          homeTeamLogo={homeTeamLogo}
          fullDate={fullDate}
        />
      </div>
      {gameStats !== "NOGAME" ?
      <div className={styles.belowScoreTable}>
        <div className={styles.boxScoreContainer}>
          <Boxscore game={gameStats} />
        </div>
        <div className={styles.liveChatContainer}>
          
          {!showChat ? 
          <div className={styles.loginChatContainer}>
            {/* <button className={styles.hideButton}> hide live chat </button> */}
            <div className={styles.liveChatTitle}> Game chat  </div>
            <div className={styles.inputContainer}>
              <input 
                className={styles.inputField}
                type="text"
                placeholder="enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <button className={styles.joinBtn} onClick={joinRoom}> join room </button>
            </div>
          </div>
          :
          <div className={styles.chatContainer}>
             {/* <button className={styles.hideButton}> hide live chat </button> */}
            <Chat socket={socket} username={username} room={room} />
          </div>
          }
        </div>
      </div> : <></>}
      
    </div>
  )
}

export const getStaticProps = async({params}) => {
  const res = await fetch(`http://127.0.0.1:8000/scoreboard`)
  const gameList = await res.json()

  const { id } = params

  const game = gameList.find(game => game.gameId === id)
  console.log("==aaggame", game)
  let gameStats
  if (game.gameStatusText === "Final" || game.gameStatusText !== "" && game.gameClock !== "") {
    const res2 = await fetch(`http://127.0.0.1:8000/boxScore/${id}`)
    gameStats = await res2.json()
  } else {
    gameStats = "NOGAME"
  }
  
  return {
    props: {
      gameList,
      gameStats,
    },
    revalidate: 20
  }
}

export const getStaticPaths = async() => {
  const res = await fetch(`http://127.0.0.1:8000/scoreboard`)
  const gameList = await res.json()

  const ids = gameList.map(game => game.gameId)
  const paths = ids.map(id => (
    { params: {id: id} }
    ))
  return {
    paths: paths,
    fallback: false
  }
}
