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
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:softplay")).auth).token
    api.defaults.headers.Authorization = `Bearer ${token}`
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
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:softplay")).auth).token
    api.defaults.headers.Authorization = `Bearer ${token}`
    if (editing){
      await api.put(`pessoa/v1/${idPersonEditing}`, data).then(
        function(sucess){
          toast.success("Sucesso ao editar pessoa")
          resetForm()
          getAllPerson()
        }
      ).catch(
        function(error){
          toast.error(`Erro ao editar pessoa, ${error.response.data.message}`);
        }
      )
    }else{
      await api.post('pessoa/v1', data).then(
        function(sucess){
          toast.success("Sucesso ao adicionar pessoa")
          resetForm()
          getAllPerson()
        }
      ).catch(
        function(error){
          toast.error(`Erro ao adicionar pessoa, ${error.response.data.message}`);
        }
      )
    }
  }

  async function getAllPerson(){
    const token = JSON.parse(JSON.parse(localStorage.getItem("persist:softplay")).auth).token
    api.defaults.headers.Authorization = `Bearer ${token}`
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
      <h1 align= "center">Cadastro de Pessoas</h1>
      <Form initialData={person} onSubmit={handleSubmit} id="add-person">
        <Input id="nome" name="nome" maxLength="255" placeholder="Nome completo" />
        <Input id="email" name="email" type="email" maxLength="100" placeholder="Endereço de e-mail" />
        <Select
          id="sexo" name="sexo"
          options={[
            { id: "MASCULINO", title: "Masculino" },
            { id: "FEMININO", title: "Feminino" }
          ]}
        />
        <Input id="dataNascimento" name="dataNascimento" type="date" />
        <Input id="naturalidade" maxLength="255" name="naturalidade"  placeholder="Naturalidade" />
        <Input id="nacionalidade" maxLength="255" name="nacionalidade"  placeholder="Nacionalidade" />
        <Input id="cpf" maxLength="11" name="cpf" type="cpf" placeholder="Cpf somente números" />
        <button type="submit">{editing ? "Atualizar" : "Adicionar"}</button>
      </Form>
      
      {editing ? (<button type="button" onClick={ () => deletPerson()}>Excluir</button>) : ""}
      
      {editing ? (<button type="button" onClick={ () => resetForm()}>Cancelar</button>) : ""}

      <PersonList>
        <Scroll>
          {personList.map((person) => (
            <li key={String(person.id)}>
                <div>
                  <strong>
                    <p>Nome: {person.nome}</p>
                    <p>CPF: {person.cpf}</p>
                    <p>Email: {person.email}</p>
                  </strong>
                  
                </div>
                <button onClick={() => setPersonToEdit(person)}>Editar</button>
              </li>
            ))
          }
        </Scroll>
      </PersonList>
    </Container>
  );
}

export default Person;
