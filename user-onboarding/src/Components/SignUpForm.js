import React, { useState, useEffect } from "react";
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";


const SignUpForm = ({values, errors, touched, status}) => {
    
    const [people, setPeople] = useState([]);
    useEffect(
        () => {
          status && setPeople(people => [...people, status]);
        },
        [status]
      );
    return (
        <div className = "signup-form">
            <Form>
                <Field
                    type = "text"
                    name = "name"
                    placeholder = "Name"
                />
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field
                    type = "text"
                    name = "email"
                    placeholder = "Email"
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field
                    type = "text"
                    name = "password"
                    placeholder = "Password"
                />
                <label>
                    Terms of Service
                    <Field
                        type = "checkbox"
                        name = "termsOfService"
                        checked = {values.termsOfService}
                    />
                </label>
                <button className = "submit" type="submit">Sign Up!</button>
            </Form>
            {people.map(person => (
                <ul key = {person.id}>
                    <li>Name: {person.name}</li>
                    <li>Email: {person.email}</li>
                    <li>Password: {person.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikSignUpForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(console.log("Add Your Name")),
        email: Yup.string().email().required("Let us know where we can contact you.")
    }),
    handleSubmit(values, { setStatus }) {
        axios.post("https://reqres.in/api/users", values)
        .then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(err => console.log("ERROR", err.res))
    }
})(SignUpForm);
export default FormikSignUpForm;
