import axios from "axios";
import { useDebugValue, useEffect, useState } from "react";

export function VehType(){
    const [vtype,setType] = useState("");
    const [list ,setList] = useState([]);
    useEffect(()=>{
        axios.get().then((response)=>{
            setList(response.types);
        }).catch((err)=>{
            alert(err);
        })
    },[list]);
    return <div className="VehType">
        <div>
            {vtype}
        </div>
        <div>
            {list.map((obj)=>{
                return <button key={obj._id} onClick={()=>{
                    setType(obj.type);
                }}>{obj.type}</button>
            })}
        </div>
    </div>

}