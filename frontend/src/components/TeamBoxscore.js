import React from 'react'
import styles from '../styles/Boxscore.module.css'

export default function TeamBoxscore({starters, bench}) {
  return (
    <div className={styles.teamBoxscoreContainer}>
      <table className={styles.boxscoreTable}>
        <thead>
          <tr className={styles.boxscoreCategory}>
            <th className={styles.starterTxt}> Starters </th>
            <th> min </th>
            <th> pts </th>
            <th> fg </th>
            <th> 3pt </th>
            <th> ft </th>
            <th> +/- </th>
            <th> oreb </th>
            <th> dreb </th>
            <th> reb </th>
            <th > ast </th>
            <th> stl </th>
            <th> blk </th>
            <th> to </th>
            <th> pf </th>
          </tr>
        </thead>
        <tbody  className={styles.tableBody}>
        {starters.map(player => {
          // finding mintues in string 'PT##M'
          const regex = /\d+/;
          const string = player.statistics.minutesCalculated
          const minutes = string.match(regex)
          return (
            <tr className={styles.playerStats} key={player.nameI}>
              <td className={styles.playerName}> {player.nameI}</td>
              <td> {minutes} </td>
              <td> {player.statistics.points}</td>
              <td> {player.statistics.fieldGoalsMade} - {player.statistics.fieldGoalsAttempted}</td>
              <td> {player.statistics.threePointersMade} - {player.statistics.threePointersAttempted}</td>
              <td> {player.statistics.freeThrowsMade} - {player.statistics.freeThrowsAttempted}</td>
              <td> {player.statistics.plusMinusPoints} </td>
              <td> {player.statistics.reboundsOffensive} </td>
              <td> {player.statistics.reboundsDefensive} </td>
              <td> {player.statistics.reboundsTotal} </td>
              <td> {player.statistics.assists} </td>
              <td> {player.statistics.steals} </td>
              <td> {player.statistics.blocks} </td>
              <td> {player.statistics.turnovers} </td>
              <td> {player.statistics.foulsPersonal} </td>
            </tr>
          )
        })}
        </tbody>
        <thead>
          <tr className={styles.boxscoreCategory} id={styles.benchText}>
            <th className={styles.starterTxt}> Bench </th>
            <th> min </th>
            <th> pts </th>
            <th> fg </th>
            <th> 3pt </th>
            <th> ft </th>
            <th> +/- </th>
            <th> oreb </th>
            <th> dreb </th>
            <th> reb </th>
            <th > ast </th>
            <th> stl </th>
            <th> blk </th>
            <th> to </th>
            <th> pf </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
        {bench.map(player => {
          // finding mintues in string 'PT##M'
          const regex = /\d+/;
          const string = player.statistics.minutesCalculated
          const minutes = string.match(regex)
          console.log("minutes", minutes)
          console.log("==parse", parseInt(minutes))
          if (parseInt(minutes) == 0) {
            console.log("==parse", parseInt(minutes))
            return(
              <tr className={styles.playerStats} key={player.nameI}>
                <td className={styles.playerName}> {player.nameI} </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
              </tr>
            )
          }
          return (
            <tr className={styles.playerStats} key={player.nameI}>
              <td className={styles.playerName}> {player.nameI}</td>
              <td> {minutes} </td>
              <td> {player.statistics.points}</td>
              <td> {player.statistics.fieldGoalsMade} - {player.statistics.fieldGoalsAttempted}</td>
              <td> {player.statistics.threePointersMade} - {player.statistics.threePointersAttempted}</td>
              <td> {player.statistics.freeThrowsMade} - {player.statistics.freeThrowsAttempted}</td>
              <td> {player.statistics.plusMinusPoints} </td>
              <td> {player.statistics.reboundsOffensive} </td>
              <td> {player.statistics.reboundsDefensive} </td>
              <td> {player.statistics.reboundsTotal} </td>
              <td> {player.statistics.assists} </td>
              <td> {player.statistics.steals} </td>
              <td> {player.statistics.blocks} </td>
              <td> {player.statistics.turnovers} </td>
              <td> {player.statistics.foulsPersonal} </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}
