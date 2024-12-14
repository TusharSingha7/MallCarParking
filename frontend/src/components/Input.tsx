import React from "react";

export function InputBox({title,change}){
    return <input placeholder={title} onChange={change}>
    </input>
}