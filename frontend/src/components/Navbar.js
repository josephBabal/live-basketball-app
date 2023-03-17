import React, {useState} from 'react'
import Link from 'next/link'
import NavStyles from '../styles/NavStyles.module.css'
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

export default function Navbar() {
  const [toggleBtn, setToggleBtn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  function handleToggle() {
    setToggleBtn(prev => !prev)
  }
  function handleOpen() {
    setIsOpen(prev => !prev)
  }
  console.log("==toggle", toggleBtn)

  return (
    <header>
      <div className={NavStyles.nav}>
        <div className={NavStyles.logo}> logo </div>
        <ul className={NavStyles.links}>
          <li> <Link href="/" className={NavStyles.link}> Home </Link> </li>
          <li> <Link href="/Game" className={NavStyles.link}> Games </Link> </li>
        </ul>
        <div className={NavStyles.toggleBtn}>
          {isOpen ? <VscChromeClose className={NavStyles.dropdownIcon} onClick={() => (handleOpen(), handleToggle())} /> : <SlMenu  onClick={() => (handleOpen(), handleToggle())} />}
        </div>
      </div>

      {/* <div className={toggleBtn ? (`${NavStyles.dropdownMenu} ${NavStyles.open}`) : `${NavStyles.open}` }  onClick={handleToggle} > */}
    
      <div className={toggleBtn ? (`${NavStyles.dropdownMenu} ${NavStyles.open}`) : `${NavStyles.dropdownMenu}` } >
        <li> <Link href="/" className={NavStyles.link}> Home </Link> </li>
        <li> <Link href="/Game" className={NavStyles.link}> Games </Link> </li>
      </div>
    </header>
  )
}