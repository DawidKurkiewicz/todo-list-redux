import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


const AddTask = props => (
    <div>
        <TextField
            hintText='Add task'
            value={props.OnChangeTextHandler}
            onChange={props.OnTextHandler}
        />
        <RaisedButton
            label='Add task'
            primary={true}
            onClick={props.OnClickHandler}
        />
    </div>
)

export default AddTask