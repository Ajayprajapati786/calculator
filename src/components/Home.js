import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Calculator app</h1>
        <p>if you are a new user then please <Link to="/signup">signup</Link> other wise please <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Home