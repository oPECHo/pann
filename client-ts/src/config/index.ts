import axios from "axios";
import { AuthProviderProps } from "react-oidc-context";
import { User } from "oidc-client-ts"

const isDev = process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const oidcConfig: AuthProviderProps = {
  authority: 'http://localhost:8888/realms/master',
  client_id: 'pann',
  scope: 'openid profile offline_access',
  redirect_uri: 'http://localhost:3000',    
  monitorSession: true,
};

export const ax = axios.create({
    baseURL: 'http://localhost:8000'
})

ax.interceptors.request.use(
  config => {
    const oidcStorage  = sessionStorage.getItem(`oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`)
    if(config.headers && oidcStorage){
      const user = User.fromStorageString(oidcStorage)
      config.headers['Authorization'] = `Bearer ${user.access_token}`;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const config = {
  isDev,
  remoteRepositoryUrlPrefix: isDev ? 'http://localhost:8000/api' : '/api'
}

export default config