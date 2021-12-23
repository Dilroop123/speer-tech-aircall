import React from 'react';
import axios from "axios";
import moment from 'moment';
import "../css/body.css";
import '../css/app.css';
import '../css/header.css';
import color from '../../src/constants/colors';
import Header from '../Header.jsx';
import profile from '../../src/assets/profile.jpeg'
import ansercall from "../../src/assets/answercall.png"
import misscall from "../../src/assets/miscall.png"
const ActivityFeed = (props) => {
    const [contactList, setContactList] = React.useState();






    const getContactList = async () => {
        try {
            await axios({
                method: "get",

                url: `https://aircall-job.herokuapp.com/activities`,
            })
                .then(function (response) {

                    setContactList(response?.data);
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

        getContactList()
    }, [])
    return (
        <div className="wrapper">


            <div className='container'>
                <div style={{
                    height: "40%",
                    backgroundColor: color.primary,
                    marginBottom: 20,

                    borderBottomLeftRadius: 30,

                }}>
                    <Header />
                    <div style={{ marginLeft: 20, marginTop: 5 }}>
                        <div style={{ display: "flex" }}>

                            <button className="button-animate" onClick={(e) => props.history.push("/archiveCalls")}>View Archive</button>

                        </div>
                        <p style={{ color: color.white, fontSize: 10 }}>FAVOURITE CONTACTS</p>
                        {/* <FlatList
            displayGrid
            list={contactList}
            renderItem={renderFavouriteContacts}
          // keyExtractor={item => item.id.toString()}
          /> */}

                    </div>

                </div>

                <div className="container-view">
                    <p style={{ fontSize: 14, marginLeft: 10, color: color.grey }}>Activity Feed</p>
                    <div className="center-col">
                        {contactList?.map(contact => (
                            <div key={contact?.id} style={{ flex: 1, border: "1px solid #D3D3D3", display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 5, borderRadius: 10, paddingLeft: 10, }}>

                                <div style={{ flexGrow: 1, alignItems: 'center', display: "flex" }}>
                                    <img src={contact?.call_type === "missed" ? misscall : ansercall} height="18px" width="18px" />
                                    <div style={{ marginLeft: 10 }}>
                                        <p style={{ fontWeight: 'bold' }}>{contact?.from}</p>
                                        {contact?.call_type === "missed" && <p style={{ color: color.lightgrey }}>tried to calling {contact?.to}</p>}
                                        {contact?.call_type === "answered" && <p style={{ color: color.lightgrey }}> received by {contact?.to}</p>}
                                        {contact?.call_type === "voicemail" && <p style={{ color: color.lightgrey }}>This is voice mail {contact?.to}</p>}

                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-end', marginRight: 5, flexDirection: 'column' }}>
                                    <p style={{ color: color.lightgrey, fontSize: 10 }}>{moment(contact?.created_at).format('MMMM d, YYYY')}</p>
                                    <button style={{ display: 'inline-block', textAlign: 'center', height: 20, width: 40, borderRadius: 5, color: color.white, backgroundColor: '#3496ff', fontSize: 10, border: "none", cursor: "pointer" }} onClick={(e) => props.history.push("/contactDetail", { id: contact?.id })}>View</button>


                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};


export default ActivityFeed;
