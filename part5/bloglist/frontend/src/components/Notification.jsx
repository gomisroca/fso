function Notification({ message, type }) {
  if (message === null) {
    return null
  }
  if (type === 'success'){
    return (
      <div className='success' data-testid='success'>
        {message}
      </div>
    )
  }
  if (type === 'error'){
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

export default Notification