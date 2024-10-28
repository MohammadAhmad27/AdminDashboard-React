import React from 'react'
import "./home.scss"
import Sidebar from '../../components/sidebar/Sidebar'

export default function Home() {
  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        container
      </div>
    </div>
  )
}
