import React from 'react'

export default function useFetchDate() {
  const dayOfWeek = new Date().getDay()
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const fullDate = `${daysOfWeek[dayOfWeek]} ${new Date().getMonth()}/${new Date().getUTCDate()}`
  return [ fullDate ]
}
