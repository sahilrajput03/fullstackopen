import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    courseName: string
  }
  interface CourseType {
    name: string,
    exerciseCount: number
  }
  interface CoursePartsProps {
    courseParts: Array<CourseType>
  }


  const Header: React.FC<HeaderProps> = (props) => (<h1>{props.courseName}</h1>);
  const Content: React.FC<CoursePartsProps> = (props) => {
    return (<>{props.courseParts.map((t, i) => (<p key={i}>${t.name} ${t.exerciseCount}</p>))}</>);

  };
  const ExerciseCount: React.FC<CoursePartsProps> = (props) => {
    return (<>{props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</>);
  };

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <ExerciseCount courseParts={courseParts} ></ExerciseCount>

      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));


    //#region This works too.
    // const courseParts = props.courseParts;
    // return (<div>
    //   <p>
    //     {courseParts[0].name} {courseParts[0].exerciseCount}
    //   </p>
    //   <p>
    //     {courseParts[1].name} {courseParts[1].exerciseCount}
    //   </p>
    //   <p>
    //     {courseParts[2].name} {courseParts[2].exerciseCount}
    //   </p>
    // </div>);
    //#endregion

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
