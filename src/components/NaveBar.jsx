import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";
import { HiOutlineClipboardList } from "react-icons/hi";

import { MdOutlineCategory, MdOutlineChair, MdRoom } from "react-icons/md";
import { TbSofa, TbUsers} from "react-icons/tb";

import { GoCalendar } from "react-icons/go";
import { BiColorFill} from "react-icons/bi";
import { FiEdit} from "react-icons/fi";

import { IoIosAdd , IoIosArrowDown} from 'react-icons/io'
import { BsBoxSeam, BsEnvelope , BsKanban} from "react-icons/bs";
import { AdminContext } from "../AdminContext";
export default function NaveBar({setNavState}) {
  const { setOpenCatForm, setOpenProForm, setOpenRoomForm} = useContext(AdminContext)
  const [openAdd, setOpenAdd]=useState(false)
  return (
    <>
    <div className="overlay nav_overlay" onClick={()=>{setNavState(false)}}></div>
    <nav className={`nav-bar `}>
      
        <NavLink className="logo f-start" to={"/"}>
          <MdOutlineChair/>
          <span>Rahti Shope</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/daxboard"}>
        <CiGrid42/>
          <span>Daxboard</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/orders"}>
          <HiOutlineClipboardList/>
          <span>Orders</span>
        </NavLink>
        <NavLink className="nav-link f-start"  to={"/products"}>
          <BsBoxSeam/>
          <span>Products</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/categorie"}>
          <MdOutlineCategory />
          <span>categories</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/rooms"}>
          <MdRoom />
          <span>Rooms</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/colors"}>
          <BiColorFill/>
          <span>Colors</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/users"}>
          <TbUsers/>
          <span>Users</span>
        </NavLink>
        <div className={`drop-down-cont ${openAdd ? "open":""}`}>
          <div className="nav-link f-start" onClick={()=>{setOpenAdd(!openAdd)}}>
              
              <IoIosAdd/>
              <span className="space-b">Add <IoIosArrowDown className="arrow"/></span>
              
              
            </div>
          <div className="drop-down">
            <div className="nav-link f-start" onClick={()=>setOpenProForm({open:true, item:null})}>
              product
            </div>
            <div className="nav-link f-start" onClick={()=>setOpenCatForm({open:true, item:null})}>
              categorie
            </div>
            <div className="nav-link f-start" onClick={()=>setOpenRoomForm({open:true, item:null})}>
              room
            </div>
           
          </div>
        </div>
        
        <p>Apps</p>
        <NavLink className="nav-link f-start" to={"/calendar"}>
          <GoCalendar />
          <span>Calendar</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/kanban"}>
          <BsKanban />
          <span>kanban</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/editor"}>
          <FiEdit  />
          <span>editor</span>
        </NavLink>
        <NavLink className="nav-link f-start" to={"/messages"}>
          <BsEnvelope />
          <span>Messages</span>
        </NavLink>
        
    </nav>
  </>
  );
}
