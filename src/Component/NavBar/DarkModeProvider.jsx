import React, { createContext, useContext, useEffect, useState } from 'react';
const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? 'dark' : ''}>{children}</div>
    </DarkModeContext.Provider>
  );
};
export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
