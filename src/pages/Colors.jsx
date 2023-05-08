import React, { useState , useEffect} from 'react'
import { TiPlus } from 'react-icons/ti';
import { db } from "../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
function Colors() {
    const [colors, setColors]= useState([])
    useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        const list = [];
        
        querySnapshot.forEach((doc) => {
            if(!list.includes(doc.data().color)) {
                list.push(doc.data().color);
            }
          
        });
        
        setColors(list);
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
    <section className="cats">
        {colors.map((item, index)=>(
            <div className="box space-b" key={index} style={{background:item}}>
                <p>{item}</p>
            </div>
        ))}
        
    </section>
  )
}

export default Colors