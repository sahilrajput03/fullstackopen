import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string
}
//#region 
// interface CourseType {
//   name: string,
//   exerciseCount: number
// }
//#endregion

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
// TypeScript documentation recommends using interfaces in most cases.@ https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases
interface CoursePartBase{
  love?: string
}
interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}
interface CoursePartOne extends CoursePartBaseWithDescription {
  name: "Fundamentals";
  // description: string;
}
interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}
interface CoursePartThree extends CoursePartBaseWithDescription {
  name: "Deeper type usage";
  // description: string;
  exerciseSubmissionLink: string;
}
interface CoursePartSpecial extends CoursePartBaseWithDescription {
  name: "Love is in the air.";
  power: string;
}
type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartSpecial;
// TYPE UNION!!..
interface CoursePartsProps {
  courseParts: Array<CoursePart>
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const CourseFeatures: React.FC<CoursePartsProps> = (props) => {
  return (<>
    <h2>Course Parts Features:- </h2>
    {/* {props.courseParts.map((course, index) => (<p key={index}>Part {index}: {Object.keys(course).join(', ')}.</p>))} */}
    {props.courseParts.map((course, index) => {
      switch (course.name) {
        case "Fundamentals":
          // return <p key={index}>Part {index}: {Object.keys(course).join(', ')}.</p>;
          return <p key={index}>Part {index}: {[course.name && "Name", course.exerciseCount && "ExerciseCount", course.description && "Description"].join(', ')}.</p>;
        case "Using props to pass data":
          // return <p key={index}>Part {index}: {Object.keys(course).join(', ')}.</p>;
          return <p key={index}>Part {index}: {[course.name && "Name", course.exerciseCount && "ExerciseCount", course.groupProjectCount && "GroupProjectCount"].join(", ")}.</p>;
        case "Deeper type usage":
          // return <p key={index}>Part {index}: {Object.keys(course).join(', ')}.</p>;
          return <p key={index}>Part {index}: {[course.name && "Name", course.exerciseCount && "ExerciseCount", course.description && "Description", course.exerciseSubmissionLink && "ExerciseSubmissionLink"].join(", ")}.</p>;
        case "Love is in the air.":
          return <p key={index}>Part {index}: {[course.name && "Name", course.exerciseCount && "ExerciseCount", course.description && "Description"].join(", ")}.</p>;

        default:
          return assertNever(course);
          // return <p key={index}>Not Appropriate features. Also: The exception must be LOVE COURSE PART♥</p>;
      }
    })}
  </>);
};

const Header: React.FC<HeaderProps> = (props) => (<h1>{props.courseName}</h1>);
const Content: React.FC<CoursePartsProps> = (props) => {
  const {courseParts} = props;
  return (<div>
    <p>
      {courseParts[0].name} {courseParts[0].exerciseCount}
    </p>
    <p>
      {courseParts[1].name} {courseParts[1].exerciseCount}
    </p>
    <p>
      {courseParts[2].name} {courseParts[2].exerciseCount}
    </p>
    <br></br>
    <CourseFeatures courseParts={courseParts}></CourseFeatures>
  </div>);
};


const ExerciseCount: React.FC<CoursePartsProps> = (props) => {
  return (<>
    <br></br>
    <h2>Exercise Counts</h2>
      Total Exercises- {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </>);
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Love is in the air.",
      exerciseCount: 40,
      description: "This is meaningless though.",
      power: "Flying capacity!!"
    }
  ];

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <ExerciseCount courseParts={courseParts} ></ExerciseCount>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));


    // #region This works too.
    // #endregion

      //#region 
  // interface CoursePartsProps {
  //   courseParts: {
  //     [index: number]: {
  //       name: string,
  //       exerciseCount: number
  //     };
  //   }
  // }
  //#endregion
