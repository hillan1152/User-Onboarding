import React, { useState, useEffect } from "react";
import { withForMik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";


const SignUpForm = ({values, errors, touched, status}) => {
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

export default SignUpForm;
