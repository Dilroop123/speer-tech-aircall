import React from 'react';
import axios from "axios";
import moment from 'moment';
import aircall from "../assets/aircall.png"
import "../css/body.css";
import '../css/app.css';
import "../css/detail.css"

import color from '../constants/colors';
import ContactCardRow from 'components/ContactCardRow';

const ContactDetail = (props) => {


    const contactId = props.location?.state?.id;
    const [contact, setContact] = React.useState();





    const getContactDetail = async () => {
        try {
            await axios({
                method: "get",

                url: `https://aircall-job.herokuapp.com/activities/${contactId}`,
            })
                .then(function (response) {

                    setContact(response?.data);
                })
                .catch(function (thrown) {
                    if (axios.isCancel(thrown)) {
                        console.error("Request canceled", thrown.message);
                    } else {
                        console.error(thrown.message);
                    }
                });
        } catch (e) {
            console.error(e);
        }
    };

    React.useEffect(() => {

        getContactDetail()
        const contactId = props.location?.state?.id;
    }, [])

    const onDeletePress = async () => {
        const response = await fetch(`https://aircall-job.herokuapp.com/activities/${contactId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                is_archived: true,
            }),
        });

        const resData = await response.json();
        if (resData?.is_archived === true) {
            alert("Contact has been arachived")
        } else {
            alert("server request failed")
        }

    };


    const showArchiveAlert = () => {
        var answer = window.confirm("Do you want to archive this contact ?");
        if (answer) {
            onDeletePress();
        } else {
            console.log("no");
        }
    };

    return (
        <div className="wrapper">


            <div className="container">
                <div >
                    <img src={aircall} height="275px" width="376px" style={{ borderBottomRightRadius: 35, borderBottomLeftRadius: 35 }} />

                </div>

                <div style={{ marginLeft: 70, width: 200, display: "flex", backgroundColor: 'white', position: "absolute", marginTop: -40, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', padding: 10, borderRadius: 10 }}>
                    <button className="back-button" onClick={(e) => props.history.push("/")}>Back</button>
                    <button className="archive-button" onClick={() => showArchiveAlert()}>Archive</button>
                </div>


                <div className="container-view">
                    <p style={{ fontSize: 14, marginLeft: 10, color: color.grey }}>Call Details</p>
                    <div style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>

                        <ContactCardRow rightChildrenName="Via" rightChildrenValue={contact?.via} leftChildrenName="Duration" leftChildrenValue={contact?.duration} />

                        <ContactCardRow rightChildrenName="Date" rightChildrenValue={moment(contact?.created_at).format('MMMM d, YYYY')} leftChildrenName="Call type" leftChildrenValue={contact?.call_type} />

                        <ContactCardRow rightChildrenName="Direction" rightChildrenValue={contact?.direction} leftChildrenName="To" leftChildrenValue={contact?.to} />
                        <ContactCardRow rightChildrenName="From" rightChildrenValue={contact?.from} />


                    </div>
                </div>

            </div>
        </div>
    );
};


export default ContactDetail;
