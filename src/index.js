import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ActivityFeed from "../src/views/ActivityFeed";
import ContactDetail from "../src/views/ContactDetail";
import ArchiveCall from "../src/views/ArchiveCall"

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/contactDetail" render={(props) => <ContactDetail {...props} />} />
            <Route path="/archiveCalls" render={(props) => <ArchiveCall {...props} />} />

            <Route path="/" render={(props) => <ActivityFeed {...props} />} />


        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);