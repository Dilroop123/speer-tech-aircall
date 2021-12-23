import React from 'react';
import "../css/detail.css"

const ContactCardRow = ({ rightChildrenName, rightChildrenValue, leftChildrenName, leftChildrenValue }) => {

    return (


        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div>
                <p className="fontsmall">{rightChildrenName}</p>
                <p>{rightChildrenValue}</p>
            </div>
            <div>
                <p className="fontsmall">{leftChildrenName}</p>
                <p>{leftChildrenValue}</p>
            </div>

        </div>

    );
};


export default ContactCardRow;
