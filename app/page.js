"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, query, onSnapshot,doc, deleteDoc  } from "firebase/firestore"; 
import { db } from './firebase';

export default function Home() {
  const [items,setItems]=useState(
    []
    )
    
    const [total,setTotal]=useState([])
    const [newItem,setNewItem]=useState({name:"",price:""})
    
    const addItem=async(e)=>{
      e.preventDefault()
      if(newItem.name!==""&&newItem.price!==""){
        await addDoc(collection(db, "items"),{
          name:newItem.name.trim(),
          price:newItem.price.trim(),
        })
        setNewItem({name:"",price:""})
      }
      
      
    }
    useEffect(()=>{
      const q=query(collection(db, "items"))
      const unsubscribe=onSnapshot(q,(querySnapshot)=>{
        let itemsArr=[]
        querySnapshot.forEach((doc)=>{
          itemsArr.push({...doc.data(),id:doc.id})
        })
        
        setItems(itemsArr)
        const calculateTotal=()=>{
          const totalPrice=itemsArr.reduce((sum,currentVal)=>sum+parseInt(currentVal.price),0)
          setTotal(totalPrice)
        }
        calculateTotal()
        return ()=>unsubscribe()
        
      })

    },[])
    
    const deleteItem=async(id)=>{
      await deleteDoc(doc(db, "items", id));
    }
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.subContainer}>
        <form >
          <input className={styles.input} value={newItem.name} onChange={e=>(setNewItem({...newItem,name:e.target.value}))} placeholder='' type='text'/>
          <input className={styles.input} value={newItem.price} onChange={e=>(setNewItem({...newItem,price:e.target.value}))} placeholder='Price' type="text"/>
          <button className={styles.button} onClick={addItem}  type='submit'>+</button>
        </form>
        <div className={styles.itemContainer}>
        {items.map((item,index)=>(
          <div key={index} className={styles.item}>
          <span>{item.name}</span>
          <span>{item.price}</span>
          <div onClick={()=>{deleteItem(item.id)}} className={styles.crossButton}>X</div>
          </div>
        )
          
        )}
        </div>
        
          {
            items.length<1?<div></div>:<div className={styles.totalContainer}>
              <span>Total</span>
              <span>${total}</span>
            </div>
          }
        
        
      </div>
    </div>
  )
}
