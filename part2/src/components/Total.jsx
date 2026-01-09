import Part from './Part'

const Total = (props) => {
    console.log(props);
  
      const TotalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
      return (
      <div>
        <p><b>total of {TotalExercises} exercises</b></p>
      </div>  
    )
  }

  export default Total;