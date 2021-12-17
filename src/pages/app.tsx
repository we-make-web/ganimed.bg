import React, { useEffect } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { Routes } from '@/types';
import { Dashboard } from '@/components';
import { navigate } from 'gatsby';

const NotFound: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    navigate('/');
  }, []);
  return null;
};

const AppPages = (): JSX.Element => {
  return (
    <Router>
      <Dashboard path={`${Routes.DASHBOARD}`} />
      <NotFound default />
    </Router>
  );
};

export default AppPages;
