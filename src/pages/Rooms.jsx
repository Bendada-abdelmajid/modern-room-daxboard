import React, { useState, useEffect, useContext } from "react";
import { BsSearch, BsTrash } from "react-icons/bs";
import { MdOutlineEdit, MdAdd } from "react-icons/md";
import { db } from "../FirebaseConfig";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { AdminContext } from "../AdminContext";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const {setOpenRoomForm}= useContext(AdminContext)
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rooms"),
      (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRooms(list);
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
    <>
      <div className="head space-b">
        <h4>Rooms</h4>

        <div className="add-btn center"  onClick={()=>setOpenRoomForm({open:true, item:null})}>
          <MdAdd />
        </div>
      </div>
      <div className="cards scrollY">
        {rooms.map((el) => (
          <div className="card" key={el.id} onClick={()=>setOpenRoomForm({open:true, item:el})}>
            <img src={el.image} alt="" />
            <div className="content">
            <h4>{el.room}</h4>
            <p className="count">{el.count} product</p>
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
}
