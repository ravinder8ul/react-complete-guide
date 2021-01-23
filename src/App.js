import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
    const cssStyle = {
      backgroundColor: 'green', //camel case
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map( (person, idx) => {
              return <Person
                click={ () => this.deletePersonHandler(idx) }
                name={person.name}
                age={person.age}
                key={person.id}
                changed={ (event) => this.nameChangedHandler(event, person.id) }
              />
            })
          }
        </div>
      );
      cssStyle.backgroundColor = 'red';
    }

    const classes = [];
    if (this.state.persons.length <=2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          style={cssStyle}
          onClick={this.togglePersonHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
