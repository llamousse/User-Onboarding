import React from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

const UserForm = () => {
    return (
        <div className="user-onboard">
            <h1>Welcome</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="text" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="terms of service" />
                    <span  className="checkmark" />
                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
};

const FormikUserForm = withFormik({

})(UserForm);

export default FormikUserForm;