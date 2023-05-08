import React, { useContext, useState, useRef, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { IoIosClose } from "react-icons/io";
import { collection, doc , setDoc, addDoc  } from "firebase/firestore";
import { AdminContext } from "../AdminContext";
import { db, storage } from "../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function RoomForm() {
    const {openRoomForm, setOpenRoomForm}= useContext(AdminContext)
    const [room, setRoom]= useState("")
    const [image, setImage]= useState("")
    const [url, setUrl]= useState("")
    const [count, setCount]= useState(0)
    const [prg, setPrg] = useState(null);
    const imageRef = useRef();
    useEffect(()=>{
      if(openRoomForm.item){
        setRoom(openRoomForm.item.room)
        setImage(openRoomForm.item.image)
        setCount(openRoomForm.item.count)
        
      }
    }, [openRoomForm.item])
    async function submitCat(e){
      e.preventDefault();
      try {
        const data= {
          room,
          image:url,
          count,
        }
        let res
        if(openRoomForm.item) {
          res = await setDoc(doc(db, "rooms", openRoomForm.item.id), data);
          alert("room has been updated")
          setOpenRoomForm({open:false, item:null})
        } else {
          res = await addDoc(collection(db, "rooms"), data);
          alert("room has  been added")
          
        }
       
        
        
        setImage("")
        setRoom("")
       console.log(res)
      } catch (err) {
        alert("something wrong please try again")
      }
    }
    function cahngeImage(e) {
        e.preventDefault();
        const file = imageRef.current.files[0];
        const url = URL.createObjectURL(file);
        setImage(url);
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapShot) => {
            const progress =
              (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
            setPrg(progress);
          },
          (error) => {
           
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUrl(downloadURL);
              setTimeout(() => {
                setPrg(null);
              }, 500);
            });
          }
        );
      
      }
    return (
      <>
      <div className={`overlay ${openRoomForm.open ? "show": ""}`} ></div>
      <form className={`form box ${openRoomForm.open ? "show": ""}`} style={{width:"360px"}} onSubmit={submitCat}>
          <div className="space-b form-head">
              <h3>{openRoomForm.item? "Update": "Add New"} Room</h3>
              <div className="close-btn center" onClick={()=>setOpenRoomForm({open:false, item:null})}>
                  <IoIosClose/>
              </div>
          </div>
          <p 
          style={{marginBottom:"15px"}}
              className="image-box center"
              onClick={() => imageRef.current.click()}
            >
              {image? (
                <img src={image}  alt="uploded... " />
                ) : (
                <>
                  <AiOutlineCloudUpload />
                  <h3>Upload image</h3>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                style={{ display: "none" }}
                onChange={cahngeImage}
              />
              </p>
          <p><input type="text"  placeholder='add new categorie' value={room} onChange={(e)=>setRoom(e.target.value)} /></p>
          <button type="submit"  disabled={prg !== null && prg < 100}>{openRoomForm.item? "Update": "Add"}</button>
      </form>
      </>
    )
}
