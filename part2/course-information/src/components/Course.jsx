const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

const Part = (props) => {
    return (
        <p>
        {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
        {props.parts.map(part => (
            <Part key={part.id} part={part} />
        ))}
        </div>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => {
        return sum + part.exercises 
    }, 0)
    return (
        <p style={{'font-weight': 'bold'}}>Number of exercises {total}</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course