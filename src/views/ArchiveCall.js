import React from 'react';
import moment from 'moment';
import "../css/body.css";
import '../css/app.css';
import '../css/header.css';
import "../css/archive.css"
import color from '../constants/colors';
import Header from '../Header.jsx';
import ansercall from "../../src/assets/answercall.png"
import misscall from "../../src/assets/miscall.png"
import backIcon from "../../src/assets/back.png"
const ArchiveCall = (props) => {
    const [archiveList, setArchiveList] = React.useState();



    const getArchiveList = async () => {
        const response = await fetch(
            "https://aircall-job.herokuapp.com/activities",
            {
                method: "GET",
            }
        );

        const resData = await response.json();
        setArchiveList(resData?.filter(function (contact) {
            return contact?.is_archived === true;
        }));
    };

    React.useEffect(() => {
        getArchiveList()
    }, [])
    return (
        <div className="wrapper">


            <div className='container'>
                <div style={{
                    height: "20%",
                    backgroundColor: color.primary,
                    marginBottom: 20,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20

                }}>
                    <Header />
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <img
                            src={
                                backIcon

                            }
                            style={{ marginLeft: 10 }}
                            height={20}
                            width={20}
                            onClick={(e) => props.history.push("/")}
                        />
                        <p style={{ fontSize: 14, marginLeft: 40, color: color.white, textAlign: 'center' }}>Archive List</p>

                    </div>

                </div>

                <div className="container-view">

                    <div className="center-archive-col
                    ">
                        {archiveList?.map(contact => (
                            <div key={contact?.id} style={{ flex: 1, backgroundColor: "white", borderLeft: 4, borderRight: 0, borderTop: 0, borderBottom: 0, borderColor: contact?.call_type === "missed" ? 'red' : "green", borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 8, borderRadius: 10, paddingLeft: 10, }}>

                                <div style={{ flexGrow: 1, alignItems: 'center', display: "flex" }}>
                                    <img src={contact?.call_type === "missed" ? misscall : ansercall} height="18px" width="18px" />
                                    <div style={{ marginLeft: 10 }}>
                                        <p style={{ fontWeight: 'bold' }}>{contact?.from}</p>
                                        {contact?.call_type === "missed" && <p style={{ color: color.lightgrey }}>tried to calling {contact?.to}</p>}
                                        {contact?.call_type === "answered" && <p style={{ color: color.lightgrey }}> received by {contact?.to}</p>}
                                        {contact?.call_type === "voicemail" && <p style={{ color: color.lightgrey }}>This is voice mail {contact?.to}</p>}

                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-end', marginRight: 5 }}>
                                    <p style={{ color: color.lightgrey, fontSize: 10 }}>{moment(contact?.created_at).format('MMMM d, YYYY')}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};


export default ArchiveCall;
