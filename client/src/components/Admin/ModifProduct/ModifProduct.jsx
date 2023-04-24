import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useHistory } from "react-router-dom";



export default function ModifProduct() {

const history = useHistory()


    const {id}= useParams();

    const [ name, setName]= useState("");
    const [description, setDescription]=useState("");
    const [ price, setPrice]= useState("");
    const [ stock, setStock]= useState("");
    const [ image, setImage]= useState("");
    const [ year, setYear]= useState("")

    const update= async(e)=>{
        e.preventDefault()
        await axios.put('http://localhost:3001/Products/'+ id, {
            name: name,
            description: description,
            price: price,
            stock: stock,
            image: image,
            year: year

        });
        history.push("/admin-product")
   }

   const getById= async(id)=>{
    const res= await axios.get('http://localhost:3001/products/'+ id)
    setName(res.data.name)
    setDescription(res.data.description)
    setPrice(res.data.price)
    setStock(res.data.stock)
    setImage(res.data.image)
    setYear(res.data.year)
}

useEffect(()=>{
    getById()
},[])

  return (
    <div>
            <h2>Actualizar producto</h2>

<div>
    <form onSubmit={(e)=> update(e)}>
        
        <div>
            <label>Name</label>
            <input 
                type="text"
                value={name}
                name="name"
                onChange={ (e)=> setName(e.target.value)}
                
            />
        </div>
        <div>
            <label>Description</label>
            <input 
                type="text"
                value={description}
                name="description"
                onChange={ (e)=> setDescription(e.target.value)}
            />
        </div>
        <div>
            <label>Price</label>
            <input 
                type="number"
                value={price}
                name="price"
                onChange={(e)=> setPrice(e.target.value)}
              
            />
        </div>
        <div>
            <label>Stock</label>
            <input 
                type="number"
                value={stock}
                name="stock"
                onChange={(e)=> setStock(e.target.value)}
              
            />
        </div>
        <div>
            <label>Image</label>
            <input 
                type="text"
                value={image}
                name="image"
                onChange={(e)=> setImage(e.target.value)}
              
            />
        </div>
        <div>
            <label>Year</label>
            <input 
                type="number"
                value={year}
                name="year"
                onChange={(e)=> setYear(e.target.value)}
              
            />
        </div>
        <button type='submit'>Enviar</button>
    </form>
</div>
        </div>
  )
}