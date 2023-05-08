import React, {useEffect, useState} from "react";
import { BiSend } from "react-icons/bi";
import { db } from "../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
function Messages() {
  import("./messages.css");
  const [users, setUsers]= useState([]);
  const [messages, setMessages]= useState([]);
  useEffect(()=>{
    const users_unsubscribe = onSnapshot(
      collection(db, "users"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        console.log(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      users_unsubscribe();
    };
  }, [])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setMessages(list);
        console.log(list);
      },
      (error) => {
        console.log(error);
      }
    );
   
    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div className="messages-inbox">
      <div className="messages-box">
        <div className="head space-b">
          <div className="user-info f-start">
            <img className="c-img" src="/img/u1.png" />
            <h4>abdelmajid bendada</h4>
          </div>
        </div>
        <div className="messages-cont">
          {messages.map((m, index) => (
            <div className={`message ${m.from_costumer ? "" : "resiver"}`}
              key={index}
            >
              
              <p>{m.message}</p>
              <small>{m.time}</small>
            </div>
          ))}
          
        </div>
        <div className="message-form space-b" >
          <textarea name="" id="" rows="1"></textarea>
          <button type="submit" className="center">
            <BiSend />
          </button>
        </div>
      </div>
      <div className="messages-users">
        <div className="head f-start">
        messages inbox
        </div>
        {users.map((u, index) => (
            <div className="user-info f-start" key={index}>
            <img className="c-img" src={u.userImg} />
            <h4>{u.username}</h4>
            <div className="msg-count"></div>
          </div>
          ))}
        
       
      </div>
    </div>
  );
}

export default Messages;
