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

export default function RegisterOPIN() {
    const alert = useAlert()
    const { userData } = useContext(UserContext);
    const [errorNotice, setErrorNotice] = useState();
    const [cookies] = useCookies(["user"]);
    const [catalogs, setCatalogs] = useState([]);
    const [ipinList,setIPINList]=useState([])
    const [ipin, setIPIN] = useState("");
    const [Opin, setOpin] = useState("");
    const [curCatalog, setCurCatalog] = useState('');
    const [successNotice, setSuccessNotice] = useState();
    const catalogNoCopyRef = useRef(null);

    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(undefined)
        }
    }, [successNotice])

    useEffect(() => {
        if (errorNotice) {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>{errorNotice}</div>)
            setErrorNotice(undefined)
        }
    }, [errorNotice])

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
                        const catalogRes = await Axios.get(
                            "/api/catalogs/",
                            { headers: { "x-auth-token": token } }
                        )

                        if (catalogRes.data) {
                            const temp = []
                            // console.log(catalogRes.data)
                            for (var i = 0; i < catalogRes.data.catalogs.length; i++) {
                                temp.push(catalogRes.data.catalogs[i].catalog)
                            }
                            // console.log(temp)
                            setCatalogs(temp);

                        }

                    } catch (error) {
                        setErrorNotice("Error retrieving catalogs")
                    }
                    try {
                        const ipinRes = await Axios.get(
                            "/api/inpallet",
                            { headers: { "x-auth-token": token } }
                        )

                        if (ipinRes.data) {
                            const temp2 = []
                            // console.log(ipinRes.data)
                            for (var i = 0; i < ipinRes.data.ipins.length; i++) {
                                temp2.push(ipinRes.data.ipins[i].ipin)
                            }
                            // console.log(temp2)
                            setIPINList(temp2);

                        }

                    } catch (error) {
                        setErrorNotice("Error retrieving ipin list")
                        
                    }
                }
            }
        }
        compMount()
    }, [])


    const handleCatalogCreate = async (name) => {

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

                    let data = { username: uname, catalog: name }
                    const resp = await Axios.post(`/api/catalogs/create`, data, { headers: { "x-auth-token": userData.token } });
                    const result = resp.data
                    try {
                        setSuccessNotice("New catalog added: " + result.catalog);
                        setCurCatalog(name)
                        setCatalogs(catalogs => [...catalogs, name])
                    } catch (err) {

                        setErrorNotice("Error in creating catalog")
                    }
                }
            }
        }
        else {
            setErrorNotice("Error creating ipin")
        }
    }

    const handleIPINSearch = (ipin) =>{
        setIPIN(ipin)
    }
    const handleOPINCreate = async (e) => {
        if (curCatalog) {
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
                    var username = cookies.username
                    const catalog = curCatalog
                    let data = { username, catalog, ipin }
                    try {
                        const resp = await Axios.post(`/api/outpallet/create`, data, { headers: { "x-auth-token": userData.token } });
                        const result = resp.data
                        console.log(result)
                        setSuccessNotice("New outbound pallet registered: " + result);
                        setOpin(result)

                    } catch (err) {
                        console.log(err)
                        setErrorNotice("Error in creating opin")
                    }

                }
            }
        }
        else {
            setErrorNotice("Error creating opin")
        }
    }

    const handleClearAll =() =>{
        setCurCatalog("");
        setIPIN("")
    }

    function copyToClipboard(e) {
        catalogNoCopyRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        setSuccessNotice('Copied!');
    };

    return (
        <Fragment>
            <ModuleHeader moduleName={"Register an Opin"} />
            <Card className="box-design mt-3">
                <Row className="ml-3 pr-3 mt-3">

                    <Col xs={12} sm={12}>
                        <Form>
                            <Form.Group as={Row} controlId="titleText">
                                <Form.Label column sm="2">
                                    Choose catalog
                                </Form.Label>
                                <Col sm="4">
                                    <DropdownList filter
                                        data={catalogs ? catalogs : []}
                                        value={curCatalog}
                                        allowCreate="onFilter"
                                        onCreate={name => handleCatalogCreate(name)}
                                        onChange={value => setCurCatalog(value)}
                                        textField="catalog"
                                    />
                                </Col>
                                <Form.Label column sm="1">
                                    IPIN
                                </Form.Label>
                                <Col sm="5">
                                    {/* <Form.Control type="text" placeholder="Enter Truckload number" value={ipin} onChange={(e) => setIPIN(e.target.value)} /> */}
                                    <DropdownList filter
                                        data={ipinList ? ipinList : []}
                                        value={ipin}
                                        onSearch={searchterm => handleIPINSearch(searchterm)}
                                        onChange={value => setIPIN(value)}
                                        textField="ipinList"
                                    />
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row} >
                                <Col sm="12" className="mt-2">
                                    <InputGroup className="mb-3">
                                        <Form.Control ref={catalogNoCopyRef} placeholder="Opin will be generated here. Copy it" type="text" value={Opin} readOnly />
                                        {
                                            document.queryCommandSupported('copy') &&
                                            <InputGroup.Append>
                                                <Button variant="secondary" onClick={copyToClipboard}><FaCopy /></Button>
                                            </InputGroup.Append>
                                        }
                                    </InputGroup>


                                </Col>
                                <Col sm="6" >
                                    <Button variant="info" block onClick={handleOPINCreate}><FaUpload /> Register outbound pallet </Button>
                                </Col>
                                <Col sm="6" >
                                    <Button variant="danger" block 
                                    onClick={handleClearAll}
                                    ><FaDumpsterFire /> Clear </Button>
                                </Col>
                            </Form.Group>


                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
