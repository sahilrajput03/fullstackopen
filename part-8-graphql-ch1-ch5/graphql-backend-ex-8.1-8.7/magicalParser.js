const magicalParser = (message, info) => {
  // const prototypeForHelp = info.fieldNodes[0].selectionSet.selections[0].name.value; //working amazing..
  const [arrayFields] = info.fieldNodes.map((t) =>
    t.selectionSet.selections.map((m) => {
      if (Boolean(m.selectionSet)) {
        // console.log(
        //   "TOP CHILD-->",
        //   m.name.value,
        //   "-->",
        //   m.selectionSet.selections.map((k) => k.name.value)
        // );
        return {
          [m.name.value]: m.selectionSet.selections.map((k) => k.name.value),
        };
      } else {
        // console.log("TOP CHILD-->", m.name.value);
        return m.name.value;
      }
    })
  ); //working amazing..
  console.log("\n", message, "==>", arrayFields, "\n");
};
module.exports = magicalParser;
