// components/DashboardLayoutComponent.tsx
"use client";
import React from 'react';
import SignIn from "../components/SignIn";
import useAuth from '../hooks/useAuth';

const DashboardLayoutComponent = ({ children }: { children: React.ReactElement}) => {

  // Kiểm tra xem người dùng đã xác thực hay chưa
  const isAuthenticated = useAuth(); 

  return isAuthenticated ? (<div>{children}</div>)
    : <SignIn />;
}

export default DashboardLayoutComponent