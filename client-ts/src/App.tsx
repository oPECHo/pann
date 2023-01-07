import './App.css'
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './config';
import AppProvider from './AppProvider';
import AppRoutes from './config/router';

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <AppProvider>
        <AppRoutes/>
      </AppProvider>
    </AuthProvider>
  )
}
export default App;
