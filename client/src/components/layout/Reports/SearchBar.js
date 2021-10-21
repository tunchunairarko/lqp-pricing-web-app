import React, {Fragment,useEffect, useState} from 'react'
import Axios from 'axios'
import {Form,Row,Col} from 'react-bootstrap'

export default function SearchBar({apiRoute,handleSetData,setErrorMessage,className}) {
    const [searchQuery,setSearchQuery] = useState("")
    let token = localStorage.getItem("auth-token")
    
    useEffect(()=>{
        const queryDb = async(e)=>{
            if(searchQuery.length>=3){
                try{
                    let body = {searchQuery}
                    const searchDataResp = await Axios.post(
                        "/api/"+apiRoute+"/search",
                        body,
                        { headers: { "x-auth-token": token } }
                    );
                    handleSetData(searchDataResp.data)
                    // console.log(searchDataResp)
                }catch(err){
                    setErrorMessage("Search error")
                }
            }
            else{
                try{
                    const searchDataResp = await Axios.get(
                        "/api/"+apiRoute,
                        { headers: { "x-auth-token": token } }
                    );
                    handleSetData(searchDataResp.data)
                    // console.log(searchDataResp)
                }catch(err){
                    setErrorMessage("Error retrieving data")
                }
            }
        }
        queryDb()
    },[searchQuery])

    return (
        <Fragment>
            <Row>
                <Col sm={12}>
                    <Form>
                        <Col sm={12}>
                            <Form.Control className={className} type="text" placeholder="Search here..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}></Form.Control>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
}
