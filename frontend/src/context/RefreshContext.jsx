import { createContext, useContext, useState } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshProjects, setRefreshProjects] = useState(0);

  const triggerRefresh = () => {
    setRefreshProjects(prev => prev + 1);
  };

  return (
    <RefreshContext.Provider value={{ refreshProjects, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
}; 