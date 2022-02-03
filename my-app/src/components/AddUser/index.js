import { useDispatch, useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { loadAllUsers, updateUser, add } from '../../store/users'
import { useParams } from "react-router"
import './AddUser.css'

function AddUser(){
    const {id} = useParams()
    const dispatch = useDispatch();

    const [firstName, setFirst_name] = useState('')
    const [lastName, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isActive, setIsActive] = useState('True')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [errors, setErrors] = useState('')

    const updateFirst_name = (e) => setFirst_name(e.target.value)
    const updateLast_name = (e) => setLast_name(e.target.value)
    const update_email = (e) => setEmail(e.target.value)
    const update_password = (e) => setPassword(e.target.value)
    const update_isActive = (e) => setIsActive(e.target.value)
    const update_address = (e) => setAddress(e.target.value)
    const update_city = (e) => setCity(e.target.value)
    const update_state = (e) => setState(e.target.value)
    const update_zip = (e) => setZip(e.target.value)

    const users = useSelector((state) => state)
    // console.log(users)
    useEffect(() => {
        dispatch(loadAllUsers());
    }, [dispatch])

    const handleSubmit = async (e) => {
        // console.log(payload)
        e.preventDefault();
        const payload = {
            id,
            firstName,
            lastName,
            email,
            password,
            isActive,
            address,
            city,
            state,
            zip,
        }
         await dispatch(add(payload))
    }



    const currentErrors = Object.values(errors)

    return (
        <div className='usersContainer'>
            <form className="usersForm" onSubmit={handleSubmit}>
                <ul>
                    {currentErrors.map((errors) => (
                        <li>
                            {errors}
                        </li>
                    ))}
                </ul>
                <div className='userDiv'>
                    <label className="userLabel">First Name</label>
                    <input className="userInput" value={firstName} onChange={updateFirst_name} type='text' required></input>
                </div>
                <div className='userDiv'>
                    <label className="userLabel">Last Name</label>
                    <input className="userInput" value={lastName} onChange={updateLast_name} type='text' required></input>
                </div>
                <div className='userDiv'>
                    <label className="userLabel">Email</label>
                    <input className="userInput" value={email} onChange={update_email} type='text' required></input>
                </div>
                <div className='userDiv'>
                    <label className="userLabel">Password</label>
                    <input className="userInput" value={password} onChange={update_password} type='text' required></input>
                </div>
                {/* <div className='userDiv'>
                    <label>isActive</label>
                    <input></input>
                </div> */}
                <div className='userDiv'>
                    <label className="userLabel">Address</label>
                    <input className="userInput" value={address} onChange={update_address} type='text' required></input>
                </div>
                <div className='userDiv'>
                    <label className="userLabel">City</label>
                    <input className="userInput" value={city} onChange={update_city} type='text' required></input>
                </div>
                <div className='userDiv'>
                    <label className="userLabel">State</label>
                    <input className="userInput" value={state} onChange={update_state} type='text' required></input>
                </div>
                <div className='userDiv'>
                    <label className="userLabel">Zip</label>
                    <input className="userInput" value={zip} onChange={update_zip} type='text' required></input>
                </div>
                <div>
                    <button className='submitUser_Button' type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser;