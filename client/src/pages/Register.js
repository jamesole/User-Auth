import {BsPersonFill} from 'react-icons/bs';
import { AiTwotoneLock, AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState('');

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
                const response = await axios.post('http://localhost:8000/register', user, config);
                console.log(response)
                
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('id', response.data.id)
    
                navigate('/private');
            }
    
            catch(err) {
                console.log(err.response.data.error);
                navigate('/register');
            }
        }

    }
    return (
        <div className='top-form'>
            <div className='register-form'>
                <h4 className='form-title'>Sign up for a WeLit account to maximize the litness in your life!</h4>
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
                    <button id='submit-login' type="submit" className="btn btn-dark">Sign Up</button>
                </div>
            </form>
            </div>

            <div className='bottom-div-register'>
                <p className='link'><a href='/lost-password'>Lost password?</a></p>
                <p>•</p>
                <p className='link'><a href='/login'>Sign in</a></p>
            </div>
        </div>
    );
}
