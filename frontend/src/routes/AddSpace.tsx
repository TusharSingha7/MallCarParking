import { useState } from "react"
import React from "react";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
function AddParkSpace(){
    const [slot,setSlot] = useState<string>("");
    const [veh_ty,setType] = useState<string>("");
    const [vehc,setCharge] = useState<Number>(0);
    return <div>
        <InputBox title={"Enter Slot Number"} change={(e)=>{
            setSlot(e.target.value);
        }} />
        <Button title={"Add Space"} click={ async ()=>{
            const res = await axios.post("",{
                slot_no : slot
            });
            alert(res);
        }}/>
        <InputBox title={"Enter Vehicle Type"} change={(e)=>{
            setSlot(e.target.value);
        }} />
        <InputBox title={"Enter Vehicle Charge"} change={(e)=>{
            setSlot(e.target.value);
        }} />
        <Button title={"Add Vechile Config"} click={ async ()=>{
            if(vehc == 0){
                alert("enter valid charges");
            }
            else {
                const res = await axios.post("",{
                    type : veh_ty,
                    charge : vehc
                });
                alert(res);
            }
        }}/>
    </div>
}