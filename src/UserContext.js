import { createContext, useState } from 'react';

const UserType = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  const [addresses, setAddresses] = useState([]);

  return (
    <UserType.Provider value={{ userId, setUserId, user, setUser, addresses, setAddresses }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
