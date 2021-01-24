import React, { Component } from 'react';
import classes from './App.module.css';
import Person from './Person/Person';

import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 'id1', name: 'Max', age: 28 },
      { id: 'id2', name: 'Manu', age: 29 },
      { id: 'id3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
  }

  deletePersonHandler = ( idx ) => {
    const persons = [...this.state.persons];
    persons.splice(idx, 1);
    this.setState( {persons: persons} );
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( {showPersons: !doesShow} );
  }

  render() {
    let persons = null;
    let btnClasses = [classes.Button];

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map( (person, idx) => {
              return <ErrorBoundary key={person.id}>
                <Person
                  click={ () => this.deletePersonHandler(idx) }
                  name={person.name}
                  age={person.age}
                  changed={ (event) => this.nameChangedHandler(event, person.id) }
                />
              </ErrorBoundary>
            })
          }
        </div>
      );
      btnClasses.push(classes.Red);
    }

    const assignedClasses = [];
    if (this.state.persons.length <=2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClasses.join(' ')}
          onClick={this.togglePersonHandler}>Toggle Persons
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
