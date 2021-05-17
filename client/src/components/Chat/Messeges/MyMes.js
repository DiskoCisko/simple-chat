import React from 'react';
import './Messeges.css';
const MyMes = (props) => {
    return <div className="messege">{ props.text } 
    <span className="author">
        { props.sendler }
    </span>
   
</div>
}
export default MyMes;