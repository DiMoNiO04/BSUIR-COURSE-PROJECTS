import { useCookies } from 'react-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUCCESS_LOGOUT, TOKEN_KEY, EUrls, ROLE_KEY } from '@/utils';

const useLogout = () => {
  const [cookies, , removeCookie] = useCookies([TOKEN_KEY]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeCookie(TOKEN_KEY, { path: '/' });
    removeCookie(ROLE_KEY, { path: '/' });

    if (location.pathname === EUrls.PROFILE || location.pathname === EUrls.FAVORITES) {
      navigate(EUrls.MAIN, { replace: true });
    }

    return SUCCESS_LOGOUT;
  };

  return { isAuth: !!cookies[TOKEN_KEY], handleLogout };
};

export default useLogout;
