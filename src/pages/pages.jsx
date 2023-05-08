import React from 'react'
import Daxboard from "./Daxboard";
import Orders from "./Orders";
import { Route, Routes } from "react-router-dom";
import Product from './Product';
import Categorie from './Categorie';
import Colors from './Colors';

import Messages from './Messages';
import Login from './Login';
import LockScreen from './LockScreen';
import Rooms from './Rooms';
import Editor from './Editor';
import Kanban from './Kanban';
export default function pages() {
  return (
    <Routes>
      <Route  path="/" element={<Daxboard />} />
      <Route  path="/daxboard" element={<Daxboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Product />} />
 
      <Route path="/categorie" element={<Categorie />} />
      <Route path="/rooms" element={<Rooms />} />
      {/* <Route path="/calendar" element={<MyCalendar />} /> */}
      <Route path="/messages" element={<Messages/>} />
      {/* <Route path="/editor" element={< Editor/>} /> */}
      {/* <Route path="/kanban" element={< Kanban/>} /> */}
 
      <Route path="/Login" element={< Login/>} />
    </Routes>
  );
}
