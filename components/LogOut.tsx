import Cookies from 'js-cookie';
const logout = () => {
    Cookies.remove('token');
    // Redirect the user to the login page or home page
    window.location.href = '/login';
  };

export default logout