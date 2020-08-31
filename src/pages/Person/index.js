import React, {useState, useEffect} from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import api from "../../services/api"

import { Container, PersonList, Scroll } from './styles';
import { toast } from 'react-toastify';

const newPerson = { id: "", nome: "", email: "", sexo: "MASCULINO", dataNascimento: "", naturalidade: "", nacionalidade: "", cpf: ""}

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
    api.delete(`pessoa/v1/${idPersonEditing}`).then(
      function(sucess){
        toast.success("Sucesso ao remover pessoa")
        resetForm()
        getAllPerson()
      }
    ).catch(
      function(error){
        toast.error(`Erro ao remover pessoa ${error.response.data.message}`);
      }
    )
  }

  function setPersonToEdit(person){
    document.getElementById("nome").value = person.nome
    document.getElementById("email").value = person.email
    document.getElementById("sexo").value = person.sexo
    document.getElementById("dataNascimento").value = person.dataNascimento
    document.getElementById("naturalidade").value = person.naturalidade
    document.getElementById("nacionalidade").value = person.nacionalidade
    document.getElementById("cpf").value = person.cpf
    setEditing(true)
    setIdPersonEditing(person.id)
  }

  async function handleSubmit(data) {
    if (editing){
      await api.put(`pessoa/v1/${idPersonEditing}`, data).then(
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
      await api.post('pessoa/v1', data).then(
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
    await api.get('pessoa/v1').then(
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
        <Input id="nome" name="nome" maxLength="255" placeholder="Name" />
        <Input id="email" name="email" type="email" maxLength="100" placeholder="E-mail" />
        <Select
          id="sexo" name="sexo"
          options={[
            { id: "MASCULINO", title: "Male" },
            { id: "FEMININO", title: "Female" }
          ]}
        />
        <Input id="dataNascimento" name="dataNascimento" type="date" />
        <Input id="naturalidade" maxLength="255" name="naturalidade"  placeholder="Naturalness" />
        <Input id="nacionalidade" maxLength="255" name="nacionalidade"  placeholder="Nationality" />
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
                    <p>Name: {person.nome}</p>
                    <p>CPF: {person.cpf}</p>
                    <p>E-mail: {person.email}</p>
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
