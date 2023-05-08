import React, { useRef , useState} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock} from 'react-icons/ai'
export default function LockScreen({lock, setLock}) {
    require("./lockScreen.css")
    const [seePass, setSeePass]=useState(false)
    const passRef=useRef()
    function open(){
        const password = passRef.current.value;
        if(password === process.env.REACT_APP_PASSWORD){
            setLock(false);
            localStorage.removeItem("applock")
        } else {
            passRef.current.parentElement.classList.add("chacke")
            setTimeout(() => {
                passRef.current.parentElement.classList.remove("chacke")  
            }, 600);
        }
    }
    
   if(!lock) return null
    return <div className="lockScrenn center">
        <div className="lock-box">
            <div className="lock-icon center"><AiOutlineLock/></div>
            <div className="lock-input space-b ">
                <input type={`${seePass? "text": "password"}`} placeholder="Password" ref={passRef}/>
                <div onClick={()=>setSeePass(!seePass)}>{seePass?<AiOutlineEyeInvisible/> :<AiOutlineEye/> }</div>
                
                
            </div>
            <button type="button" onClick={open}>Open</button>
        </div>
  </div>;
}
