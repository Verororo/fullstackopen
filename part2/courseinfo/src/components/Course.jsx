const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (sum, part) => sum + part.exercises, 0
  )

  return (
    <p>Total number of exercises {sum}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
