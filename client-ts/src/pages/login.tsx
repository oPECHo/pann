import { useEffect } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from "react-oidc-context";
import { Navigate, useLocation } from 'react-router-dom';
import { useAppCtx } from '../AppProvider';

function Login() {

  const { userInfo, action } = useAppCtx();
  const auth = useAuth();
  const location = useLocation();

  console.log('rendering..... login', auth.user)
  useEffect(() => {
    if (auth.isAuthenticated) {
      setTimeout(() => {
        action.setUserInfo({
          ready: true,
          username: auth.user?.profile.preferred_username,
          displayName: auth.user?.profile.given_name + ' ' + auth.user?.profile.family_name
        })
      }, 1000)
    }
  }, [auth, userInfo.ready])

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    if (userInfo.ready) {
      const backTo = location.state?.backTo || '/home'
      return (
        <Navigate to={backTo} replace />
      );
    } else {
      return <div>Waiting for whoami</div>;
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>
      <Button variant='contained' sx={{ fontSize: 'large' }} onClick={() => void auth.signinRedirect()}>
        <LoginIcon sx={{ mr: 1 }} />
        Log in
      </Button>
    </Box>
  );
};

export default Login;