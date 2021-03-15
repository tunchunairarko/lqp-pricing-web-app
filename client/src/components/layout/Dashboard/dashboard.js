import React, { Fragment, useState,useEffect } from 'react'
import Axios from "axios";
import {CardDeck,Row,Col} from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaUndo } from 'react-icons/fa';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import Total from "../../assets/sigma.png";
import Best from "../../assets/server.png";
import Upload from "../../assets/upload.png";
import DashCard from "./DashCard";
import { useCookies } from "react-cookie";

export default function Dashboard() {
    const [userUpload,setUserUpload]=useState("-");
    const [totalUpload,setTotalUpload]=useState("-");
    const [bestUploader,setBestUploader]=useState("-");
    const [cookies] = useCookies(["user"]);
    
    

    useEffect(()=>{
        const getAllDashboardData = async(e) =>{
            let token = localStorage.getItem("auth-token");
            const tokenResponse = await Axios.post(
                "/api/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            // console.log(searchQuery)
            
            if (tokenResponse.data) {
                const username=cookies.username
                const body = { username };
                const dashboardRes = await Axios.post(
                    "/api/products/dashboarddata", 
                    body,
                    { headers: { "x-auth-token": token }}
                );
                setUserUpload(dashboardRes.data.userPostedProductsCount);
                setTotalUpload(dashboardRes.data.totPostedProductsCount);
                setBestUploader(dashboardRes.data.bestPoster);
            }
        }
        getAllDashboardData()
    },[])
    

    return (
        <Fragment>
            <ModuleHeader moduleName={"Dashboard"}/>
            <Row >
                <Col className="mb-2" sm align="right">
                    
                    <small className="text-muted mr-2 ml-2" onClick={() => window.location.reload(false)}> <a href="#"><FaUndo /> Refresh data</a> </small>
                </Col>               
            </Row>
            <CardDeck >
                <DashCard title={"User upload"} value={userUpload} image={Upload} />
                <DashCard title={"Total upload"} value={totalUpload} image={Total} />
                <DashCard title={"Best uploader"} value={bestUploader} image={Best} />
            </CardDeck>
        </Fragment>
    )
}
