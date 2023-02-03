import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ProductId } from '../pages/Home';
export interface Props{
    selectedId: string;
    setSelectedId:React.Dispatch<React.SetStateAction<string>>;
}

function ProductModal({selectedId, setSelectedId}:Props) {

const [product, setProduct] = useState<ProductId|undefined>()

useEffect(()=>{
    axios.get(`https://reqres.in/api/products?id=${selectedId}`)
    .then((res)=>{
        setProduct(res.data)
        })
        .catch((error)=>{
            console.log("Error modal", error.message)
        })
},[selectedId])


  return (
    <div className='z-20 absolute top-0 w-screen h-screen bg-blue-200/75 backdrop-blur-sm centred-col'>
        <div className='bg-white rounded-lg w-80 h-fit relative p-2'>
            
            <button onClick={()=>setSelectedId("")} 
            className='absolute top-0 right-0 m-2 px-2 text-blue-300 font-semibold rounded-lg border-2'>Close</button>

            <div className='centred-col w-full mt-6'>
                <h1 className='font-semibold text-2xl'>{product?.data.name}</h1>
                <table className='w-full'>
                    <tbody>
                        <tr>
                            <th>Id:</th>
                            <td>{product?.data.id}</td>
                        </tr>
                        <tr>
                            <th>Pantone value:</th>
                            <td className='cursor-pointer centered-col text-white select-all' style={{backgroundColor:`${product?.data.color}`}}>{product?.data.pantone_value}</td>
                        </tr>
                        <tr>
                            <th>Year:</th>
                            <td>{product?.data.year}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ProductModal