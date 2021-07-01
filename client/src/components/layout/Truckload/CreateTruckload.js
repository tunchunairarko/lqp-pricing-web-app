import React, { useState, useEffect, Fragment, useContext, useRef } from 'react'
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { Form, Row, Col, Button, Card, ButtonGroup, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { FaBroom, FaDumpsterFire, FaUpload, FaCopy } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import 'react-widgets/dist/css/react-widgets.css';
import { DropdownList } from 'react-widgets'
import { useAlert } from 'react-alert';
import UserContext from "../../../context/UserContext";

import Axios from "axios";

export default function CreateTruckLoad() {
    const alert = useAlert()
    const { userData } = useContext(UserContext);
    const [error, setError] = useState();
    const [cookies] = useCookies(["user"]);
    const [retailers, setRetailers] = useState([]);
    const [truckload, setTruckload] = useState("");
    const [curRetailer, setCurRetailer] = useState('');
    const [successNotice, setSuccessNotice] = useState();
    const loadNoCopyRef = useRef(null);

    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(undefined)
        }
    }, [successNotice])

    useEffect(() => {
        const compMount = async (e) => {
            let token = localStorage.getItem("auth-token");
            if (token == null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            else {
                const tokenResponse = await Axios.post(
                    "/api/users/tokenIsValid",
                    null,
                    { headers: { "x-auth-token": token } }
                );
                if (tokenResponse.data) {
                    try {
                        const retailerRes = await Axios.get(
                            "/api/retailers/",
                            { headers: { "x-auth-token": token } }
                        )
                        
                        if (retailerRes.data) {
                            const temp = []
                            // console.log(retailerRes.data)
                            for (var i = 0; i < retailerRes.data.retailers.length; i++) {
                                temp.push(retailerRes.data.retailers[i].retailer)
                            }
                            // console.log(temp)
                            setRetailers(temp);

                        }

                    } catch (error) {
                        console.log(error)
                        alert.error(<div style={{ 'fontSize': '0.70em' }}>Error retrieving retailers</div>)
                    }
                }
            }
        }
        compMount()
    }, [])

    const handleCreate = async(name) => {
        
        if (name) {
            let token = localStorage.getItem("auth-token");
            if (token == null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            else {

                const tokenResponse = await Axios.post(
                    "/api/users/tokenIsValid",
                    null,
                    { headers: { "x-auth-token": token } }
                );
                if (tokenResponse.data) {
                    var uname = cookies.username
                    
                    let data = { username:uname, retailer:name }
                    const resp = await Axios.post(`/api/retailers/create`, data, { headers: { "x-auth-token": userData.token } });
                    const result = resp.data
                    try {
                        setSuccessNotice("New retailer added: " + result.retailer);
                        setCurRetailer(name)
                        setRetailers(retailers => [...retailers, name])
                    } catch (err) {
                        
                        setError("Error in creating retailer")
                    }
                }
            }
        }
        else {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>Error creating truckload</div>)
        }
    }
    const handleLoadCreate = async (e) => {
        console.log(curRetailer)
        if (curRetailer) {
            let token = localStorage.getItem("auth-token");
            if (token == null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            else {

                const tokenResponse = await Axios.post(
                    "/api/users/tokenIsValid",
                    null,
                    { headers: { "x-auth-token": token } }
                );
                if (tokenResponse.data) {
                    var name = cookies.username
                    var retailer_short = curRetailer.substring(0, 3)
                    let data = { name, curRetailer, retailer_short }
                    try{
                        const resp = await Axios.post(`/api/truckloads/create`, data, { headers: { "x-auth-token": userData.token } });
                        const result = resp.data
                        console.log(result.loadNo)
                        setSuccessNotice("New load registered: " + result.loadNo);
                        setTruckload(result.loadNo)
                       
                    }catch(err){
                        console.log(err)
                        setError("Error in creating truckload")
                    }
                   
                }
            }
        }
        else {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>Error creating truckload</div>)
        }
    }

    function copyToClipboard(e) {
        loadNoCopyRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setSuccessNotice('Copied!');
    };

    return (
        <Fragment>
            <ModuleHeader moduleName={"Create Truckload"} />
            <Card className="box-design mt-3">
                <Row className="ml-3 pr-3 mt-3">

                    <Col xs={12} sm={12}>
                        <Form>
                            <Form.Group as={Row} controlId="titleText">
                                <Form.Label column sm="2">
                                    Choose Retailer
                                </Form.Label>
                                <Col sm="4">
                                    <DropdownList filter
                                        data={retailers ? retailers : []}
                                        value={curRetailer}
                                        allowCreate="onFilter"
                                        onCreate={name => handleCreate(name)}
                                        onChange={value => setCurRetailer(value)}
                                        textField="retailer"
                                    />
                                </Col>
                                <Col sm="6" >
                                    <Button variant="info" block onClick={handleLoadCreate}><FaUpload /> Register new truckload </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col sm="12" className="mt-2">


                                    <InputGroup className="mb-3">
                                        <Form.Control ref={loadNoCopyRef} placeholder="Load No will be generated here. Copy it" type="text" value={truckload} readOnly />
                                        {
                                            document.queryCommandSupported('copy') &&
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={copyToClipboard}><FaCopy /></Button>
                                            </InputGroup.Append>
                                        }
                                    </InputGroup>

                                </Col>
                            </Form.Group>


                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
