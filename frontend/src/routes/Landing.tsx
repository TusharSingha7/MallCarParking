import {useNavigate} from "react-router-dom"
import React from "react"
import { Button } from "../components/Button"
function Landing(){
    const navigate = useNavigate();
    return <div>
        <Button title={"ADD"} click={()=>{
            navigate('/addCustomer')
        }}/>
        <Button title={"Fetch"} click={()=>{
            navigate('/parked')
        }}/>
        <Button title={"Add Space and Vehicle Config"} click={()=>{
            navigate('/addSpace')
        }}/>
    </div>
}