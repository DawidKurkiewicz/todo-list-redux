import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


const ToDo = props => (
    <div>
        <TextField
            hintText='Add task'
        />
        <RaisedButton
            label='Add task'
            primary={true}
        />
        <TextField
            hintText='Find task'
        />


    </div>
)
const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(ToDo) 