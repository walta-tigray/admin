import React from 'react'
import Cards from './Cards'
import Charts from './Charts'
import Circle from './Circle'
import Transaction from './Transaction'

function Dashboard() {
  return (
    <div style={{ padding: 20, width: "100%" }}>
      <Cards />
      <br />
      {/* <Charts /> */}
      <br />
      {/* <Circle />
        <br />
        <Transaction /> */}
    </div>
  )
}

export default Dashboard