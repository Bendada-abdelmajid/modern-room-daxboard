import React, {useState, useEffect, Suspense} from 'react'
import Header from "../components/Header";
import NaveBar from "../components/NaveBar";
import AdminePages from "./pages";
import AddEditProduct from "../components/AddEditProduct";
import CatForm from "../components/CatForm";
import RoomForm from "../components/RoomForm";
import { db } from "../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";
import { AdminContext } from '../AdminContext';
export default function Admin({user, setLock}) {
    require("./admin.css")
    const [openCatForm, setOpenCatForm] = useState({ open: false, item: null });
    const [openProForm, setOpenProForm] = useState({ open: false, item: null });
    const [openRoomForm, setOpenRoomForm] = useState({ open: false, item: null });
    const [categories, setCategories] = useState([]);
   
    useEffect(() => {
        const unsubscribe = onSnapshot(
          collection(db, "categories"),
          (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setCategories(list);
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
    const [navState, setNavState] = useState(false);
  return (
    <div className={`admin dark ${navState ? "active_nav" : ""}`}>

        <BrowserRouter>
        <AdminContext.Provider
        value={{
          openCatForm,
          openProForm,
          categories,
          setOpenCatForm,
          setOpenProForm,
          openRoomForm, 
          setOpenRoomForm
        }}
      >
        
      
        <NaveBar setNavState={setNavState} />
        <div className="page-cont">
          <Header navState={navState} setNavState={setNavState} user={user}  setLock={setLock}/>
          <Suspense fallback={<h1>loding ...</h1>}>
            <AdminePages />
          </Suspense>
        
        </div>
        <AddEditProduct />
        <CatForm />
        <RoomForm/>
        </AdminContext.Provider>
        </BrowserRouter>
    </div>
  )
}
