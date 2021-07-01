import React, { useState, useEffect, Fragment, useContext, useRef } from 'react'
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { Form, Row, Col, Button, Card, InputGroup } from 'react-bootstrap';
import { FaUpload, FaCopy } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import 'react-widgets/dist/css/react-widgets.css';
import { useAlert } from 'react-alert';
import UserContext from "../../../context/UserContext";

import Axios from "axios";

export default function CreateLocation() {
    const alert = useAlert()
    const { userData } = useContext(UserContext);
    const [error, setError] = useState();
    const [cookies] = useCookies(["user"]);
    const [location,setLocation]=useState("");
    const [successNotice, setSuccessNotice] = useState();
    const [prefix,setPrefix]=useState("");
    const [suffix,setSuffix]=useState("");
    const locationCopyRef = useRef(null);

    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(undefined)
        }
    }, [successNotice])

    

    

    const handleLocationCreate = async (e) => {
        if (prefix && suffix) {
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
                    
                    let data = { name, prefix, suffix }
                    try {
                        const resp = await Axios.post(`/api/locations/create`, data, { headers: { "x-auth-token": userData.token } });
                        const result = resp.data
                        console.log(result.locationNo)
                        setSuccessNotice("New location registered: " + result.locationNo);
                        setLocation(result.locationNo)

                    } catch (err) {
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
        locationCopyRef.current.select();
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
                                    Enter zone prefix
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" placeholder="For ex: A, B, AA, BC etc." value={prefix} onChange={(e) => setPrefix(e.target.value)} />
                                </Col>
                                <Form.Label column sm="2">
                                    Enter lot/shelf suffix
                                </Form.Label>
                                <Col sm="4">
                                    <Form.Control type="text" placeholder="For ex: 1, 2, A10, B27 etc.." value={suffix} onChange={(e) => setSuffix(e.target.value)} />
                                </Col>
                                
                            </Form.Group>

                            <Form.Group as={Row} className="mt-2">
                                <Col sm="6" >
                                    <InputGroup className="mb-3">
                                        <Form.Control ref={locationCopyRef} placeholder="Location No will be generated here. Copy it" type="text" value={location} readOnly />
                                        {
                                            document.queryCommandSupported('copy') &&
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={copyToClipboard}><FaCopy /></Button>
                                            </InputGroup.Append>
                                        }
                                    </InputGroup>

                                </Col>
                                <Col sm="6" >
                                    <Button variant="info" block onClick={handleLocationCreate}><FaUpload /> Register new location </Button>
                                </Col>
                            </Form.Group>


                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
