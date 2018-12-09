import { database } from '../firebaseConfig'

const ADD_TASK_INPUT_CHANGE = 'toDo/ADD_TASK_INPUT_CHANGE'
const SHOWING_TASKS = 'toDo/SHOWING_TASKS'
const CLEAN_ADD_INPUT = 'toDo/CLEAN_ADD_INPUT'



const INITIAL_STATE = {
    allToDos: [],
    visibleToDos: [],
    filterToDo: '',
    newToDo: ''
}


export const addNewTaskToDbAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().toDo.newToDo
    const uuid = getState().auth.user.uid
    database.ref(`users/${uuid}/tasks`).push({
        task: newTask,
        completed: false
    })
    dispatch(cleanAddInputAction())

}
export const toggleToDoAsyncAction = (task) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid
    database.ref(`users/${uuid}/tasks/${task.key}`).update({
        completed: !task.completed
    })
}


export const getTasksListFromDbAsyncAction = () => (dispatch, getState) => {
    const uuid = getState().auth.user.uid
    database.ref(`users/${uuid}/tasks`).on(
        'value',
        snapshot => {
            if (snapshot.val()) {

            const tasks = Object.entries(
                snapshot.val()
            ).map(entry => ({
                ...entry[1],
                key: entry[0]
            }))
            dispatch(showingTaskListAction(tasks))
        } else {
            dispatch(showingTaskListAction(null))
         }
        }
    )
}
export const deleteTaskAsyncAction = (key) => (dispatch, getState) => {
    const uuid = getState().auth.user.uid
     database.ref(`users/${uuid}/tasks`).child(key).remove()
}
export const addTaskInputChangeAction = text => ({
    type: ADD_TASK_INPUT_CHANGE,
    text
})
const showingTaskListAction = tasks => ({
    type: SHOWING_TASKS,
    tasks
})
const cleanAddInputAction = () => ({
    type: CLEAN_ADD_INPUT
})
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TASK_INPUT_CHANGE:
            return {
                ...state,
                newToDo: action.text
            }
        case SHOWING_TASKS:
            return {
                ...state,
                allToDos: action.tasks
            }
            case CLEAN_ADD_INPUT:
            return {
                ...state,
                newToDo: ''
            }
        default:
            return state
    }
}