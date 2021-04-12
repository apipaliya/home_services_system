import React, { useState } from "react"
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import NavBar from '../Navbar'
import Footer from "../Footer";

const Signup =() => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPasword] = useState("")
    const [mobile,setMobile] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    
    const PostData =() => {
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                mobile,
                state,
                city
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    

    return(
        <>
        <NavBar/>
        <div className="mycard">
          <div className="card auth-card input-field">
            <h4 className="bold">Helping Hands At Home</h4>
            <hr/>
            <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <input
            type="Number"
            placeholder="Mobile No."
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            />
            <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e)=>setState(e.target.value)}
            />
            <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1 signup-button"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/login">Already have an account ?</Link>
            </h5>
    
        </div>
      </div>
     
      </>
    )
}

export default Signup