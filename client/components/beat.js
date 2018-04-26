/*es-lint complexity */
import React from 'react'

const Beat = (props) => {
  const {grid} = props
  var beat = []
  if (grid[0][0]) beat.push(22)
  if (grid[0][1]) beat.push(201)
  if (grid[0][2]) beat.push(144)
  if (grid[0][3]) beat.push(122)
  if (grid[1][0]) beat.push(44)
  if (grid[1][1]) beat.push(58)
  if (grid[1][2]) beat.push(36)
  if (grid[1][3]) beat.push(72)
  if (grid[2][0]) beat.push(61)
  if (grid[2][1]) beat.push(93)
  if (grid[2][2]) beat.push(101)
  if (grid[2][3]) beat.push(12)
  if (grid[3][0]) beat.push(29)
  if (grid[3][1]) beat.push(220)
  if (grid[3][2]) beat.push(166)
  if (grid[3][3]) beat.push(188)
  console.log('hi',beat)
  return (
    <div />
  )
}

export default Beat;
