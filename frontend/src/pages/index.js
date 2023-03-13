import Head from 'next/head'
import pageStyles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import LiveChat from '../components/LiveChat'
import Link from 'next/link'
import ScrollContainer from 'react-indiana-drag-scroll'


export default function Home() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [room, setRoom] = useState("")

  

  // async function test() {
  //   let response = {}
  //   try {
  //     const res = await fetch('api/hello')
  //     response = res.json()
  //     setMessage(response)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   test()
  // }, [])

  console.log(message)

  return (
    <div className={pageStyles.homeContainer}> 
    
      <ScrollContainer className={pageStyles.imageTrack}>
        <img className={pageStyles.image} src="/images/image1.png" draggable="false"/>
        <img className={pageStyles.image} src="/images/image2.jpg" draggable="false"/>
        <img className={pageStyles.image} src="/images/image3.jpg" draggable="false"/>
        <img className={pageStyles.image} src="/images/image4.jpg" draggable="false"/>
        <img className={pageStyles.image} src="/images/image5.jpeg" draggable="false"/>
        <img className={pageStyles.image} src="/images/image6.jpg" draggable="false"/>
      </ScrollContainer>
 
    </div>
      
 
  )
}
