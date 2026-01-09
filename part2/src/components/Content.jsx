import Part from './Part'

const Content = (props) => {
    console.log(props);
      return (
      <div>
        {props.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}   
      </div>  
    )
  }

  export default Content;