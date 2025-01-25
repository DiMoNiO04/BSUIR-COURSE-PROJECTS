import { useCookies } from 'react-cookie';
import { TOKEN_KEY, ROLE_KEY } from '@/utils';

const useAuthToken = () => {
  const [cookies] = useCookies([TOKEN_KEY, ROLE_KEY]);

  const token = cookies[TOKEN_KEY] || null;
  const role = cookies[ROLE_KEY] || null;

  return { token, role };
};

export default useAuthToken;
