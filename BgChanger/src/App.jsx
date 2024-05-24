import { useState } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState("red")

  return (
    <>
      <div className='w-screen h-screen' style={{backgroundColor : bgColor}} ></div>
      <div className='absolute w-full bottom-2 flex gap-3 items-center justify-center'>
      <button className='bg-black text-white p-4 rounded-lg' onClick={() => setBgColor("blue")}>Change to Blue</button>
      <button className='bg-black text-white p-4 rounded-lg' onClick={() => setBgColor("green")}>Change to Green</button>
      <button className='bg-black text-white p-4 rounded-lg' onClick={() => setBgColor("orange")}>Change to orange</button>
      <button className='bg-black text-white p-4 rounded-lg' onClick={() => setBgColor("brown")}>Change to brown</button>
      <button className='bg-black text-white p-4 rounded-lg' onClick={() => setBgColor("pink")}>Change to pink</button>
      <button className='bg-black text-white p-4 rounded-lg' onClick={() => setBgColor("gray")}>Change to gray</button>

      </div>
    </>
  )
}

export default App
