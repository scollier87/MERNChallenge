const LOAD_USERS = 'users/LOAD'
const LOAD_ONE_USER = 'users/LOADONEUSER'
const UPDATE_USER = 'users/UPDATE'
const ADD_USER = 'users/ADD'
const DELETE_USER = 'users/DELETE'

const loadUsers = (users) => ({
    type: LOAD_USERS,
    users
})

const loadOneUser = (user) => ({
    type: LOAD_ONE_USER,
    user
})

const updateOneUser = (user) => ({
    type: UPDATE_USER,
    user
})

const addUser = (user) => ({
    type: ADD_USER,
    user
})

const deleteUser = (userId) => ({
    type: DELETE_USER,
    userId
})

export const loadAllUsers = () => async(dispatch) => {
    const response = await fetch(`/record/`);
    const userList = await response.json()
    dispatch(loadUsers(userList))
}

export const OneUser = () => async(dispatch) => {
    const response = await fetch('/record/id');
    const oneUser = await response.json()
    dispatch(loadOneUser(oneUser))
}

export const add = (payload) => async dispatch => {
    const {
        firstName,
        lastName,
        email,
        password,
        isActive,
        address,
        city,
        state,
        zip,
    } = payload

    console.log(payload)

    const response = await fetch(`/record/add`, {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, isActive, address, city, state, zip})
    });
    let newUser
    if (response.ok) {
        newUser = await response.json();
        dispatch(addUser(newUser))
    }
    return newUser
}

export const updateUser = user => async dispatch => {
    const response = await fetch(`/update/${user.id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user)
    })

    if (response.ok) {
        const user = await response.json()
        dispatch(updateOneUser(user))
        return user
    }
}

export const deleteOneUser = userId => async dispatch => {
    const response = await fetch(`/${userId}`, {
        method: 'DELETE'
    })

    if(response.ok)
    dispatch(deleteUser(userId))
}

export default function userReducer(state={}, action){
    switch (action.type) {
        case LOAD_USERS:
            const newUsers = {}
            action['users'].forEach(user => {
                newUsers[user._id] = user;
            })
            return {
                ...state,
                ...newUsers
            }

        case LOAD_ONE_USER:
            const oneUser = {
                [action.user._id] : {
                    ...state[action.user]
                }
            }

        case ADD_USER:
            if(!state[action.user._id]) {
                return {
                    ...state,
                    [action.user._id] : action.user
                }
            }

        case UPDATE_USER:
            console.log(action.user, "*******")
            return {
                ...state,
                [action.user._id] :action.user
            }

        case DELETE_USER:
            let newState = { ...state }
            delete newState[action.userId]
            return newState

        default:
            return state
    }
}