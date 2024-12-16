import { Navigate } from 'react-router-dom';

interface RequireAuth{
    children:unknown
}

const RequireAuth = ({children}:RequireAuth) => {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
        return (
            <Navigate to="/user/login" replace={true} />
        )
    }
    return children
}

export default RequireAuth