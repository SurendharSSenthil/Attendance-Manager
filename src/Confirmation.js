import React from 'react';

function Confirmation({student,onConfirm,onCancel}) {
    return(
        <div className='confirm-container'>
        <div className='confirm-card'>
            <h2>Confirmation</h2>
            <p>Do You Want to add the Student?</p>
            <p>name    : {student.name}</p>
            <p>Reg No  : {student.regno}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
        </div>
    )
}

export default Confirmation;