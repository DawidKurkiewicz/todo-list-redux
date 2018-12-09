import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { addTaskInputChangeAction, addNewTaskToDbAsyncAction, toggleToDoAsyncAction, deleteTaskAsyncAction } from './state/toDo'
import { List, ListItem } from 'material-ui/List'
import { Checkbox } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'




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
        <List>
            {
                props._allToDos &&
                props._allToDos.map ?
                props._allToDos.map(todo =>
                    <ListItem
                        primaryText={todo.text}
                        key={todo.key}
                        style={ todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                        leftCheckbox={
                            <Checkbox
                                defaultChecked={todo.completed}
                                onCheck={() => props._toggleToDoAsyncAction(todo)}
                            />
                        }
                        rightIconButton={
                            <IconButton
                            onClick={() => props._deleteTaskAsyncAction(todo.key)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    />
                )
                : null
            }
        </List>
    </div>
)
const mapStateToProps = state => ({
    _newToDo: state.toDo.newToDo,
    _allToDos: state.toDo.allToDos


})
const mapDispatchToProps = dispatch => ({
    _addTaskInputChangeAction: (event) => dispatch(addTaskInputChangeAction(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction()),
    _toggleToDoAsyncAction: (task) => dispatch(toggleToDoAsyncAction(task)),
    _deleteTaskAsyncAction: (key) => dispatch(deleteTaskAsyncAction(key))


})
export default connect(mapStateToProps, mapDispatchToProps)(ToDo) 