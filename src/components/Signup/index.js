import React, {useState} from 'react'

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = e => {
    const {name, value} = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleSignup = async e => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const result = await response.json()
    console.log(result)
  }

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signup</button>
    </form>
  )
}

export default Signup
