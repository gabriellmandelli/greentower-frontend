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
    console.log(data)

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
        <Input id="nome" name="nome" placeholder="Seu nome completo" />
        <Input id="email" name="email" type="email" placeholder="Seu endereço de e-mail" />
        <Select
          id="sexo" name="sexo"
          options={[
            { id: "MASCULINO", title: "Masculino" },
            { id: "FEMININO", title: "Feminino" }
          ]}
        />
        <Input id="dataNascimento" name="dataNascimento" type="date" placeholder="17/01/1995" />
        <Input id="naturalidade" name="naturalidade"  placeholder="Sua naturalidade" />
        <Input id="nacionalidade" name="nacionalidade"  placeholder="Sua nacionalidade" />
        <Input id="cpf" name="cpf" type="cpf" placeholder="Seu cpf somente números" />
        <button type="submit">{editing ? "Atualizar" : "Adicionar"}</button>
      </Form>
      
      {editing ? (<button type="button">Excluir</button>) : ""}
      
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
