import "./App.css";
import React, { useState, useEffect } from "react";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LockScreen from "./pages/LockScreen";
function App() {
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [lock, setLock] = useState(localStorage.getItem('applock'));

  useEffect(() => {
    try {
      const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
      });
      return () => {
        unregisterAuthObserver();
      };
    } catch (error) {
      alert("no connection");
    }
  }, []);

  return (
    <div className="App">
      {/* {user ? (
        lock ? ( 
          <LockScreen lock={lock} setLock={setLock} />
        // ) : (*/}
          <Admin user={user} setLock={setLock} />
         {/* )
      // ) : (
      //   <Login />
      // )}*/}
    </div>
  );
}

export default App;
