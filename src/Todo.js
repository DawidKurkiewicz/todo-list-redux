import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { addTaskInputChangeAction, addNewTaskToDbAsyncAction } from './state/toDo'
import { List, ListItem } from 'material-ui/List'
import { MenuItem } from 'material-ui'





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
                        <MenuItem
                            primaryText={todo.task}
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
    _addNewTaskToDbAsyncAction: () => dispatch(addNewTaskToDbAsyncAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(ToDo) 