import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ errors, touched, values, status, isSubmitting }) => {
    const [user, setUser] = useState([]);
    // console.log(user);

    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);

    return (
        <div className="user-onboard">
            <h1>Welcome!</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <Field type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}

                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="tos" checked={values.tos} />
                    {touched.tos && errors.tos && (
                    <p className="error">{errors.tos}</p>
                    )}
                    <span  className="checkmark" />
                </label>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>

            {user.map(users => (
                <p key={users.id}>{users.name}</p>
            ))}

        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            tos: tos || false,
            name: name || '',
            email: email || '',
            password: password || ''
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Email not valid')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be 8 characters or longer')
            .required('Password is required'),
        tos: Yup.boolean()
            .oneOf([true], 'Must Accept Terms of Service')
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
        // console.log('form submitted', values);
        if (values.email === "vyue013@gmail.com") {
            setErrors({ email: "That email is already taken" });
            setSubmitting(false);
        } 
        else {
            axios.post('https://reqres.in/api/users', values)
            .then(res => {
                // console.log(res)
                setStatus(res.data);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err.response);
                setSubmitting(false);
            });
        }

    }

})(UserForm);

export default FormikUserForm;