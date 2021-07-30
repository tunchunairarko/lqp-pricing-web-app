import React, {Fragment,useState,useEffect,useContext} from 'react'
import {  Form,  Row, Col, Card, } from 'react-bootstrap';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import UserContext from "../../../context/UserContext";
import { DropdownList } from 'react-widgets'
import Axios from "axios";


export default function OpinIpinFields({ipin,opin,setOPIN,load_no,location, setErrorNotice}) {
    const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);
    const [opinList,setOPINList] = useState([])
    
  

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
                        const opinRes = await Axios.get(
                            "/api/outpallet",
                            { headers: { "x-auth-token": token } }
                        )

                        if (opinRes.data) {
                            const temp2 = []
                            // console.log(opinRes.data)
                            for (var i = 0; i < opinRes.data.opins.length; i++) {
                                temp2.push(opinRes.data.opins[i].opin)
                            }
                            // console.log(temp2)
                            setOPINList(temp2);

                        }

                    } catch (error) {
                        setErrorNotice("Error retrieving opin list")
                        
                    }
                }
            }
        }
        compMount()
    }, [])

    const handleOPINSearch = (opin) =>{
        setOPIN(opin)
    }

    return (
        <Fragment>
            
            <Card className="box-design mt-3 mb-3">
                <Row className="ml-3 pr-3 mt-3 ">
                    
                    <Col xs={12} sm={12}>
                        <Form>
                        <Form.Group as={Row} >
                                <Form.Label column sm="1">
                                    Truckload
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" value={load_no} readOnly/>
                                </Col>
                                <Form.Label column sm="1">
                                    Location
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" value={location} readOnly/>
                                </Col>
                                
                            </Form.Group>
                            <Form.Group as={Row} >
                                
                                <Form.Label column sm="1">
                                    IPIN
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control type="text" value={ipin} readOnly/>
                                </Col>
                                <Form.Label column sm="1">
                                    OPIN
                                </Form.Label>
                                <Col sm="5">
                                    <DropdownList filter
                                        data={opinList ? opinList : []}
                                        value={opin}
                                        onSearch={searchterm => handleOPINSearch(searchterm)}
                                        onChange={value => setOPIN(value)}
                                        textField="opinList"
                                    />
                                </Col>
                            </Form.Group>
                            
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
