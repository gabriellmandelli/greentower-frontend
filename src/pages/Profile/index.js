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
      <h1 align= "center">Meu Perfil</h1>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" maxLength="255" placeholder="Nome completo" />
        <Input name="email" maxLength="255" type="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input name="oldPassword" maxLength="50" type="password" placeholder="Sua senha atual" />
        <Input name="password" maxLength="50" type="password" placeholder="Nova senha" />
        <Input name="confirmPassword" maxLength="50" type="password" placeholder="Confirmação de senha" />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do Softplay
      </button>
    </Container>
  );
}

export default Profile;
