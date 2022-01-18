// import './App.css';
import React from 'react'
import store from './PersonStore'
import Login from './Login'
import Person from './Person'
import Select from 'react-select'
import btnStyle from './css/btnStyle.css'
import Register from './Register'
let listaMembrii = []
let listaEchipa = []
let selectedMemberId = -1

class App extends React.Component{
  constructor(){
    super()
    //starea aplicatiei
    this.state={
      people:[],
      projects: [],
      myProjects: [],
      foreignProjects: [],
      projectsForTeacher: [],
      grades: [],
      registerType: 'Log In',
      projectStatus: 'myProjects',
      isCorrect: false,
      loggedPersonId: -1,
      loggedPersonType: '',
      selected: -1,
      link: 'www.youtube.com'
    }
    this.logIn =(value)=>
    {
        let check = false
        this.state.people.forEach(person => {
          if(person.username === value.username && person.password === value.password)
          {
            this.setState({
              isCorrect: true,
              loggedPersonId: person.id,
              loggedPersonType: person.type
            })
            check = true
          }
        })
        if(check === false)
        {
          alert('Nu sunt corecte datele introduse de logare.')
        }
    }
    //afiseaza interfata de sign in
    this.signIn =()=>{
      this.setState({
        registerType: 'Sign In'
      })
    }
    //adauga o persoana in baza de date in cazul in care datele introduse sunt valide
    this.add=(person)=>{
      let check = true
      if(person.type !== 'TEACHER' && person.type !== 'STUDENT')
      {
        check = false
        alert('Tipul trebuie sa fie STUDENT sau TEACHER')
      }
      let grupa = parseInt(person.group)
      let serie = parseInt(person.series)
      if(isNaN(grupa) && person.type === 'STUDENT')
      {
        check = false
        alert('Grupa trebuie sa fie numerica')
      }

      if(!isNaN(serie) && person.type === 'STUDENT')
      {
        check = false
        alert('Seria trebuie sa fie litera')
      }
      if(person.group.toString().length === 0 && person.type === 'STUDENT')
      {
        check = false
        alert('Grupa trebuie completata')
      }

      if(person.series.toString().length !== 1 && person.type === 'STUDENT')
      {
        check = false
        alert('Seria trebuie sa fie aiba o singura litera')
      }
      this.state.people.forEach(existentPerson => {
        if(person.username === existentPerson.username)
        {
          check = false
          alert('Username-ul exista deja')
        }
      })
      if(person.name.toString().length<1){
        check=false;
        alert('Completati numele!')
      }
      if (person.password.toString().length<1){
        check=false;
        alert('Completati parola!')
      }
      if (person.username.toString().length<1){
        check=false;
        alert('Completati ussername-ul!')
      }
      if(check === true)
      {
        person.series = person.series.toUpperCase()
        person.group = grupa
        if(person.type === 'TEACHER')
        {
          person.group = 0
          person.series = ''
        }
        store.addOne(person)
        this.state.people.push(person)
        this.setState({
          registerType: 'Log In'
        })
      }
    }
    //afiseaza fereastra de log in 
    this.cancel=()=>{
      this.setState({
        registerType: 'Log In'
      })
    }
  }

  componentDidMount(){
   //se iau persoanele de pe server
    store.getAll()
    store.emitter.addListener('GET_PEOPLE_SUCCES',()=>{
      this.setState({
        people:store.data
      })
    })
    
  }
//se ocupa de interfata proiectului
render(){
  //afiseaza componentele ecranului de log in
  if((this.state.registerType === 'Log In') && (this.state.isCorrect === false))
  {
    return (
      <div>
        <Login onLog = {this.logIn} onSign = {this.signIn}/>
        </div>
    )
  }
  //afiseaza componentele ecranului de sign in 
  else if(this.state.registerType === 'Sign In'&& (this.state.isCorrect === false))
  {return (
  <div>
    <Register onAdd={this.add} onCancel={this.cancel}/>
  </div>
  )
  }
}
}

export default App;
