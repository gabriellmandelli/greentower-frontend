import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container, PersonList, Scroll } from './styles';

const newPerson = {
  id: '',
  name: '',
  email: '',
  gender: 'MASCULINO',
  dateOfBirth: '',
  naturalness: '',
  nationality: '',
  cpf: '',
};

function Person() {
  const [personList, setPersonList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [idPersonEditing, setIdPersonEditing] = useState('');

  function resetForm() {
    document.getElementById('add-person').reset();
    setEditing(false);
  }

  async function getAllPerson() {
    await api
      .get('person/v1')
      .then(sucess => {
        setPersonList(sucess.data);
      })
      .catch(error => {
        toast.error(
          `Error getting person list, ${error.response.data.message}`
        );
      });
  }

  function deletPerson() {
    api
      .delete(`person/v1/${idPersonEditing}`)
      .then(() => {
        toast.success('Success removing person');
        resetForm();
        getAllPerson();
      })
      .catch(error => {
        toast.error(`Error removing person ${error.response.data.message}`);
      });
  }

  function setPersonToEdit(personToEdit) {
    document.getElementById('name').value = personToEdit.name;
    document.getElementById('email').value = personToEdit.email;
    document.getElementById('gender').value = personToEdit.gender;
    document.getElementById('dateOfBirth').value = personToEdit.dateOfBirth;
    document.getElementById('naturalness').value = personToEdit.naturalness;
    document.getElementById('nationality').value = personToEdit.nationality;
    document.getElementById('cpf').value = personToEdit.cpf;
    setEditing(true);
    setIdPersonEditing(personToEdit.id);
  }

  async function handleSubmit(data) {
    if (editing) {
      await api
        .put(`person/v1/${idPersonEditing}`, data)
        .then(() => {
          toast.success('Success in editing person');
          resetForm();
          getAllPerson();
        })
        .catch(error => {
          toast.error(`Error editing person, ${error.response.data.message}`);
        });
    } else {
      await api
        .post('person/v1', data)
        .then(() => {
          toast.success('Success in adding person');
          resetForm();
          getAllPerson();
        })
        .catch(error => {
          toast.error(`Error adding person, ${error.response.data.message}`);
        });
    }
  }

  useEffect(() => {
    getAllPerson();
  }, []);

  return (
    <Container>
      <h1 align="center">Person</h1>
      <Form initialData={newPerson} onSubmit={handleSubmit} id="add-person">
        <Input id="name" name="name" maxLength="255" placeholder="Name" />
        <Input
          id="email"
          name="email"
          type="email"
          maxLength="100"
          placeholder="E-mail"
        />
        <Select
          id="gender"
          name="gender"
          options={[
            { id: 'MALE', title: 'Male' },
            { id: 'FEMALE', title: 'Female' },
          ]}
        />
        <Input id="dateOfBirth" name="dateOfBirth" type="date" />
        <Input
          id="naturalness"
          maxLength="255"
          name="naturalness"
          placeholder="Naturalness"
        />
        <Input
          id="nationality"
          maxLength="255"
          name="nationality"
          placeholder="Nationality"
        />
        <Input
          id="cpf"
          maxLength="11"
          name="cpf"
          type="cpf"
          placeholder="CPF only numbers"
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </Form>

      {editing ? (
        <button type="button" onClick={() => deletPerson()}>
          Remove
        </button>
      ) : (
        ''
      )}

      {editing ? (
        <button type="button" onClick={() => resetForm()}>
          Cancel
        </button>
      ) : (
        ''
      )}

      <PersonList>
        <Scroll>
          {personList.map(person => (
            <li key={String(person.id)}>
              <div>
                <strong>
                  <p>Name: {person.name}</p>
                  <p>CPF: {person.cpf}</p>
                  <p>E-mail: {person.email}</p>
                  <p>Naturalness: {person.naturalness}</p>
                  <p>Nationality: {person.nationality}</p>
                </strong>
              </div>
              <button type="button" onClick={() => setPersonToEdit(person)}>
                Edit
              </button>
            </li>
          ))}
        </Scroll>
      </PersonList>
    </Container>
  );
}

export default Person;
