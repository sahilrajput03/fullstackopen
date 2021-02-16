import React, { useEffect, useState } from "react";

const EffectDemo1 = () => {
  //State
  const [fullName, setFullName] = useState({
    name: "name",
    familyName: "family",
  });
  const [title, setTitle] = useState("useEffect() in Hooks");

  //useEffect
  useEffect(() => {
    console.log("useEffect has been called!");
    setFullName({ name: "Marco", familyName: "Shaw" });
  }, []);

  return (
    <div>
      <h1>Title: {title}</h1>
      <h3>Name: {fullName.name}</h3>
      <h3>Family Name: {fullName.familyName}</h3>
    </div>
  );
};
export default EffectDemo1;
