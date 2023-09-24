import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import AdminNavigation from './privateNavigation/adminNavigation';
import MemberNavigation from './privateNavigation/memberNaviagtion';
import GuestNavigation from './guestNavigation';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <GuestNavigation />;
  } else {
    if (currentUser.roleid === 0) {
      return <AdminNavigation />;
    } else {
      return <MemberNavigation />;
    }
  }
}

export default Navigation;
