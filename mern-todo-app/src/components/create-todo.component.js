import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

  constructor(props) {
    super(props);
    
    // Binding the methods
    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Default parameters of a todo
    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    }
  }

  // Method used to assign todo description
  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });
  }

  // Method used to assign todo reponsible
  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  // Method used to assign todo priority
  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }

  // Method to handle submit todo
  onSubmit(e) {
    e.preventDefault();

    // Backend submit logic
    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    console.log(`Todo Responsbile: ${this.state.todo_responsible}`);
    console.log(`Todo Priority: ${this.state.todo_priority}`);
    console.log(`Todo Completed: ${this.state.todo_completed}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };

    axios.post('http://localhost:4000/todos/add', newTodo)
      .then(res => console.log(res.data));

    // Reset todo state
    this.setState({
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false
    });
  }

  render() {
    return (
      <div style={{marginTop: 20}}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <input type="text"
                    className="form-control"
                    value={this.state.todo_description}
                    onChange={this.onChangeTodoDescription} />
          </div>
          <div className="form-group">
            <label>Responsible:</label>
            <input type="text"
                    className="form-control"
                    value={this.state.todo_responsible}
                    onChange={this.onChangeTodoResponsible} />
          </div>
          
          <div className="form-group">
            <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityLow"
                        value="Low"
                        checked={this.state.todo_priority==='Low'}
                        onChange={this.onChangeTodoPriority} />                          
                <label className="form-check-label">Low</label>
            </div>

            <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityMedium"
                        value="Medium"
                        checked={this.state.todo_priority==='Medium'}
                        onChange={this.onChangeTodoPriority} />
                <label className="form-check-label">Medium</label>
            </div>

            <div className="form-check form-check-inline">
                <input  className="form-check-input"
                        type="radio"
                        name="priorityOptions"
                        id="priorityHigh"
                        value="High"
                        checked={this.state.todo_priority==='High'}
                        onChange={this.onChangeTodoPriority} />
                <label className="form-check-label">High</label>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Todo" className="btn btn-primary" />
          </div>

        </form>
      </div>
    );
  }
}