import React, { useState, useEffect, Fragment, useContext, useRef } from 'react'
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { Form, Row, Col, Button, Card, ButtonGroup, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { FaBroom, FaDumpsterFire, FaUpload, FaCopy, FaRecycle } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import 'react-widgets/dist/css/react-widgets.css';
import { DropdownList } from 'react-widgets'
import { useAlert } from 'react-alert';
import UserContext from "../../../context/UserContext";

import Axios from "axios";

export default function RegisterIPIN() {
    const alert = useAlert()
    const { userData } = useContext(UserContext);
    const [error, setError] = useState();
    const [cookies] = useCookies(["user"]);
    const [truckloadList, setTruckloadList] = useState([])
    const [load_no, setLoadNo] = useState("");
    const [location, setLocation] = useState("");
    const [locationList, setLocationList] = useState([])
    const [ipin, setIPIN] = useState("");
    const [costprice, setCostPrice] = useState("");
    const [successNotice, setSuccessNotice] = useState();
    const ipinNoCopyRef = useRef(null);

    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(undefined)
        }
    }, [successNotice])

    useEffect(() => {
        if (error) {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>{error}</div>)
            setError(undefined)
        }
    }, [error])

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
                        const loadRes = await Axios.get(
                            "/api/truckloads/",
                            { headers: { "x-auth-token": token } }
                        )

                        if (loadRes.data) {
                            const temp2 = []
                            // console.log(loadRes.data)
                            for (var i = 0; i < loadRes.data.truckloads.length; i++) {
                                temp2.push(loadRes.data.truckloads[i].loadNo)
                            }
                            // console.log(temp2)
                            setTruckloadList(temp2);

                        }

                    } catch (err) {
                        console.log(err)
                        setError("Error retrieving load_no list")
                    }
                    try {
                        const locationRes = await Axios.get(
                            "/api/locations/",
                            { headers: { "x-auth-token": token } }
                        )

                        if (locationRes.data) {
                            const temp3 = []
                            // console.log(locationRes.data)
                            for (var i = 0; i < locationRes.data.locations.length; i++) {
                                temp3.push(locationRes.data.locations[i].locationNo)
                            }
                            // console.log(temp2)
                            setLocationList(temp3);

                        }

                    } catch (err) {
                        console.log(err)
                        setError("Error retrieving location list")
                    }
                }
            }
        }
        compMount()
    }, [])


    

    const handleLoadNoSearch = (loadNo) => {
        setLoadNo(loadNo)
    }
    const handlePalletCreate = async (e) => {
        
        try {
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
                    
                    let data = { name, load_no, costprice, location }
                    try {
                        const resp = await Axios.post(`/api/inpallet/create`, data, { headers: { "x-auth-token": userData.token } });
                        const result = resp.data
                        console.log(result.ipin)
                        setSuccessNotice("New pallet registered: " + result.ipin);
                        setIPIN(result.ipin)

                    } catch (err) {
                        console.log(err)
                        setError("Error in creating pallet/Location Full")
                    }

                }
            }
        }
        catch(err) {
            setError("Error in creating pallet")
        }
    }

    const handleLocationSearch = (locationNo) => {
        setLocation(locationNo)
    }

    function copyToClipboard(e) {
        ipinNoCopyRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setSuccessNotice('Copied!');
    };

    return (
        <Fragment>
            <ModuleHeader moduleName={"Register an IPIN"} />
            <Card className="box-design mt-3">
                <Row className="ml-3 pr-3 mt-3">

                    <Col xs={12} sm={12}>
                        <Form>
                            <Form.Group as={Row} controlId="titleText">
                                
                                <Form.Label column sm="1">
                                    Load no
                                </Form.Label>
                                <Col sm="5">
                                    {/* <Form.Control type="text" placeholder="Enter Truckload number" value={load_no} onChange={(e) => setTruckload(e.target.value)} /> */}
                                    <DropdownList filter
                                        data={truckloadList ? truckloadList : []}
                                        value={load_no}
                                        onSearch={searchterm => handleLoadNoSearch(searchterm)}
                                        onChange={value => setLoadNo(value)}
                                        textField="loadNoList"
                                    />
                                </Col>
                                <Form.Label column sm="1">
                                    Location
                                </Form.Label>
                                <Col sm="5">
                                    <DropdownList filter
                                        data={locationList ? locationList : []}
                                        value={location}
                                        onSearch={searchterm => handleLocationSearch(searchterm)}
                                        onChange={value => setLocation(value)}
                                        textField="loadNoList"
                                    />
                                    {/* <Form.Control type="text" placeholder="Enter location" value={location} onChange={(e) => setCostPrice(e.target.value)} /> */}
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} >
                                
                                <Form.Label column sm="1">
                                    Cost price
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" placeholder="Enter cost price (optional)" value={costprice} onChange={(e) => setCostPrice(e.target.value)} />
                                </Col>
                                <Col sm="6" >


                                    <InputGroup className="mb-3">
                                        <Form.Control ref={ipinNoCopyRef} placeholder="IPIN will be generated here. Copy it" type="text" value={ipin} readOnly />
                                        {
                                            document.queryCommandSupported('copy') &&
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={copyToClipboard}><FaCopy /></Button>
                                            </InputGroup.Append>
                                        }
                                    </InputGroup>


                                </Col>
                                <Col sm="6" >
                                    <Button variant="info" block onClick={handlePalletCreate}><FaUpload /> Register new pallet </Button>
                                </Col>
                                <Col sm="6" >
                                    <Button variant="danger" block ><FaDumpsterFire /> Clear </Button>
                                </Col>
                            </Form.Group>


                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
