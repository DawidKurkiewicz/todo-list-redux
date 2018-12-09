import { database } from '../firebaseConfig'

const ADD_TASK_INPUT_CHANGE = 'toDo/ADD_TASK_INPUT_CHANGE'
const SHOWING_TASKS = 'toDo/SHOWING_TASKS'
const CLEAN_ADD_INPUT = 'toDo/CLEAN_ADD_INPUT'
const FILTER_INPUT_CHANGE = 'toDo/FILTER_INPUT_CHANGE'
const SHOW_COMPLETED = 'toDo/SHOW_COMPLETED'
const SHOW_UNCOMPLETED = 'toDo/SHOW_UNCOMPLETED'
const SHOW_ALL = 'toDo/SHOW_ALL'




const INITIAL_STATE = {
    allToDos: [],
    visibleToDos: [],
    filterTodo: '',
    newToDo: ''
}


export const addNewTaskToDbAsyncAction = () => (dispatch, getState) => {
    const newTask = getState().toDo.newToDo
    const uuid = getState().auth.user.uid
    database.ref(`users/${uuid}/tasks`).push({
        text: newTask,
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
export const filterInputChangeAction = text => ({
    type: FILTER_INPUT_CHANGE,
    text
})
export const showAllAction = () => ({
    type: SHOW_ALL
})
export const showUncompletedAction = () => ({
    type: SHOW_UNCOMPLETED
})
export const showCompletedAction = () => ({
    type: SHOW_COMPLETED
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
                allToDos: action.tasks,
                visibleToDos: action.tasks

            }
        case CLEAN_ADD_INPUT:
            return {
                ...state,
                newToDo: ''
            }
        case FILTER_INPUT_CHANGE:
            return {
                ...state,
                filterTodo: action.text,
                visibleToDos: state.allToDos.filter(task => task.text.toLowerCase().replace(/\s/g, '')
                    .includes(action.text.toLowerCase().replace(/\s/g, ''))
                )
            }
        case SHOW_ALL:
            return {
                ...state,
                visibleToDos: state.allToDos.filter(task => task.text.toLowerCase().replace(/\s/g, '')
                    .includes(state.filterTodo.toLowerCase().replace(/\s/g, '')))
            }
        case SHOW_COMPLETED:
            return {
                ...state,
                visibleToDos: state.allToDos.filter(task => task.completed === true).filter(task => task.text.toLowerCase().replace(/\s/g, '')
                    .includes(state.filterTodo.toLowerCase().replace(/\s/g, '')))
            }
        case SHOW_UNCOMPLETED:
            return {
                ...state,
                visibleToDos: state.allToDos.filter(task => task.completed === false).filter(task => task.text.toLowerCase().replace(/\s/g, '')
                    .includes(state.filterTodo.toLowerCase().replace(/\s/g, '')))
            }
        default:
            return state
    }
}