import React from "react";

export function Button({title,click}){
    return <button onClick={click}>
        {title}
    </button>
}