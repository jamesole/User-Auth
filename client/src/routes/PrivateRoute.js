import { Route, useNavigate } from "react-router-dom";

export default function PrivateRoute({children}) {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    return (
        (authToken) ? (children) : (<h1>You are not authorized. Please log in.</h1>)
    );
}
