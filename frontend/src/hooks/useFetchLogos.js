import React, { useState, useEffect } from 'react'
import teamLogos from '../data/teamLogos'

export default function useFetchLogos(awayTricode, homeTricode) {
  const [awayTeamLogo, setAwayLogo] = useState("")
  const [homeTeamLogo, setHomeLogo] = useState("")

  useEffect(() => {
    setAwayLogo(teamLogos.find(logo => (
      awayTricode.toLowerCase()  === logo.name.toLowerCase() ?? logo
    )))
    setHomeLogo(teamLogos.find(logo => (
      homeTricode.toLowerCase()  === logo.name.toLowerCase() ?? logo
    )))
  }, [])
  return [ awayTeamLogo, homeTeamLogo]
}
