import React, {useState} from 'react'
import {v4 as uuidV4} from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    {/* Now to set the unique id in the input : */}
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    {/* To create a new ID whenever "new room" is clicked */}
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        // for the toast :
        toast.success('Created a new room')
    };
    // Add route to the join button :
    const navigate = useNavigate();
    const joinRoom = () => {
        if(!roomId || !username){
            toast.error('ROOM ID & username is required');
            return;
        }
        // else we redirect to the editor page
        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },// state is used for accessing the username in the other pages other than home page
        }
        )
    }
    // add the press enter and join click :
    const enterJoin = (e) => {
        if(e.code === 'Enter'){
            joinRoom();
        }
    }
    return <div className='homePageWrapper'>
        <div className="formWrapper">
            <img className='homePageLogo' src="/code-sync.png" alt="code-sync-logo" />
            {/* We add the logo and favicon to the webpage */}
            <h4 className="mainLabel">Paste invitation rooom Id</h4>
            <div className="inputGroup">
                <input 
                    type="text" 
                    className='inputBox' 
                    placeholder='ROOM ID' 
                    onChange={(e) => setRoomId(e.target.value)} // e->event & to change val if manually id added (e.target.value)
                    value={roomId}
                    onKeyUp={enterJoin}
                    />
                    <input 
                    type="text" 
                    className='inputBox' 
                    placeholder='USERNAME' 
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    onKeyUp={enterJoin}
                />
                <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                <span className="createInfo">
                    If you don't have an invite then create &nbsp;
                    <a onClick={createNewRoom} href="" className='createNewBtn'>
                        new room
                    </a>
                </span>
                
            </div>
        </div>
    </div>
}
export default Home