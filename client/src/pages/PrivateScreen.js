import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";

export default function PrivateScreen(props) {

    const navigate = useNavigate();

    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true)

    function logout(e) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        navigate('/login');
    }

    useEffect(() => {
       const fetchData = async() => {
        return axios.post('http://localhost:8000/user', {
            id: localStorage.getItem('id'),
        }).then((res) => {
            setData(res.data.user);
            setLoading(false);
        }).catch(err => console.log(err))
       }

       fetchData();

    }, [])

    //there is a delay in getting and then rednering the data on the DOM, thus the isLoading attribute is necessary
    return (
        <div>
            <h1>{(isLoading) ? 'Loading...' : `Fav Movie is: ${data.favMovie}`}</h1>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}
