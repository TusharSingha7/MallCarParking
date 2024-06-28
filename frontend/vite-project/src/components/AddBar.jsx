import React from "react"
import { useState } from "react"
export function AddBar(){
    const [name,setName] = useState("");
    const [veh_no,setNo] = useState("");
    const [contact,setContact] = useState(0);
    return <div className="AddBar">
        <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
        <input type="text" placeholder="vehNO" onChange={(e)=>{setNo(e.target.value)}}/>
        <input type="text" placeholder="contact" onChange={(e)=>{setContact(e.target.value)}}/>
    </div>
}