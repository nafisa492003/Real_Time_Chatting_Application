import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav_Bar from "./NavBar/Nav_Bar";
import { ImSpinner6 } from "react-icons/im";
import Search from "./Search";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./Slices/userSlice"; // ✅ import your Redux actions

const RootLayout = () => {
  const auth = getAuth(); 
  const dispatch = useDispatch();

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getDatabase();
  const [userList, setUserList] = useState([]);

  const userData = useSelector((selector) => selector.user.user);

  // ✅ Watch Firebase auth & update Redux user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login(currentUser)); // ✅ this updates Redux
        setFirebaseUser(currentUser);
      } else {
        dispatch(logout());
        setFirebaseUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // ✅ Don't run this effect if userData is null
  useEffect(() => {
    if (!userData) return;
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData?.uid !== item.key) {
          arr.push({ ...item.val(), userid: item.key });
        }
      });
      setUserList(arr);
    });
  }, [userData?.uid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <ImSpinner6 className="text-blue" size={60} />
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="flex flex-col gap-0 px-1 pt-3 lg:gap-4 md:px-5 dark:bg-black dark:text-white lg:flex-row">
      <Nav_Bar />
      <div className="w-full lg:ml-[186px] p-5">
        <Search userList={userList} />
        <Outlet />
      </div>
    </section>
  );
};

export default RootLayout;
