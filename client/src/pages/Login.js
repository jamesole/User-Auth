import '../App.css'
import React, {useState, useEffect} from 'react';
import {AiFillEye, AiFillEyeInvisible, AiTwotoneLock} from 'react-icons/ai';
import {BsPersonFill} from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState('')

    const navigate = useNavigate();

    //check that user can't get to this route if they are logged in

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate('/private');
        }
    }, [navigate])



    function changed(e) {
        if (e.target.id === 'email') {
            setEmail(e.target.value)
        }
        else {
            setPassword(e.target.value)
        }
    }

    function toggle(e) {
        setHidden(!hidden)
    }


    async function sendUser(e) {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill out email and password');
            setTimeout(() => {
                setError('')
            }, 5000);
        }
        else {
            const config = {
                header: {
                    'Content-Type': "application/json"
                }
            }
    
            const user = {
                email,
                password
            }
    
            try {
                const response = await axios.post('http://localhost:8000/login', user, config);
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('id', response.data.id)
    
                navigate('/private');
            }
    
            catch(err) {
                setError(err.response.data.error);
                setTimeout(() => {
                    setError('')
                }, 3500)
            }
        }

    }



    return (
        <div className='top-form'>
        <div className='login-form'>
            <h4 className='form-title'>Log in to your WeLit account to contribute to the overall litness of the website!</h4>
            {error && <span>{error}</span>}
        <form onSubmit={sendUser}>
            <div className="form-group">
                <label>Email address</label>
                <div className='input-div'>
                    <div className=''>
                        <span className='input-group-text'>
                            <BsPersonFill />
                        </span>
                    </div>
                    <input type="email" className="form-control" id="email" onChange={changed} value={email} placeholder="Email" />
                </div>
            </div>
            <div className="form-group">
                <label>Password</label>
                <div className='input-div'>
                    <div className=''>
                        <span className='input-group-text' >
                            <AiTwotoneLock />
                        </span>
                    </div>
                    <input type="password" className="form-control" id="password" onChange={changed} value={password} placeholder="Password" />

                    <div className=''>
                        <span className='input-group-text' onClick={toggle}>
                            {!hidden ? (<AiFillEye id='visible'/>) : (<AiFillEyeInvisible id='invisible'/>)}
                        </span>
                    </div>


                </div>
            </div>
            <div className='btn-div'>
                <button id='submit-login' type="submit" className="btn btn-dark">Log In</button>
            </div>
        </form>
        </div>

        <div className='bottom-div'>
            <p className='link'><a href='/lost-password'>Lost password?</a></p>
            <p>•</p>
            <p className='link'><a href='/register'>Creat an account</a></p>
        </div>
        </div>
    );
}
