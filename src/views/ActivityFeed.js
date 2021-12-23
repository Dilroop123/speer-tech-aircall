import React from 'react';
import axios from "axios";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import profile from "../assets/profile.jpeg"
import color from '../../src/constants/colors';
import Header from '../components/Header.jsx';

import "../css/body.css";
import '../css/app.css';
import '../css/header.css';

import ContactListItem from 'components/ContactListItem';
import FavouriteList from 'components/FavouriteList';


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
                <div style={mystyle.headerWrapper}>
                    <Header />
                    <div style={{ marginLeft: 20, marginTop: 5 }}>
                        <div style={{ display: "flex" }}>

                            <button className="button-animate" onClick={(e) => props.history.push("/archiveCalls")}>View Archive</button>

                        </div>
                        <p style={mystyle.paraFavourite}>FAVOURITE CONTACTS</p>

                        <FavouriteList list={contactList} />


                    </div>

                </div>

                <div className="container-view">
                    <p style={mystyle.paraActivity}>Activity Feed</p>
                    <div className="center-col">
                        {contactList?.map(contact => (

                            <ContactListItem key={contact?.id} call_type={contact?.call_type} from={contact?.from} to={contact?.to} created_at={contact?.created_at} id={contact?.id} onViewPress={(id) => props.history.push("/contactDetail", { id: id })} style={mystyle.listItem} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};


export default ActivityFeed;


const mystyle = {
    headerWrapper: {
        height: "43%",
        backgroundColor: color.primary,
        marginBottom: 20,
        borderBottomLeftRadius: 30,
    },
    listItem: { flex: 1, border: "1px solid #D3D3D3", display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 10, marginTop: 5, borderRadius: 10, paddingLeft: 10 },
    paraActivity: { fontSize: 14, marginLeft: 10, color: color.grey },
    paraFavourite: { color: color.white, fontSize: 10 }
};