import React, {useState, useEffect} from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import api from "../../services/api"

import { Container, PersonList, Scroll } from './styles';
import { toast } from 'react-toastify';

const newPerson = { id: "", name: "", email: "", gender: "MASCULINO", dateOfBirth: "", naturalness: "", nationality: "", cpf: ""}

function Person() {
  const [personList, setPersonList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [idPersonEditing, setIdPersonEditing] = useState("");
  
  const person = newPerson

  function resetForm(){
    document.getElementById("add-person").reset();
    setEditing(false)
  }

  function deletPerson(){
    api.delete(`person/v1/${idPersonEditing}`).then(
      function(sucess){
        toast.success("Success removing person")
        resetForm()
        getAllPerson()
      }
    ).catch(
      function(error){
        toast.error(`Error removing person ${error.response.data.message}`);
      }
    )
  }

  function setPersonToEdit(person){
    document.getElementById("name").value = person.name
    document.getElementById("email").value = person.email
    document.getElementById("gender").value = person.gender
    document.getElementById("dateOfBirth").value = person.dateOfBirth
    document.getElementById("naturalness").value = person.naturalness
    document.getElementById("nationality").value = person.nationality
    document.getElementById("cpf").value = person.cpf
    setEditing(true)
    setIdPersonEditing(person.id)
  }

  async function handleSubmit(data) {
    if (editing){
      await api.put(`person/v1/${idPersonEditing}`, data).then(
        function(sucess){
          toast.success("Success in editing person")
          resetForm()
          getAllPerson()
        }
      ).catch(
        function(error){
          toast.error(`Error editing person, ${error.response.data.message}`);
        }
      )
    }else{
      await api.post('person/v1', data).then(
        function(sucess){
          toast.success("Success in adding person")
          resetForm()
          getAllPerson()
        }
      ).catch(
        function(error){
          toast.error(`Error adding person, ${error.response.data.message}`);
        }
      )
    }
  }

  async function getAllPerson(){
    await api.get('person/v1').then(
      function(sucess){
        setPersonList(sucess.data)
      }
    ).catch(
      function(error){
      }
    )
  }

  useEffect(() => {
    getAllPerson();
  }, []);

  return (
    <Container>
      <h1 align= "center">Person</h1>
      <Form initialData={person} onSubmit={handleSubmit} id="add-person">
        <Input id="name" name="name" maxLength="255" placeholder="Name" />
        <Input id="email" name="email" type="email" maxLength="100" placeholder="E-mail" />
        <Select
          id="gender" name="gender"
          options={[
            { id: "MALE", title: "Male" },
            { id: "FEMALE", title: "Female" }
          ]}
        />
        <Input id="dateOfBirth" name="dateOfBirth" type="date" />
        <Input id="naturalness" maxLength="255" name="naturalness"  placeholder="Naturalness" />
        <Input id="nationality" maxLength="255" name="nationality"  placeholder="Nationality" />
        <Input id="cpf" maxLength="11" name="cpf" type="cpf" placeholder="CPF only numbers" />
        <button type="submit">{editing ? "Update" : "Add"}</button>
      </Form>
      
      {editing ? (<button type="button" onClick={ () => deletPerson()}>Remove</button>) : ""}
      
      {editing ? (<button type="button" onClick={ () => resetForm()}>Cancel</button>) : ""}

      <PersonList>
        <Scroll>
          {personList.map((person) => (
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
                <button onClick={() => setPersonToEdit(person)}>Edit</button>
              </li>
            ))
          }
        </Scroll>
      </PersonList>
    </Container>
  );
}

export default Person;
