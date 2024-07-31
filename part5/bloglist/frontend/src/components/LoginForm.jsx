import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

const LoginForm = forwardRef(({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    handleSubmit({ username, password })

    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} data-testid='loginForm'>
        <div>
          username
          <input
            data-testid='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
})
LoginForm.displayName = 'LoginForm'
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm