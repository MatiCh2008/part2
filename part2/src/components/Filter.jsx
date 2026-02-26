const Filter = ({ term, handleTermChange }) => {
    return <div>find countries <input value={term} onChange={handleTermChange}/></div>
  }
  
  export default Filter