import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div> 
      <div className='flex justify-between'>
        <div>
          <input placeholder='Search doctor' className='w-400'/>
        </div>
        <button className='outlined-btn my-1 '
        onClick={() => navigate('/apply-doctor')}>Apply doctor</button>
      
      </div>
    </div>
  )
}

export default Home