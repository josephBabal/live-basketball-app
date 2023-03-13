import React from 'react'
import styles from '../styles/GameScoreTable.module.css'

export default function GameScoreTable({game}) {
  console.log("==game", game)
  const arr = [1, 2, 3, 4, 'T']
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeader}>
          <th className={styles.tricode}> ABC </th>
          <th className={styles.headerData}> 1 </th>
          <th className={styles.headerData}> 2 </th>
          <th className={styles.headerData}> 3 </th>
          <th className={styles.headerData}> 4 </th>
          <th className={styles.headerData}> T </th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.tableRow}>
          <td className={styles.tricode}> {game.awayTeam.teamTricode} </td>
          {/* <td> {game.awayTeam.periods[0].score} </td> */}
          {arr.map((item, idx) => (
            <td className={styles.rowData} key={item}> {item === "T" ? game.awayTeam.score : game.awayTeam.periods[idx].score} </td>
          ))}
        </tr>
        <tr className={styles.tableRow}>
          <td className={styles.tricode}> {game.homeTeam.teamTricode} </td>
          {/* <td> {game.awayTeam.periods[0].score} </td> */}
          {arr.map((item, idx) => (
            <td className={styles.rowData} key={item} > {item === "T" ? game.homeTeam.score : game.homeTeam.periods[idx].score} </td>
          ))}
        </tr>
      </tbody>
    </table> 
    // <div className={styles.tableContainer}>
    //   <div className={styles.periodRow}>
    //     {arr.map(period => (
    //       <div key={period} className={styles.period} > {period} </div>
    //     ))}
    //   </div>
    //   <div className={styles.teamPeriodScoreContainer}>
    //     <div className={styles.tricode}> {game.awayTeam.teamTricode} </div>
    //     <div className={styles.periodScoreRow}>
    //     {arr.map((period,idx) => (
    //       <div key={period} className={styles.periodScore}> {period === "T" ? game.awayTeam.score : game.awayTeam.periods[idx].score} </div>
    //       ))}
    //     </div>      
    //   </div>

    //   <div className={styles.teamPeriodScoreContainer}>
    //     <div className={styles.tricode}> {game.homeTeam.teamTricode} </div>
    //     <div className={styles.periodScoreRow}>
    //     {arr.map((period,idx) => (
    //     <div key={period} className={styles.periodScore}> {period === "T" ? game.homeTeam.score : game.homeTeam.periods[idx].score} </div>
    //     ))}
    //     </div>      
    //   </div>
    // </div>    
  )}