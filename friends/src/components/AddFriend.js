import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
function AddFriend({friends, setFriends}) {
const [newFriend, setNewFriend] = useState({
    name: '',
    age: '',
    email: ''
    });
const addFriend = event => {
    event.preventDefault();
    setFriends([...friends, newFriend]);
axiosWithAuth().post('/api/friends', newFriend)
    .then(response => console.log(response))
    .catch(error => console.log(error))};
const handleChange = event => {
    setNewFriend({...newFriend,[event.target.name]:event.target.value})};
    return (
        <form onSubmit={addFriend}>
            <input
                type='text'
                name='name'
                placeholder='Name'
                onChange={handleChange}
                value={newFriend.name}/>
                <br/>
            <input
                   type='number'
                   name='age'
                   placeholder='Age'
                   onChange={handleChange}
                   value={newFriend.age}/>
                <br/>
            <input
                type='email'
                name='email'
                placeholder='Email'
                onChange={handleChange}
                value={newFriend.email}/>
            <button type='submit'>Add To List Of Friends</button>
        </form>
    )}
export default AddFriend;