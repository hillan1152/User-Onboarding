import React, { useState, useEffect } from "react";
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";


const SignUpForm = ({values, errors, touched, status}) => {
    
    const [people, setPeople] = useState([]);
    useEffect( () => {
        if(status) {
            setPeople([...people, status])
        }
    }, [status])
    return (
        <div className = "signup-form">
            <Form>
                <Field
                    type = "text"
                    name = "name"
                    placeholder = "Name"
                />
                <Field
                    type = "text"
                    name = "email"
                    placeholder = "Email"
                />
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
                <button className = "submit">Sign Up!</button>
            </Form>
        </div>
    )
}

const FormikSignUpForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false
        };
    },
    validationschema: Yup.object().shape({
        name: Yup.string().required("Add Your Name"),
        email: Yup.string().required("Let us know where we can contact you.")
    }),
    handleSubmit(values, { setStatus }) {
        axios.post("https://reqres.in/api/users", values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log("ERROR", err.res))
    }
})(SignUpForm);
console.log("This is the Formik", FormikSignUpForm);
export default FormikSignUpForm;
