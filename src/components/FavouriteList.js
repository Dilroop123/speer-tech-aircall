import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { getPersonImage } from 'utils/getProfileImages';
import color from '../../src/constants/colors';




const FavouriteList = ({ list }) => {

    return (
        <div>
            <ScrollMenu>
                {list?.slice(0, 4)?.map((contact, index) => (
                    <div style={{ margin: 10 }}>
                        <img src={getPersonImage(index)} height="75px" width="75px" style={{ borderRadius: 10 }} />
                        <p style={{ textAlign: 'center', color: color.white, fontSize: 10 }}>{contact?.to}</p>
                    </div>
                ))}
            </ScrollMenu>
        </div>
    );
};


export default FavouriteList;


