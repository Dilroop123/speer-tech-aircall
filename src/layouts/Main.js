import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import routes from "routes.js";

const Main = (props) => {
    const [contactList, setContactList] = React.useState(
        [{ "id": 7834, "created_at": "2018-04-19T09:38:41.000Z", "direction": "outbound", "from": "Pierre-Baptiste Béchu", "to": "06 46 62 12 33", "via": "NYC Office", "duration": "120", "is_archived": false, "call_type": "missed" }, { "id": 7833, "created_at": "2018-04-18T16:59:48.000Z", "direction": "outbound", "from": "Jonathan Anguelov", "to": "06 45 13 53 91", "via": "NYC Office", "duration": "60", "is_archived": false, "call_type": "missed" }, { "id": 7832, "created_at": "2018-04-18T16:53:22.000Z", "direction": "inbound", "from": "06 19 18 23 92", "to": "Jonathan Anguelov", "via": "Support FR", "duration": "180", "is_archived": false, "call_type": "answered" }, { "id": 7831, "created_at": "2018-04-18T16:42:55.000Z", "direction": "inbound", "from": "06 34 45 74 34", "to": "Xavier Durand", "via": "Support FR", "duration": "180", "is_archived": false, "call_type": "answered" }, { "id": 7830, "created_at": "2018-04-18T16:23:43.000Z", "direction": "inbound", "from": "+33 6 34 45 74 34", "to": null, "via": "Support FR", "duration": "120", "is_archived": false, "call_type": "voicemail" }, { "id": 7829, "created_at": "2018-04-18T15:43:32.000Z", "direction": "inbound", "from": "+33 6 34 45 74 34", "to": "Olivier Pailhes", "via": "Spain Hotline", "duration": "300", "is_archived": false, "call_type": "answered" }]
    );

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/admin/index",
                    imgSrc: require("../assets/img/brand/logo.png").default,
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContent}>
                <AdminNavbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)}
                />
                <Switch>
                    {getRoutes(routes)}
                    <Redirect from="*" to="/admin/index" />
                </Switch>
                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Main;
