import axios from "axios";
import { useEffect, useState } from "react";

export function CustList(){
    const [list,setList] = useState([]);
    useEffect(()=>{
        axios.get().then((response)=>{
            setList(response.customers);
        }).catch((err)=>{
            alert(err);
        })
    },[list])

    return <div>
        {list.map((customer)=>{
            return<div>
                <div>{customer.slot_no}</div>
                <div>{customer.owner}</div>
                <div>{customer.veh_no}</div>
                <div>{customer.contact}</div>
                <button onClick={()=>{}}>Ticket</button>
            </div>
        })}
    </div>
}