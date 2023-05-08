import React , {useEffect} from "react";
import { google, auth , db} from '../FirebaseConfig';
import { doc, getDoc , setDoc} from "firebase/firestore";
import {signInWithPopup} from "firebase/auth";

function Login() {
  import("./login.css")
     
     
  const login = async() => {
    try {
      const result = await signInWithPopup(auth, google) 
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users",  result.user.uid), {
          username: result.user.displayName,
          orders: [],
          saved: []
        });      
        console.log("add")
       
      }
      
    } catch(err) {
      console.log(err)
    }
    
  }
  return (
    <div className="login ">
      <div className="left space-b">
        <div>
          <h1>WELCOME</h1>
          <p>Sing Up to start your new Journey</p>
        </div>
       
          <button
           
            onClick={login}
          >
            Login with Google
          </button>
      
      </div>
    
        <img src="/img/l-img.jpg" alt="" />
     
    </div>
  );
}

export default Login;
