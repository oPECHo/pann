import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Login from '../pages/login';
import UserResultList from '../pages/user-result-list';
import AnnouncementList from '../pages/announcement-list';
import { useAppCtx } from '../AppProvider';

type Props = {
  staffOnly?: boolean
  children: JSX.Element
}

const ProtectedRoute = ({staffOnly, children }: Props) => {
  const {userInfo, action} = useAppCtx();
  const location = useLocation()
  const staffDenied = staffOnly && !action.isStaff()
  if (!userInfo.ready || staffDenied) {    
    if(staffDenied){
      action.signOut()
    }
    console.log('backTo = ', location.pathname)
    return  <Navigate to="/login" replace state={{backTo: location.pathname}}/>;
  }

  return children;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login/>} />
      <Route path="home" element={<ProtectedRoute><UserResultList/></ProtectedRoute>} />
      <Route path="announcement" element={<ProtectedRoute><AnnouncementList/></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;