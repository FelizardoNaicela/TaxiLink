import {
  Routes,
  Route,
} from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';

import { RegisterPage } from '../pages/RegisterPage';

import { ChatPage } from '../pages/ChatPage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import GroupsPage from '../pages/GroupsPage';
import { CreateGroupPage } from '../pages/CreatGroupPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
       element={
  <PublicRoute>
    <LoginPage />
  </PublicRoute>
}
      />

      <Route
  path="/register"
  element={
  <PublicRoute>
    <RegisterPage />
  </PublicRoute>
}
/>

      <Route
  path="/chat/:groupId"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/groups"
  element={
    <ProtectedRoute>
      <GroupsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/groups/create"
  element={
    <ProtectedRoute>
      <CreateGroupPage />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}