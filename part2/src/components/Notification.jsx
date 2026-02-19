const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="alert alert-success">
        {message}
      </div>
    )
  }
  
  export default Notification