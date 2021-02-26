import React, { Component ,useEffect,useState} from 'react';
import './Home.css'
import '../../style/Global.css'
import Logo from './../../Assets/newbggw.png'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import gambar1 from './../../Assets/Parcel Minuman/abcsquash13k.jpg'
import gambar2 from './../../Assets/Parcel Minuman/buavitajambu7k.jpg'
import gambar3 from './../../Assets/Parcel Minuman/buavitalychee7k.jpg'
import gambar4 from './../../Assets/Parcel Minuman/buavitamangga7k.jpg'
import gambar5 from './../../Assets/Parcel Minuman/chacha6k.jpg'
// import dataDB from './../../Json/listData.json'
import { TiDelete } from "react-icons/ti";
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../Helpers/apiUrl';
import { connect } from "react-redux";
import {useDispatch} from 'react-redux'
import {LogoutFunc} from './../../redux/Actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {AiOutlinePlusSquare} from 'react-icons/ai'
import {GrEdit} from 'react-icons/gr'
import Axios from 'axios';
function Home(props){
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()
    const [listData,setListData]=useState([])
    const [modalTambah,setModalTambah]=useState(false)
    const [modalUpdate,setModalUpdate]=useState(false)
    const [indexUpdate,setIndexUpdate]=useState(0)

    const [modalArr,setModalArr]=useState({
        nama_product:'',
        SKU:'',
        price:0,
        url:null,
        isdeleted:0,
        quantity:0
    })

    const [isModalArr,setIsModalArr]=useState({
        nama_product:false,
        SKU:false,
        price:false,
        url:false,
        quantity:false
    })

    const [modalUpdateArr,setModalUpdateArr]= useState({
        nama_product:'',
        SKU:'',
        price:0,
        url:null,
        isdeleted:0,
        quantity:0
    })

    const [isModalUpdateArr,setIsModalUpdateArr] = useState({
        nama_product:false,
        SKU:false,
        price:false,
        url:false,
        quantity:false
    })



    const fetch=()=>{
        axios.get(`${API_URL}/item`)
        .then((res)=>{
            // console.log(props.isLogin)
            // console.log(props.dataUsers)
            console.log(res.data)
            setListData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
       fetch()
     
    },[])


    const onDelete=(index)=>{
        console.log(index)

        Axios.get(`${API_URL}/item/${index}`)
        .then((res)=>{
            console.log(res.data, ' line 70', index)
        }).catch((err)=>{
            console.log(err)
        })

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${API_URL}/item/${index}`,{
                    isdeleted:1
                }).then((res)=>{
                    fetch()
                }).catch((err)=>{
        
                })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
       
    }

    const onLogout=()=>{
        localStorage.removeItem('id')
        dispatch(LogoutFunc())
    }

    const onUpdate=(index)=>{
        console.log(index, ' line 126')
        Axios.get(`${API_URL}/item/${index}`)
        .then((res)=>{
            console.log(res.data,' 129')
            setModalUpdateArr({
                nama_product:res.data.nama_product,
                SKU:res.data.SKU,
                price:res.data.price,
                url:res.data.url,
                quantity:res.data.quantity
            })
            setIndexUpdate(index)
            console.log(modalUpdateArr)
            setModalUpdate(true)
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    const renderDataItem=()=>{
        // var item = dataDB
        var listDataItem= listData
        return listDataItem.map((val,index)=>{
            if(val.isdeleted == 0){
                return (
                <div className="box-item" key={index+1}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingLeft:5,paddingRight:5}}>
                        {
                            props.isLogin?
                            <>
                                <GrEdit className="delete" size={20} onClick={()=>onUpdate(val.id)}/>
                                <TiDelete className="delete" size={30} onClick={()=>onDelete(val.id)}/>
                            </>
                            :
                            null
                        }

                    </div>
                    <img src={val.url} className="data-item"/>
                    <div className="box-description">
                            <p className="sku-code">SKU:{val.SKU}</p>
                            <p className="product-name">{val.nama_product}</p>
                        <div className="price-description">
                            <p className="price-name">Rp.{val.price}</p>
                            <p className="stock-item">Stock:{val.quantity}</p>
                        </div>
                    </div>
    
                </div>
    
                )
            }
           
        })
    }
 
 
    const onSearch=debounce(function(e){
        if(e.target.value){
            console.log(e.target.value)
            filterSearch(e.target.value)
        }else if(e.target.value == ''){
            fetch()
        }
    },1000)
    
    const filterSearch=(input)=>{
        var filterdata = listData.filter((val)=>{
            // return val.nama_product.toLowerCase() === input.toLowerCase()
            return val.nama_product.toLowerCase().includes(input.toLowerCase())
        })
        console.log(filterdata)
        setListData(filterdata)
    }

    
    const onTambah=()=>{
        setModalTambah(true)
    }

    const onSave=()=>{
        if(isModalArr.SKU && isModalArr.nama_product && isModalArr.quantity && isModalArr.url && isModalArr.price){
            Axios.get(`${API_URL}/item`)
            .then((res)=>{
                console.log(res.data)
                var filterData = listData.filter((val,index)=>{
                    if(val.SKU === modalArr.SKU){
                        return   Swal.fire({
                            title: 'Error!',
                            text: 'SKU Number Already Used!',
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                          })
                    }
                })
                if(filterData.length === 0){
                    Axios.post(`${API_URL}/item`,{
                        ...modalArr,isdeleted:0
                    }).then((res)=>{
                        fetch()
                        console.log(res.data)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            Swal.fire({
                title: 'Error!',
                text: 'Check Your Data',
                icon: 'error',
                confirmButtonText: 'Try Again'
              })
        }
        setModalTambah(false)
    }
    const onSaveUpdate=()=>{    
        if(isModalUpdateArr.SKU && isModalUpdateArr.nama_product && isModalUpdateArr.quantity && isModalUpdateArr.url && isModalUpdateArr.price){
            console.log('berhasil update data line 246')
            Axios.get(`${API_URL}/item/${indexUpdate}`)
            .then((res)=>{
                console.log(res.data)
                Axios.patch(`${API_URL}/item/${indexUpdate}`,{
                    ...modalUpdateArr,isdeleted:0
                }).then((res)=>{
                    fetch()
                }).catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            console.log('254')
            Swal.fire({
                title: 'Error!',
                text: 'Check Your Data',
                icon: 'error',
                confirmButtonText: 'Try Again'
              })
        }
        
        setModalUpdate(false)
    }

    const toggle=()=>setModalTambah(false)
    const toggleUpdate=()=>setModalUpdate(false)

    const onTambahNama=(namaProduct)=>{
        console.log('tambah nama jalan')
        console.log(namaProduct)
        let withoutspace = namaProduct.replace(/ /g,'')
        var nameWithoutSpace = withoutspace.length
        // console.log(length)
        if(nameWithoutSpace >3 && nameWithoutSpace <50){
            setModalArr({...modalArr,nama_product:namaProduct})
            setIsModalArr({...isModalArr,nama_product:true})
            console.log('NAMA TRUE')
        }else if(nameWithoutSpace === 0){
            setIsModalArr({...isModalArr,nama_product:false})
        }else if (nameWithoutSpace <3){

            console.log('masuk ke kosong')
            setIsModalArr({...isModalArr,nama_product:false})
        }
    }

    const onTambahSku=(noSku)=>{
        console.log('tambah sku jalan')
        if(noSku.length <= 10){
            setModalArr({...modalArr,SKU:noSku})
            setIsModalArr({...isModalArr,SKU:true})
        }else {
            setIsModalArr({...isModalArr,SKU:false})
        }
    }
    const onTambahQuantity=(quantity)=>{
        console.log('tambahquantity')
        if(quantity >1 && quantity <=1000){
            setModalArr({...modalArr,quantity:quantity})
            setIsModalArr({...isModalArr,quantity:true})
        }else {
            setIsModalArr({...isModalArr,quantity:false})
        }
    }
    const onTambahPrice=(price)=>{
        console.log('tambah price')
        if(price >1000){
            setModalArr({...modalArr,price:price})
            setIsModalArr({...isModalArr,price:true})
        }else {
            setIsModalArr({...isModalArr,price:false})
        }
    }
    const onTambahGambar=(e)=>{
        console.log(e.target.files[0].name)
        var test = URL.createObjectURL(e.target.files[0])
        console.log(test)
        if(e.target.files[0]){
            console.log('masuk ke if 339')
            setModalArr({...modalArr,url:test})
            setIsModalArr({...isModalArr,url:true})
        }else {
            console.log('masuk ke if 343')
            setModalArr({...modalArr,url:null})
            setIsModalArr({...isModalArr,url:false})
        }
        
    }

    // BATAS MODAL UPDATE
    const onUpdateNama=(namaProduct)=>{
        console.log('tambah nama jalan')
        console.log(namaProduct)
        let withoutspace = namaProduct.replace(/ /g,'')
        var nameWithoutSpace = withoutspace.length
        // console.log(length)
        if(nameWithoutSpace >3 && nameWithoutSpace <50){
            setModalUpdateArr({...modalUpdateArr,nama_product:namaProduct})
            setIsModalUpdateArr({...isModalUpdateArr,nama_product:true})
            console.log('NAMA TRUE')
        }else if(nameWithoutSpace === 0){
            setIsModalUpdateArr({...isModalUpdateArr,nama_product:false})
        }else if (nameWithoutSpace <3){

            console.log('masuk ke kosong')
            setIsModalUpdateArr({...isModalUpdateArr,nama_product:false})
        }
    }
    const onUpdateSku=(noSku)=>{
        console.log('tambah sku jalan')
        if(noSku.length <= 10){
            setModalUpdateArr({...modalUpdateArr,SKU:noSku})
            setIsModalUpdateArr({...isModalUpdateArr,SKU:true})
        }else {
            setIsModalUpdateArr({...isModalUpdateArr,SKU:false})
        }
    }
    const onUpdateQuantity=(quantity)=>{
        console.log('tambahquantity')
        if(quantity >1 && quantity <=1000){
            setModalUpdateArr({...modalUpdateArr,quantity:quantity})
            setIsModalUpdateArr({...isModalUpdateArr,quantity:true})
        }else {
            setIsModalUpdateArr({...isModalUpdateArr,quantity:false})
        }
    }
    const onUpdatePrice=(price)=>{
        console.log('tambah price')
        if(price >1000){
            setModalUpdateArr({...modalUpdateArr,price:price})
            setIsModalUpdateArr({...isModalUpdateArr,price:true})
        }else {
            setIsModalUpdateArr({...isModalUpdateArr,price:false})
        }
    }
    const onUpdateGambar=(e)=>{
        console.log(e.target.files[0].name)
        var test = URL.createObjectURL(e.target.files[0])
        console.log(test)
        if(e.target.files[0]){
            setModalUpdateArr({...modalUpdateArr,url:test})
            setIsModalUpdateArr({...isModalUpdateArr,url:true})
        }else {
            setModalUpdateArr({...modalUpdateArr,url:''})
            setIsModalUpdateArr({...isModalUpdateArr,url:false})
        }
    }

    const onLogin=()=>{
        console.log('testing lgn')
    }
    return (
        <>
            <Modal isOpen={modalTambah} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Product</ModalHeader>
                <ModalBody>
                    <input className="input-data-modal" type='text' placeholder=' Name' onChange={(e)=>onTambahNama(e.target.value)}></input> 
                    <input className="input-data-modal" type='number' placeholder=' SKU Number' onChange={(e)=>onTambahSku(e.target.value)}></input> 
                    <input className="input-data-modal" type='text' placeholder=' Quantity' onChange={(e)=>onTambahQuantity(e.target.value)}></input> 
                    <input className="input-data-modal" type='text' placeholder=' Price' onChange={(e)=>onTambahPrice(e.target.value)}></input> 
                    <input className="input-data-modal" type='file' placeholder=' Price' onChange={onTambahGambar}></input> 
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={onSave}>Save</Button>
                        <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
                <ModalHeader toggle={toggleUpdate}>Update Product</ModalHeader>
                <ModalBody>
                    <input className="input-data-modal"  type='text' placeholder=' Name' onChange={(e)=>onUpdateNama(e.target.value)}></input> 
                    <input className="input-data-modal" type='number' placeholder=' SKU Number' onChange={(e)=>onUpdateSku(e.target.value)}></input> 
                    <input className="input-data-modal"  type='text' placeholder=' Quantity' onChange={(e)=>onUpdateQuantity(e.target.value)}></input> 
                    <input className="input-data-modal"  type='text' placeholder=' Price' onChange={(e)=>onUpdatePrice(e.target.value)}></input> 
                    <input className="input-data-modal"  type='file' placeholder=' Gambar' onChange={onUpdateGambar}></input> 
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={onSaveUpdate}>Save</Button>
                        <Button color="primary" onClick={toggleUpdate}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <div className="outer-home">
                <div className="big-outer-home">
                    <div className="header-home">
                        <div className="header-logo-home">
                            <img src={Logo} className="logo"></img>
                            <p className="logo-name">GorillaDoc</p>
                        </div>
                        <input className="search" type='text' placeholder='Search' onChange={(e)=>onSearch(e)}></input> 
                            {
                                props.isLogin?            
                                    <div  onClick={onLogout} className="btn-login">Logout</div> 
                                    :
                                    <Link to='/pilihan' style={{textDecoration:'none'}}>
                                        <div onClick={onLogin} className="btn-login">Login / Register</div>
                                    </Link>
                            }
                        </div>
                    {
                        props.isLogin?
                        <div className="option-box">
                            <AiOutlinePlusSquare size={30} className="icon-option" onClick={onTambah}/>
                        </div>
                        :
                        null
                    }

                    <div className="header-search">        
                        {renderDataItem()}
                    </div>

                </div>
            </div>

        </>
    )
}
const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default (connect(Mapstatetoprops,{})(Home))