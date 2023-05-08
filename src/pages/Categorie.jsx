import React, { useState, useEffect, useContext } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TiPlus } from 'react-icons/ti';

import { AdminContext } from '../AdminContext';
function Categorie() {
    const {setOpenCatForm, categories} = useContext(AdminContext)
  return (
    <section className="cats">
        {categories.map(item=>(
            <div className="box space-b" key={item.id} onClick={()=>{setOpenCatForm({open:true, item})}}>
                <h1>{item.cat}</h1>
                <div className='center'><AiOutlinePlus/> {item.count}</div>
            </div>
        ))}
        <div className="add-btn center">
            <TiPlus/>
        </div>
    </section>
  )
}

export default Categorie