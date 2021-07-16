import React, { Component,useState } from 'react';
import './Register.css'
import Logo from './../../Assets/newbggw.png'
import {BsBackspaceFill,BsPeopleCircle} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {BsPhone} from 'react-icons/bs'
import {HiOutlineMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import {API_URL} from '../../Helpers/apiUrl'
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2'
import Axios from 'axios';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux'
import {LoginThunk} from '../../redux/Actions'

function Register(props){
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const [namaLengkap,setNamaLengkap] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')

    const [isNamaLengkap,setIsNamaLengkap] = useState('')
    const [isEmail,setIsEmail] = useState(false)
    const [isPassword,setIsPassword] = useState(false)
    const [isPhoneNumber,setIsPhoneNumber] = useState(false)

    const onNama=(namaLengkap)=>{
        console.log(namaLengkap)
        let withoutspace = namaLengkap.replace(/ /g,'')
        var nameWithoutSpace = withoutspace.length
        // console.log(length)
        if(nameWithoutSpace >3 && nameWithoutSpace <50){
            setNamaLengkap(namaLengkap)
            setIsNamaLengkap(true)
            // setErrorName(false)
            console.log('NAMA TRUE')
        }else if(nameWithoutSpace === 0){
            // setErrorName(false)
            setIsNamaLengkap(false)
        }else if (nameWithoutSpace <3){

            console.log('masuk ke kosong')
            // setErrorName(true)
            setIsNamaLengkap(false)
        }
    }

    const onNumber=(number)=>{
        console.log(number)

        if(number.length > 10 && number.length<= 13){
            setPhoneNumber(number)
            setIsPhoneNumber(true)
        }else if (number.length >=14){
            Swal.fire({
                title: 'Error!',
                text: 'Phone Number Maximum 13 digit',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
              setPhoneNumber('')
              setIsPhoneNumber(false)
        }
      
    }
    const onEmail=debounce(function(email){
        console.log(email)
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
            console.log('EMAIL TRUE')
            setEmail(email)
            setIsEmail(true)
            // setErrorEmail(false)
                  
        }else {
            // setErrorEmail(true)
            Swal.fire({
                title: 'Error!',
                text: 'Check Your Email',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            setEmail('')
            setIsEmail(false)
            console.log('email salah')
        }
    },1000)

    const onPassword=debounce(function(password){
        console.log(password)
        let upperCaseLetters = /[A-Z]/g
        let numbers = /[0-9]/g;    
        if(password.match(upperCaseLetters) && password.match(numbers)){
            if(password.length >8 && password.length <=13){  
                console.log('masuk ke if pertama')          
                setPassword(password)
                setIsPassword(true)      
            }
        } else if (password === ''){
                setPassword('')
                setIsPassword(false)

        }else if (password.length >= 14){          
                Swal.fire({
                    title: 'Error!',
                    text: 'Password Lebih Dari 14 Digit',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
                setPassword('')
                setIsPassword(false)
        }else {
                console.log('masuk ke else')
                Swal.fire({
                    title: 'Error!',
                    text: 'Password harus ada Huruf Kapital Dan Angka',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
                  setPassword(password)
                  setIsPassword(false)
            }
    },1000)


    const onLogin=()=>{
        //  alert('login jalan')
         if(isNamaLengkap && isPassword && isEmail && isPhoneNumber){
            //  alert('berhasil Register')
            Axios.get(`${API_URL}/user`)
            .then((res)=>{
                console.log(res.data)
                var dataUser = res.data

                var filterUser = dataUser.filter((val,index)=>{
                    if (val.email === email || val.phone === phoneNumber){
                        Swal.fire({
                            title: 'Error!',
                            text: 'Email / Nomor Hp Sudah Terdaftar',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                          })
                    }
                    
                })
                if(filterUser.length === 0){
                    Axios.post(`${API_URL}/user`,{
                        nama:namaLengkap,
                        password:password,
                        email:email,
                        phone_number:phoneNumber
                    }).then((res)=>{
                        console.log('berhasil daftar')
                        console.log(res.data)
                        dispatch(LoginThunk(res.data.email,res.data.password))
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
                console.log(filterUser)
            }).catch((err)=>{
                console.log(err)
            })
         }else {
            Swal.fire({
                title: 'Error!',
                text: 'Check Your Data',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
         }
    }

    return (
        <>
            <div className="outer-login">
                <div className="big-outer-login">
                    <div className="header-login">
                        <Link to ='/' style={{textDecoration:'none'}}>
                            <BsBackspaceFill size={40}/>
                        </Link>
                        <div className="header-logo-login">
                            <img src={Logo} className="logo-login"></img>
                            <p className="logo-name">GorillaDoc</p>
                        </div>
                        {
                            props.isLogin?
                            <Link to='/' style={{textDecoration:'none'}}>
                                <div  className="btn-login">Login</div>
                            </Link>
                            :
                            <Link to='/login' style={{textDecoration:'none'}}>
                            <div  className="btn-login">Login</div>
                        </Link>

                        }
                    </div>
                    <div className="login-search">
                        <div className="login-box">
                            <p style={{fontSize:40,lineHeight:0}}>Register</p>
                            <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <BsPeopleCircle size={30}/>
                                <input className="input-data" type='text' placeholder=' Name' onChange={(e)=>onNama(e.target.value)}></input> 
                            </i>
                            <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <HiOutlineMail size={30}/>
                                <input className="input-data" type='text' placeholder=' Email' onChange={(e)=>onEmail(e.target.value)}></input> 
                            
                            </i>
                            <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <RiLockPasswordFill size={30}/>
                                <input className="input-data" type='password' placeholder=' Password' onChange={(e)=>onPassword(e.target.value)}></input> 
                            </i>
                            <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <BsPhone size={30}/>
                                <input className="input-data" type='number' placeholder=' Phone Number' onChange={(e)=>onNumber(e.target.value)}></input> 
                            </i>
                            <div className="login-btn" onClick={onLogin}>
                                <p>LOGIN</p>
                            </div>
                        </div>       
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
export default (connect(Mapstatetoprops,{LoginThunk})(Register))