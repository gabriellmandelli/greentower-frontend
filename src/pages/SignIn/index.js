import * as Yup from 'yup';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '../../store/modules/auth/actions';

// import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img
        src="https://www.softplan.com.br/wp-content/themes/softplan-2019/imagens/logo-softplan.svg"
        alt="SoftPlayer"
      />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">{loading ? 'Loading...' : 'Sign in'}</button>
        <Link to="/register">Create an account.</Link>
      </Form>
    </>
  );
}

export default SignIn;
