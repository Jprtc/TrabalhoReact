import React,{useState, useEffect} from "react";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import { FormControl } from "react-bootstrap";
// import { InputGroup } from "react-bootstrap";
import {Form, Col ,Row, Table, Container} from 'react-bootstrap'

//CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//CSS para centralizar os conteudos da página.
import "./styles.css"


function Home() {
  
  const [disciplina, setDisciplina] = useState('')
  const [cargaHoras, setCargaHoras] = useState('')
  const [professor, setProfessor] = useState('Luiz Claudio de Souza')
  const [periodo, setPeriodo] = useState('1º Período')
  const [cadastro, setCadastro] = useState([])

  function handleAddCadastro(event){
    event.preventDefault()
    const data ={
      id: new Date().getTime(),
      disciplina,
      cargaHoras,
      professor,
      periodo
    }
    console.log(data)
    setCadastro([...cadastro,data])
    console.log(cadastro)

    setDisciplina('')
    setCargaHoras('')


  }

  function handleDelete(id){
    setCadastro(cadastro.filter(cad => cad.id !== id))
  }

  useEffect(() =>{
    function loadData(){
      const storagedCadastro = localStorage.getItem('@cadprof:cadastro')

      if(storagedCadastro){
        setCadastro(JSON.parse(storagedCadastro))
      }
    }
    loadData()
  },[])


  useEffect(() =>{
    function saveData(){
      localStorage.setItem('@cadprof:cadastro',JSON.stringify(cadastro))
    }
    saveData()
  }, [cadastro])

  



  return (
    <div className="pagina">
    <Card >
    <Form onSubmit={handleAddCadastro}>
      <Card.Header style ={{textAlign: 'center',color: '#347deb'}}><b>Cadastro de Disciplina</b></Card.Header>
      <Card.Body>
    <Row className="sm-5">
      <Form.Group as={Col} controlId="formGridDisciplina">
        <Form.Label>Disciplina</Form.Label>
        <Form.Control required value={disciplina} type="text" placeholder="Disciplina" onChange={(event) => setDisciplina(event.target.value)}/>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridCargaHoras">
        <Form.Label>Carga Horária (Horas)</Form.Label>
        <Form.Control required value={cargaHoras} type="number" placeholder="Carga Horária" onChange={(event) => setCargaHoras(event.target.value)} />
      </Form.Group>
    </Row>

    <Row className="sm-5">
      <Form.Group as={Col} controlId="formGridProfessor">
        <Form.Label>Professor(a)</Form.Label>
        <Form.Select value={professor} onChange={(event) => setProfessor(event.target.value)}>
        <option>Luiz Claudio de Souza</option>
        <option>Débora Amorim</option>
        <option>Carlos Eduardo Costa</option>
        <option>Salete Leone Ferreira</option>
        <option>Osni Augusto Souza</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPeríodo">
        <Form.Label>Período</Form.Label>
        <Form.Select value={periodo}  onChange={(event) => setPeriodo(event.target.value)}>
          <option>1º Período</option>
          <option>2º Período</option>
          <option>3º Período</option>
          <option>4º Período</option>
          <option>5º Período</option>
          <option>6º Período</option>
          <option>7º Período</option>
          <option>8º Período</option>
        </Form.Select>
      </Form.Group>
    </Row>
  
      </Card.Body>
      <Card.Footer style ={{textAlign: 'center'}}><Button type="submit" className="btn-sm btn-primary" >Inserir</Button></Card.Footer>
      </Form>
    </Card>

  <Container style ={{maxWidth:"645px",marginTop:"2rem"}}>
    <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Professor(a)</th>
        <th>Disciplina</th>
        <th>Período</th>
        <th>Carga Horária</th>
        <th colSpan={1}>Ações</th>
      </tr>
    </thead>
    <tbody>
      {cadastro.map(cad =>(
      <tr key={cad.id}>
        <td>{cad.professor}</td>
        <td>{cad.disciplina}</td>
        <td>{cad.periodo}</td>
        <td>{cad.cargaHoras} Horas</td>
        <td><Button className="btn-sm btn-danger" onClick={() => handleDelete(cad.id)} >Excluir</Button></td>
      </tr>
      ))}
    </tbody>

    </Table>
  </Container>

    </div>
  );
}

export { Home };
