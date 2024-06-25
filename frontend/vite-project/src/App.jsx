import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <Customer></Customer>
    </>
  )
}
function Customer(){
  return <div>
    <input type='string' placeholder='Cust_name'></input><br/>
    <input type='number' placeholder='contact'></input><br/>
    <input type='string' placeholder='gender'></input><br/>
    <input type='string' placeholder='veh_no'></input><br/>
    <input type='string' placeholder='type'></input><br/>
    <input type='string' placeholder='model'></input><br/>
    <input type='string' placeholder='color'></input><br/>
    <button>Add Customer</button>
  </div>
}
export default App
