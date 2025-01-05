import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav_Bar from "./NavBar/Nav_Bar";
import { ImSpinner6 } from "react-icons/im";
const RootLayout = () => {
  const auth = getAuth(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center w-full h-screen"><ImSpinner6 className="text-blue " size={60}/></div>; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="flex flex-col gap-0 px-1 pt-3 lg:gap-4 md:px-5 dark:bg-black dark:text-white lg:flex-row">
      <Nav_Bar />
      <Outlet />
    </section>
  );
};

export default RootLayout;
