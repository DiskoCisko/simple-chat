import React from 'react';
import './Messeges.css';
const OtherMes = (props) => {
    return <div className="messege other-mes">{ props.text } 
    <span className="author">
        { props.sendler }
    </span>
   
</div>
}
export default OtherMes;