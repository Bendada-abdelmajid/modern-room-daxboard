import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../AdminContext'
import { db, storage } from "../FirebaseConfig";
import { doc , setDoc , collection, addDoc} from "firebase/firestore";
import { IoIosClose } from "react-icons/io";
function CatForm() {
  const {openCatForm, setOpenCatForm}= useContext(AdminContext)
  const [cat, setCat]= useState("")
  const [count, setCount]= useState(0)
  useEffect(()=>{
    if(openCatForm.item){
      setCat(openCatForm.item.cat)
      setCount(openCatForm.item.count)
    }
  }, [openCatForm.item])
  async function submitCat(e){
    e.preventDefault();
    try {
      const data= {
        cat: cat,
        count: count,
      }
      let res
      if(openCatForm.item) {
        res = await setDoc(doc(db, "categories", openCatForm.item.id), data);
        alert("recipe has been updated")
        setCat("")
        setOpenCatForm({open:false, item:null})
      } else {
        res = await addDoc(collection(db, "categories"), data);
        alert("recipe has  been added")
        setCat("")
        
      }
     
      
     console.log(res)
    } catch (err) {
      alert("something wrong please try again")
    }
  }
  return (
    <>
    <div className={`overlay ${openCatForm.open ? "show": ""}`} ></div>
    <form className={`form box ${openCatForm.open ? "show": ""}`} style={{width:"360px"}} onSubmit={submitCat}>
        <div className="space-b form-head">
            <h3>{openCatForm.item? "Update": "Add New"} Categorie</h3>
            <div className="close-btn center" onClick={()=>setOpenCatForm({open:false, item:null})}>
                <IoIosClose/>
            </div>
        </div>
        <p><input type="text"  placeholder='add new categorie' value={cat} onChange={(e)=>setCat(e.target.value)} /></p>
        <button type="submit">{openCatForm.item? "Update": "Add"}</button>
    </form>
    </>
  )
}

export default CatForm