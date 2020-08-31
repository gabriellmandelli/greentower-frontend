import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';
import { signOut } from '../../store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <h1 align= "center">My profile</h1>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" maxLength="255" placeholder="Name" />
        <Input name="email" maxLength="255" type="email" placeholder="E-mail andress" />

        <hr />

        <Input name="oldPassword" maxLength="50" type="password" placeholder="Last password" />
        <Input name="password" maxLength="50" type="password" placeholder="New password" />
        <Input name="confirmPassword" maxLength="50" type="password" placeholder="Confirm your password" />

        <button type="submit">Update profile</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Logout
      </button>
    </Container>
  );
}

export default Profile;
