import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { DataGrid } from '@material-ui/data-grid';
import api from '../../services/api';

import { Container } from './styles';

const newPerson = {
  id: '',
  name: '',
  email: '',
  gender: 'MALE',
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
    // eslint-disable-next-line no-console
    console.log(personToEdit);
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
          if (error.response.data.errors) {
            const errorList = error.response.data.errors;
            errorList.map(errorItem =>
              toast.error(`${errorItem.field} : ${errorItem.message}`)
            );
          } else {
            toast.error(`Error editing person, ${error.response.data.message}`);
          }
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
          if (error.response.data.errors) {
            const errorList = error.response.data.errors;
            errorList.map(errorItem =>
              toast.error(`${errorItem.field} : ${errorItem.message}`)
            );
          } else {
            toast.error(`Error adding person, ${error.response.data.message}`);
          }
        });
    }
  }

  useEffect(() => {
    getAllPerson();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 255 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'naturalness', headerName: 'Naturalness', width: 120 },
    { field: 'nationality', headerName: 'Nationality', width: 105 },
    { field: 'cpf', headerName: 'Cpf', width: 130 },
    {
      field: '',
      headerName: 'Actions',
      disableClickEventBubbling: true,
      renderCell: params => {
        return (
          <button type="button" onClick={() => setPersonToEdit(params.data)}>
            Edit
          </button>
        );
      },
    },
  ];

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
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={personList} columns={columns} />
      </div>
    </Container>
  );
}

export default Person;
