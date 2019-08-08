import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, List, Header } from 'semantic-ui-react'
import { Form as FormUser, Field, withFormik } from 'formik';
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
            <h1>Get Started</h1>
            <FormUser>
                <Form>
                    <Form.Field>
                        <Field type="text" name="name" placeholder="Name" />
                        {touched.name && errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </Form.Field>

                    <Form.Field>
                        <Field type="text" name="email" placeholder="Email" />
                        {touched.email && errors.email && (
                            <p className="error">{errors.email}</p>
                        )}
                    </Form.Field>
                    
                    <Form.Field>
                        <Field type="password" name="password" placeholder="Password" />
                        {touched.password && errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                    </Form.Field>

                    <label className="checkbox-container">
                        <Field type="checkbox" name="tos" checked={values.tos} />
                        <span>Terms of Service</span>
                        {touched.tos && errors.tos && (
                        <p className="error">{errors.tos}</p>
                        )} 
                    </label> 
        
                    <br />
                    <Button type="submit" disabled={isSubmitting}>Sign Up</Button>
                </Form>
            </FormUser>

            <Header as="h1">Sign Up List:</Header>
            <List horizontal link>
                {user.map(users => (
                    <List.Item as='a'>
                        <p key={users.id}>{users.name}</p>
                    </List.Item>
                ))}
            </List>

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