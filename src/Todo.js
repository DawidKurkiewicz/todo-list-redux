import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { addTaskInputChangeAction, addNewTaskToDbAsyncAction } from './state/toDo'




const ToDo = props => (
    <div>
        <TextField
            value={props._newTaskText}
            onChange={props._addTaskInputChangeAction}
        />
        <RaisedButton
            label='Add task'
            primary={true}
            onClick={props._addNewTaskToDbAsyncAction}

        />
        <TextField
            hintText='Find task'
        />
        <RaisedButton
            label='All tasks'
            primary={true}
        />
        <RaisedButton
            label='Uncompleted tasks'
            primary={true}
        />
        <RaisedButton
            label='Completed tasks'
            primary={true}
        />

    </div>
)
const mapStateToProps = state => ({
    _newToDo: state.toDo.newToDo

})
const mapDispatchToProps = dispatch => ({
    _addTaskInputChangeAction: (event) => dispatch(addTaskInputChangeAction(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(ToDo) 