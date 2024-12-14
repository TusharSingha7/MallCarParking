import React, { useEffect } from "react";
import { InputBox } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router";
function Generate(){
    //fetch the customer with vehno
    const navigate = useNavigate();
    const [cusList,setList] = useState([{
        entry_time: "12112121",
        veh_no: "121",
        owner : "none",
        contact : 12334567,
        slot_no : 12,
        veh_type : "car"
    }]);
    useEffect(()=>{
        axios.get("").then((response)=>{
            setList(response.data.customers);
        })
    },[cusList]);
    return <div>
        {cusList.map((customer)=>{
            return <div>
                {customer.veh_no}
                <div>
                    <Button key={customer.veh_no} title={"Get Ticket"} click={ async ()=>{
                        const exit_time = new Date().toString();
                        const ticket = await axios.post("/",{
                            entry_time:"1213",
                            charge :100,
                            veh_no:customer.veh_no,
                            owner :customer.owner,
                            contact :customer.contact,
                            exit_time :exit_time,
                            veh_type :customer.veh_type
                        });
                        navigate('/ticket');
                    }}/>
                </div>
            </div>
        })}
    </div>
}