import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { addTaskInputChangeAction, addNewTaskToDbAsyncAction, toggleToDoAsyncAction, deleteTaskAsyncAction,
    filterInputChangeAction, showCompletedAction, showUncompletedAction, showAllAction } from './state/toDo'
import { List, ListItem } from 'material-ui/List'
import { Checkbox } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'




const ToDo = props => (
    <div>
        <TextField
            hintText='Add task'
            value={props._newToDo}
            onChange={props._addTaskInputChangeAction}
        />
        <RaisedButton
            label='Add task'
            primary={true}
            onClick={props._addNewTaskToDbAsyncAction}

        />
        <TextField
            hintText='Find task'
            onChange={props._filterInputChangeAction}

        />
        <RaisedButton
            label='All tasks'
            primary={true}
            onClick={props._showAllAction}

        />
        <RaisedButton
            label='Uncompleted tasks'
            primary={true}
            onClick={props._showUncompletedAction}

        />
        <RaisedButton
            label='Completed tasks'
            primary={true}
            onClick={props._showCompletedAction}

        />
        <List>
            {
                props._visibleToDos &&
                props._visibleToDos.map ?
                props._visibleToDos.map(todo =>
                        <ListItem
                            primaryText={todo.text}
                            key={todo.key}
                            style={todo.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}
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
    _allToDos: state.toDo.allToDos,
    _filter: state.toDo.filter,
    _visibleToDos: state.toDo.visibleToDos


})
const mapDispatchToProps = dispatch => ({
    _addTaskInputChangeAction: (event) => dispatch(addTaskInputChangeAction(event.target.value)),
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction()),
    _toggleToDoAsyncAction: (task) => dispatch(toggleToDoAsyncAction(task)),
    _deleteTaskAsyncAction: (key) => dispatch(deleteTaskAsyncAction(key)),
    _filterInputChangeAction: event => dispatch(filterInputChangeAction(event.target.value)),
    _showCompletedAction: () => dispatch(showCompletedAction()),
    _showUncompletedAction: () => dispatch(showUncompletedAction()),
    _showAllAction: () => dispatch(showAllAction())



})
export default connect(mapStateToProps, mapDispatchToProps)(ToDo)