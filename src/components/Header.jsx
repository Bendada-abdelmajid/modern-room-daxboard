import React, {useState} from 'react'
import { FiSearch, FiSettings } from 'react-icons/fi'
import { HiUserCircle } from 'react-icons/hi'
import { AiOutlineLock, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai'
import { IoIosArrowDown, IoIosNotificationsOutline, IoMdContract, IoMdExpand, IoMdMenu } from 'react-icons/io'
import { BiTask } from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
export default function Header({navState,setNavState, user, setLock}) {

    const navigate = useNavigate();
    const [expand, setExpand]= useState(false)
    const [openMenu, setopenMenu]= useState("")
    function expandWindow(){
        if(expand){
            document.exitFullscreen() 
            setExpand(false)
        } else {
            document.querySelector('.admin').requestFullscreen().catch((err)=>{
                console.log(err)
            })
            setExpand(true)
        }
    }
    function close() {
        localStorage.setItem("applock", "true")
        setLock(true)
    }
  return (
    <header className="space-b">
        <div className="col center" style={{gap:"15px"}}>
            <IoMdMenu className="header-btn" onClick={()=>setNavState(!navState)}/>
            <div className="search-box">
                <input type="text" placeholder='Search'/>
                <FiSearch/>
            </div>
        </div>
        
        <div className="col center">
            <div className="header-btn" onClick={expandWindow}>
                {expand ?<IoMdContract/>:<IoMdExpand /> }
            </div>
            <div className={`drop-down-cont ${openMenu == "notification"? "open": ""}`}>
                <div className="notifi-btn center drop-down-btn" onClick={()=>{setopenMenu(openMenu == "notification"?"":"notification")}}>
                    <div className="count">0</div>
                    <IoIosNotificationsOutline/>
                </div>
                <div className="drop-down">
                    <p>Notifications</p>
                    <div className="item f-start"><HiUserCircle/> Profile</div>
                    <div className="item f-start"><AiOutlineMessage /> messages</div>
                    <div className="item f-start"><BiTask/> Taskboard</div>
                     <div className="br"></div>
                    <div className="item f-start"><FiSettings/> Settings</div>
                    <div className="item f-start"><AiOutlineLock/> Lock screen</div>
                    <div className="item f-start"><AiOutlineLogout/> Logout</div>

                </div>
            </div>
            <div className={`drop-down-cont ${openMenu == "profile"? "open": ""}`}>
                <div className="user center drop-down-btn" onClick={()=>{setopenMenu( openMenu == "profile"? "":"profile")}}>
                    <img className="c-img" src={user?.photoURL} alt="" />
                    <h4>hi Ouner</h4>
                    <IoIosArrowDown/>
                </div>
                <div className="drop-down">
                    <p>welcom {user?.displayName}</p>
                    <div className="item f-start"><HiUserCircle/> Profile</div>
                    <div className="item f-start"><AiOutlineMessage /> messages</div>
                    <div className="item f-start"><BiTask/> Taskboard</div>
                     <div className="br"></div>
                    <div className="item f-start"><FiSettings/> Settings</div>
                    <div className="item f-start" onClick={close}><AiOutlineLock/> Lock screen</div>
                    <div className="item f-start"><AiOutlineLogout/> Logout</div>

                </div>
            </div>
            
        </div>
    </header>
  )
}
