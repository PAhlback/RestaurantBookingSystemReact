import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootswatch/dist/lux/bootstrap.min.css';
import './App.css'
import 'react-calendar/dist/Calendar.css'

import Header from './components/Header'
import BookingComponent from './components/BookingComponent'

function App() {

  return (
    <>
      <Header />
      <BookingComponent />
    </>
  )
}

export default App
