import React, { useEffect, useState } from "react";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
function AddCustomer(){
    const [veh_list,setList] = useState<string[]>([]);
    useEffect(()=>{
        axios.get("").then((response)=>{
            setList([...veh_list,response.data]);
        });
    },[veh_list]);
    const [veh,setVeh] = useState<string>("none");
    const [owner,setOwner] = useState<string>("none");
    const [contact,setContact] = useState<string>("none");
    const [veh_no,setNo] = useState<string>("none");
    return <div>
        <InputBox title={"owner"} change={(e)=>{
            setOwner(e.target.value);
        }}/>
        <InputBox title={"Contact"} change={(e)=>{
            setContact(e.target.value);
        }}/>
        <InputBox title={"Registration Number"} change={(e)=>{
            setNo(e.target.value);
        }}/>
        <div>
            {veh_list.map((vehicle)=>{
                return <Button title={vehicle} click={()=>{
                    setVeh(vehicle);
                }}/>
            })}
        </div>
        <Button title={"ADD"} click={async ()=>{
            const response = await axios.get("");
            const slot_no = response.data.slot_no;
            const entry_time = new Date().toString();
            const res = await axios.post("",{
                entry_time: entry_time,
                veh_no: veh_no,
                owner : owner,
                contact : contact,
                slot_no : slot_no,
                veh_type : veh
            });
            alert(res.data.msg);
        }}/>
    </div>
}