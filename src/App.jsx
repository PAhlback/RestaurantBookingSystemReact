import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootswatch/dist/lux/bootstrap.min.css';
import './App.css'
import 'react-calendar/dist/Calendar.css'

import Header from './components/Header'
import BookingComponent from './components/BookingComponent'
import ReservationComponent from './components/ReservationComponent'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<BookingComponent />} />
        <Route path="/reservation" element={<ReservationComponent />} /> 
      </Routes>
    </Router>
  )
}

export default App
