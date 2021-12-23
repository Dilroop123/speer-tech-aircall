import React from 'react';
import moment from 'moment';

import color from '../constants/colors';

import profile from '../../src/assets/profile.jpeg'
import ansercall from "../../src/assets/answercall.png"
import misscall from "../../src/assets/miscall.png"

const mystyle = {

    innerWrapper: { flexGrow: 1, alignItems: 'center', display: "flex" },
    rightChildren: { display: 'flex', alignItems: 'flex-end', marginRight: 5, flexDirection: 'column' },
    button: { display: 'inline-block', textAlign: 'center', height: 20, width: 40, borderRadius: 5, color: color.white, backgroundColor: '#3496ff', fontSize: 10, border: "none", cursor: "pointer" }
};

const ContactListItem = ({ key, style, call_type, from, to, created_at, id, onViewPress }) => {


    return (

        <div key={key} style={style}>

            <div style={mystyle.innerWrapper}>
                <img src={call_type === "missed" ? misscall : ansercall} height="18px" width="18px" />
                <div style={{ marginLeft: 10 }}>
                    <p style={{ fontWeight: 'bold' }}>{from}</p>
                    {call_type === "missed" && <p style={{ color: color.lightgrey }}>tried to calling {to}</p>}
                    {call_type === "answered" && <p style={{ color: color.lightgrey }}> received by {to}</p>}
                    {call_type === "voicemail" && <p style={{ color: color.lightgrey }}>This is voice mail {to}</p>}

                </div>
            </div>

            <div style={mystyle.rightChildren}>
                <p style={{ color: color.lightgrey, fontSize: 10 }}>{moment(created_at).format('MMMM d, YYYY')}</p>
                {!!onViewPress && <button style={mystyle.button} onClick={() => onViewPress(id)}>View</button>
                }


            </div>

        </div>




    );
};


export default ContactListItem
