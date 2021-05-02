import React, { useCallback, useMemo } from 'react';
import useModal from 'src/hooks/GlobalModal';
import useLoggedIn from 'src/hooks/logged-in';
import { IAuthSignComponent } from 'src/interfaces';
import AuthForm from '../AuthForm';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

const UserHeader: React.FC = () => {
  const { isLoggedIn, logout } = useLoggedIn();
  const { setModal } = useModal();

  const openModal = useCallback(
    (authHeader: string, authComponent: IAuthSignComponent) => {
      return () => {
        setModal({
          header: authHeader,
          component: <AuthForm authComponent={authComponent} />,
        });
      };
    },
    [setModal],
  );

  return useMemo(() => (isLoggedIn ? <LoggedIn logoutHandler={logout} /> : <LoggedOut openModal={openModal} />), [
    openModal,
    logout,
    isLoggedIn,
  ]);
};

export default UserHeader;
