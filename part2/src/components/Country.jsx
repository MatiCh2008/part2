const Country = ({ country, handleShow }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={handleShow}>show</button>
    </div>
  )
}

export default Country