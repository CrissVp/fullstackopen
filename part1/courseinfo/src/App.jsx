const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts: [part1, part2, part3] }) => {
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
};

const Total = ({ parts }) => {
  const [part1, part2, part3] = parts;
  const total = part1.exercises + part2.exercises + part3.exercises;

  return (
    <p>Number of exercises {total}</p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
