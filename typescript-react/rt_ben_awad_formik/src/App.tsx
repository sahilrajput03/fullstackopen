import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Formik, Field } from "formik";
//        ^^ this is component from the formik library.
import { TextField, Button } from "@material-ui/core";

function App() {
  return (
    <div>
      <Formik initialValues={{ firstName: "bob", lastName: "kootrapali" }} onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        //make async call
        console.log(data);
        //set subbmitting false
        setSubmitting(false)
      }}>
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field placeholder="first name" name="firstName" type="input" as={TextField} />
            <Field placeholder="last name" name="lastName" type="input" as={TextField} />

            {/* <TextField name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} /> */}
            {/* <TextField name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} /> */}
            <div>

              <Button disabled={isSubmitting} type="submit">submit</Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>

    </div>
  );
}

export default App;
