import React, { useState } from "react";
import { filterChange } from "../reducers/filterReducer";
import {connect} from 'react-redux'

const Filter = (props) => {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    props.filterChange(event.target.value)
  };
  return (
    <div>
      Search anecdotes:
      <input value={searchText} onChange={handleSearchChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterChange,
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)