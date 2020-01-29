import React, {useState, useEffect} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth.js';
import AddFriend from './AddFriend.js';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        axiosWithAuth().get('/api/friends')
            .then(response => {
                setFriends(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },[]);
    return (
        <div>
            <AddFriend friends={friends} setFriends={setFriends}/>
            <div>
                {friends.map(friend => {
                    return (
                        <div key={friend.id}>
                            <h3>{friend.name}</h3>
                            <p>Age: {friend.age}</p>
                            <p>Email: {friend.email}</p>
                        </div>
                    )})}
            </div>
        </div>
    )};
export default Friends;