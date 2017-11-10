import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';
import InputFields from './InputFields/InputFields';

class App extends Component {
  arrayStateName = {
    name: ""
  }

  arrayStateAge = {
    age: 0
  }


  personName = [""];
  personAge = [0];

  state = {
    persons: [
      {
        id: 1,
        name: 'elot',
        age: 23
      }, {
        id: 2,
        name: 'dev',
        age: 2
      }, {
        id: 3,
        name: 'John Clicker-Stealerson',
        age: 59
      }
    ],
    showPersons: false
  }

 
  nameChangedHandler = (event, id) => {
    //find the person object index via ID
    const personIndex = this
      .state
      .persons
      .findIndex(p => {
        return p.id === id;
      });

    //using spread operator to copy the object, dont want by reference!!
    const person = {
      ...this.state.persons[personIndex]
    };
    //updating name with new value from textbox
    person.name = event.target.value;
    //copying persons array, dont want reference!!
    const persons = [...this.state.persons];
    //Updating old object with new object
    persons[personIndex] = person;
    //updating state with copied array
    this.setState({persons: persons});
  }

  



  nameNewChangedHandler = (event) => {
    

    const personName = [...this.personName];
    personName.push(event.target.value);
    console.log(personName);
    
  }
  ageNewChangedHandler = (event) => {
  

    const personAge = [...this.personAge];
    personAge.push(event.target.value);
    console.log(personAge);
    
  }
  deletePersonHandler = (personIndex) => {
    //copy old array with spread operator
    const persons = {...this.state.persons};
    //remove person
    persons.splice(personIndex, 1);
    //update state with copied array, with person removed.
    this.setState({persons: persons});
  }

  addPersonHandler = () => {
    //copy old array with spread operator
    const persons = [...this.state.persons];
    //remove person
    // const personsName = document.getElementById("inputDogName").value;
    // const personsAge = document.getElementById("inputDogAge").value;
    let personsId = 1;
    if(persons.length>0){
      personsId = persons[persons.length-1].id+1;
    }


    const personsNameArray = [...this.personName];
    let personsName = "";
    if(personsNameArray.length>0){
      personsName = personsNameArray[personsNameArray.length-1];
    }
  
    const personsAgeArray = [...this.personAge];
    let personsAge = "";
    if(personsAgeArray.length>0){
      personsAge = personsAgeArray[personsAgeArray.length-1];
    }
    
    let personObject = {
      id: personsId,
      name: personsName,
      age: personsAge
    }
    persons.push(personObject);
    //persons.push(persons(persons.length-1).id+1, personsName, personsAge);
    this.setState({persons: persons});
    
  }

  togglePersonsHandler = () => {
    //booleans will copy by value
    const doesShow = this.state.showPersons;

    //update state with opposite of what it was.
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    //css object
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
  
    // let inputFields = null;
    // inputFields = (
    //     <div>
    //       {this
    //         .state
    //         .inputFields
    //         .map((person, index) => {
    //           return <InputFields
    //             changed1={(event) => this.nameChangedHandler(event, person.id)}
    //             changed2={(event) => this.nameChangedHandler(event, person.id)}
    //             changed3={(event) => this.nameChangedHandler(event, person.id)}/>
    //         })}
    //     </div>
    //   );
    



    //let inputFields = null;
    let persons = null;
    //should we should the person lists? dependant on state then we will either render the persons or not.
    if (this.state.showPersons) {
      //map function to turn an array into html
      persons = (
        <div>
          {this
            .state
            .persons
            .map((person, index) => {
              return <Person
                delete={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
            })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App using lists state/props</h1>
        <button style={style} onClick={this.togglePersonsHandler}>View dawgz</button>
        
        <input id="inputDogName" type="text" placeholder="Enter a name" onChange={(event) => this.nameNewChangedHandler(event)}/>
            <input id="inputDogAge" type="Number" placeholder="Enter an age" onChange={(event) => this.ageNewChangedHandler(event)}/>
            <input id="inputDogSpecies" type="text" placeholder="Enter a species"/>
            <button style={style} onClick={this.addPersonHandler}>Create dawg</button>
            
        {persons}
      </div>
    );
  }
}

export default App;
