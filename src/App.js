import React,{useEffect,useState} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import {toast} from 'react-toastify'  
import 'react-toastify/dist/ReactToastify.css' 
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Pilihan from './Pages/Pilihan/Pilihan'
import Register from './Pages/Register/Register'
import Axios from 'axios'
import {API_URL} from './Helpers/apiUrl'
import { LoginFunc } from './redux/Actions'
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux'
import {LoginThunk} from './redux/Actions'
function App(props) {
  const dispatch = useDispatch()

  toast.configure()

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    var id = localStorage.getItem('id')
    if(id){
      Axios.get(`${API_URL}/user/${id}`)
      .then((res)=>{
        console.log(res.data)
        console.log(res.data.email)
        dispatch(LoginThunk(res.data.email,res.data.password))
        console.log(props.isLogin, ' ini line 33 app js')
        console.log('props login func jalan')
        
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })

    }else {
      setLoading(false)
    }
  },[])

  if(loading){
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
            {/* {FullPageLoading(loading,100,'#0095DA')} */}
            <p>Loading</p>
        </div>
    )
  }


  return (
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/pilihan' component={Pilihan}/>
      <Route exact path='/register' component={Register}/>
    </Switch>
  );
}

const Mapstatetoprops=({Auth})=>{
  return {
    ...Auth
  }
}

export default connect(Mapstatetoprops,{LoginFunc})(App);
