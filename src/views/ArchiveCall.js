import React from 'react';
import color from '../constants/colors';
import Header from '../components/Header.jsx';
import backIcon from "../../src/assets/back.png"
import "../css/body.css";
import '../css/app.css';
import '../css/header.css';
import "../css/archive.css"

import ContactListItem from 'components/ContactListItem';



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

    const resetCallHandler = async () => {
        const response = await fetch(
            "https://aircall-job.herokuapp.com/reset",
            {
                method: "GET",
            }
        );

        const resData = await response.json();
        console.log(resData);
        setArchiveList([]);
    };


    React.useEffect(() => {
        getArchiveList()
    }, [])


    return (
        <div className="wrapper">
            <div className='container'>
                <div style={mystyle.headerWrapper}>
                    <Header />
                    <div style={{ display: "flex", alignItems: 'center' }}>
                        <img src={backIcon}
                            style={{ marginLeft: 10 }}
                            height={20}
                            width={20}
                            onClick={(e) => props.history.push("/")}
                        />
                        <p style={mystyle.paraArchiveList}>Archive List</p>
                    </div>
                </div>
                <div className="container-view">
                    <button className="back-button" onClick={() => resetCallHandler()}>Reset all calls</button>
                    <div className="center-archive-col">
                        {archiveList?.map(contact => (
                            <ContactListItem key={contact?.id} call_type={contact?.call_type} from={contact?.from} to={contact?.to} created_at={contact?.created_at} id={contact?.id} style={{ flex: 1, backgroundColor: "white", borderLeft: 4, borderRight: 0, borderTop: 0, borderBottom: 0, borderColor: contact?.call_type === "missed" ? 'red' : "green", borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 8, borderRadius: 10, paddingLeft: 10, }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ArchiveCall;



const mystyle = {
    headerWrapper: {
        height: "20%",
        backgroundColor: color.primary,
        marginBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    paraArchiveList: { fontSize: 14, marginLeft: 40, color: color.white, textAlign: 'center' },
    paraFavourite: { color: color.white, fontSize: 10 }
};