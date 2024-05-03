import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {

	return localStorage.getItem('accessToken') ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;