import React, { Component } from 'react';
import './Pilihan.css'
import Logo from './../../Assets/newbggw.png'
import {BsBackspaceFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Login from './../../Assets/login3.png'
import Register from './../../Assets/register.png'
import {connect} from 'react-redux';

function Pilihan(props){

    return (
        <>
                 <div className="outer-login">
                <div className="big-outer-pilihan">
                    <div className="pilihan-login">
                        <Link to ='/' style={{textDecoration:'none'}}>
                            <BsBackspaceFill size={40}/>
                        </Link>
                        <div className="header-logo-login">
                            <img src={Logo} className="logo-login"></img>
                            <p className="logo-name">GorillaDoc</p>
                        </div>
                        <div>

                        </div>
                                 
                    </div>

                    <div className="login-search">
                        {
                            props.isLogin ?
                        <Link to='/' style={{textDecoration:'none'}}>
                            <div className="box-pilihan">
                                <img src={Login} style={{width:'100px',height:'100px'}}/>
                                <p>Login</p>
                            </div>
                        </Link>
                        :
                        <Link to='/login' style={{textDecoration:'none'}}>
                            <div className="box-pilihan">
                                <img src={Login} style={{width:'100px',height:'100px'}}/>
                                <p>Login</p>
                            </div>
                        </Link>

                        }
                        <Link to='/register' style={{textDecoration:'none'}}>
                            <div className="box-pilihan">
                                <img src={Login} style={{width:'100px',height:'100px'}}/>
                                <p>Register</p>
                            </div>
                        </Link>
                        
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

export default (connect(Mapstatetoprops,{})(Pilihan))