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


let socket

export default function GamePage({gameList}) {
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

  useEffect(() => {
    socketInitializer()
  }, [])

  async function socketInitializer() {
    await fetch("/api/socket");
    socket = io();
  }


  return (
    <div className={styles.pageContainer}>
      <div>
        <GameScoreBoard 
          game={curGame} 
          awayTeamLogo={awayTeamLogo}
          homeTeamLogo={homeTeamLogo}
          fullDate={fullDate}
        />
      </div>
      <div className={styles.belowScoreTable}>
        <div className={styles.boxScoreContainer}>
          box score
        </div>
        <div className={styles.liveChatContiner}>
          
          {!showChat ? 
          <div>
            <div className={styles.gameChatTitle}> Game chat  </div>
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
            <Chat socket={socket} username={username} room={room} />
          </div>
          }
          {/* <Link href="/"> Go back</Link> */}
        </div>
        
        </div>
      </div>
  )
}

export const getStaticProps = async() => {
  const res = await fetch(`http://127.0.0.1:8000/scoreboard`)
  const gameList = await res.json()
  return {
    props: {
      gameList,
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