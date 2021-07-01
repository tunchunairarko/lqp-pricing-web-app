import React, { useState, Fragment} from 'react'
import PrivateRoute from "../../../router/PrivateRoute";
import Aside from '../Aside/Aside';
import 'react-pro-sidebar/dist/css/styles.css';
import {  FaBars } from 'react-icons/fa';
import '../../assets/Dashboard.scss';
import PricingModule from '../ManifestModule/PricingModule';
import Dashboard from '../Dashboard/dashboard';
import { Switch } from "react-router";
import CreateTruckLoad from '../Truckload/CreateTruckload';
import RegisterIPIN from '../Truckload/RegisterIPIN';
import CreateLocation from '../Location/CreateLocation';
import RegisterOPIN from '../ManifestModule/RegisterOPIN';

export default function Admin() {
    
    const [collapsed] = useState(false);

    const [toggled, setToggled] = useState(false);


    const handleToggleSidebar = (value) => {
        setToggled(value);
    };
    
    return (
        <Fragment>            
                <div id="content-body" className={`app  ${toggled ? 'toggled' : ''}`}>
                    <Aside
                        collapsed={collapsed}
                        toggled={toggled}
                        handleToggleSidebar={handleToggleSidebar}
                    />
                    <main>
                        <div className="sidebar-main-btn-toggle  btn-toggle" onClick={() => handleToggleSidebar(true)}>
                            <FaBars />
                        </div>
                        <div className="container-fluid">
                            <Switch>
                                <PrivateRoute component={PricingModule} path="/listing"  exact/>
                                <PrivateRoute component={Dashboard} path="/dashboard" exact/>
                                <PrivateRoute component={CreateTruckLoad} path="/truckload/new" exact/>
                                <PrivateRoute component={RegisterIPIN} path="/inboundpallet/new" exact />
                                <PrivateRoute component={RegisterOPIN} path="/outboundpallet/new" exact />
                                <PrivateRoute component={CreateLocation} path="/location/new" exact />
                            </Switch>
                        </div>
                    </main>
                </div>
        </Fragment>
    )
}
