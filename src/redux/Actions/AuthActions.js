import Axios from 'axios'
import {API_URL} from './../../Helpers/apiUrl'
import Swal from 'sweetalert2'
import  { Redirect } from 'react-router-dom'
export const LoginFunc =(dataUsers)=>{
    console.log('login func jalan')
    return {
        type:'LOGIN',
        dataUsers:dataUsers
        
    }
}

export const LogoutFunc=()=>{
    return {
        type:'LOGOUT'
    }
}



export const LoginThunk=(data1,data2)=>{
    const Swal = require('sweetalert2')
    

    return (dispatch)=>{
        console.log('login thunk jalan')
        console.log(data1,' ini bisa email / hp')
        console.log(data2,' ini password')

        Axios.get(`${API_URL}/user`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].id)
            var listUser = res.data
            var filterUser = listUser.filter((val,index)=>{
                console.log(val)
                if(data1 === val.email || data1 === val.phone_number && data2 === val.password){
                    // console.log(val)
                    console.log('berhasil login')
                    return val
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong Password/Email',
                        text: 'Check Kembali Data Anda'                    
                    })  
                }
                return val
            })
            Swal.fire({
                icon: 'success',
                title: `Selamat Datang`,
                text: `${res.data[0].nama}`                   
            })  

            // var dataLocalStorage =[res.data[0].id, res.data[0].nama]
            // localStorage.setItem('id',JSON.stringify(dataLocalStorage))
            
            localStorage.setItem('id',res.data[0].id)
            dispatch({type:'LOGIN',dataUsers:res.data})
            return <Redirect to='/' />
            

            console.log(filterUser)
        }).catch((err)=>{
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Wrong Password/Email',
                text: 'Check Kembali Data Anda'                    
            })  
        })


    }
}