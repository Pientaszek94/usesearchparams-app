import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from "axios"
import { ProductModal } from '../components';


export interface Product{
    id: number;
    color: string;
    name: string;
    pantone_value: string;
    year: number
}

export interface Data{
    page: number;
    per_page:number;
    total:number;
    total_pages:number;
    data:[Product];
    support: any;
}

export interface ProductId{
    data:{
        id: number;
        color: string;
        name: string;
        pantone_value: string;
        year: number
    };
    support:any;
}

function Home() {

const [searchParams, setSearchParams]=useSearchParams();
const [products, setProducts] = useState<Data|undefined>()
const [searchedProduct, setSearchedProduct] = useState<ProductId|undefined>();
const [filter, setFilter] = useState<string|null>("")
const [selectedId, setSelectedId] = useState<string>("")
const [error, setError] = useState()
const per_page=5;


const page=searchParams.get("page")


useEffect( ()=>{
    
    if(filter!==""){
        axios.get(`https://reqres.in/api/products?id=${filter}`)
        .then((res)=>{
            setError(undefined)

            setSearchedProduct(res.data)

            setProducts(undefined) 
            })
            .catch((error)=>{
                setError(error.response.status)
            })
        }
        else{  
            axios.get(`https://reqres.in/api/products?page=${page}&per_page=${per_page}`)
            .then((res)=>{
                setError(undefined)

                setSearchedProduct(undefined)

                setProducts(res.data)
            
            })
            .catch((error)=>{
                setProducts(undefined)
                setError(error.message)
            })
        }

        },[searchParams, filter, page, per_page])
        

// Functtion that jumps into previous page of catalog
const onPrevious=()=>{

    let currentPage=searchParams.toString().match(/\d+/g);

    if(Number(currentPage)>1){ 
        let    prevPage=Number(currentPage)-1
        setSearchParams({...searchParams, page: prevPage.toString()})
    }
}
// Functtion that jumps into next page of catalog
const onNext=(numOfPages:any)=>{

    if(products){

        if(searchParams.toString()===''){

            setSearchParams({page:"2"})
        }else{
            let currentPage=searchParams.toString().match(/\d+/g);
            
            if(Number(currentPage)<numOfPages){
                
                let    nextPage=Number(currentPage)+1
                setSearchParams({...searchParams, page: nextPage.toString()})
            }
        }
    }
}

// buttons in Pagination below the Table
const Pages=(num:number|undefined)=>{

    let buttonArray=[];

    if(num){
        for(let i=1; i<=num;i++){
            buttonArray.push(<button key={i} 
                                value={i} className={`${Number(page)===i?"shadow-inner bg-gray-300 font-bold":"lightgray"} button`} 
                                onClick={(e)=>setSearchParams({page: e.currentTarget.value})}>{i}</button>);
        }
    }
    return (<div className='m-4 flex flex-row justify-between items-center w-10/12 md:w-1/3 lg:w-1/4'> 
                <button className='button lightgray' onClick={()=>onPrevious()}>Previous</button>
                    {buttonArray}
                <button className='button lightgray' onClick={()=>onNext(products?.total_pages)}>Next</button>
            </div>)
}

// returned JSX 
return (
    <div className='container m-auto mt-0 centred-col w-full relative z-10'>
        {
            selectedId!==""?(
                            <ProductModal selectedId={selectedId} setSelectedId={setSelectedId}/>
                            ):null
        }
        <div className={`shadow-lg rounded-lg h-fit ${filter!==""?"p-2 w-full md:w-1/2":"w-fit"}  
                 centred-col m-2`}>

            <input type="number" className={`text-center ${filter!==""?"mb-4":""} rounded-lg focus:shadow-none shadow-lg w-44`} min='1' step="1" pattern='\d*'
                name="id" id="id" onBlur={()=>setFilter('')} onChange={(e)=>setFilter(e.currentTarget.value)} placeholder="Product id" />
            
                {
                    error===undefined?searchedProduct!==undefined?(
                        <div className='w-full centred-col'>
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Year</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='text-white' style={{backgroundColor:`${searchedProduct.data.color}`}}>
                                        <td>
                                            {searchedProduct.data.id}
                                        </td>
                                        <td className='cursor-pointer'>
                                            {searchedProduct.data.name}
                                        </td>
                                        <td>
                                            {searchedProduct.data.year}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        ):null:(
                            <div className='flex flex-col justify-center items-center'>
                            {
                                Number(error)?(
                                    <h1>Product with id "{filter}" doesn't exist!</h1>
                                    )
                                    :(
                                        <h1>Sorry but something went wrong</h1>
                                        )
                                    }
                        </div>
                    )
                }
               
        </div>
        <div className='h-min w-full centred-col'>
            {
                products!==undefined? (
                    <div className='w-full md:w-1/2 '>
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Year</th>
                                </tr>
                            </tbody>
                            <tbody>

                                {
                                    products?.data.map((product:Product)=>(
                                        <tr key={product.id} onClick={()=>setSelectedId(product.id.toString())} className="text-white" style={{backgroundColor:`${product.color}`}}>
                                        <td>{product.id}</td>
                                        <td className=' font-semibold'>{product.name}</td>
                                        <td>{product.year}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <h1>Select your color and have a look at it</h1>
                    </div>

                ):null
            }
            {
                // Function that returns array of buttons 
                products!==undefined?Pages(products?.total_pages):null
            }

        </div>
            


    </div>
  )
}

export default Home