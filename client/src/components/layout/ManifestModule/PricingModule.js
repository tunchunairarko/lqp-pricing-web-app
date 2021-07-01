import React, { Fragment, useEffect, useState } from 'react'
import '../../assets/style.css';
import DownloadedProductData from './DownloadedProductData';
import SearchModule from './SearchModule';
// import { Redirect } from 'react-router-dom';
// import UserContext from "../../../context/UserContext"; 
// import Dummy from '../../assets/dummy-prod.png';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import OpinIpinFields from './OpinIpinFields';
import CurrentManifest from './CurrentManifest';
import { useAlert } from 'react-alert';
import Axios from "axios";

export default function PricingModule() {
    
    const [title, setTitle] = useState("");
    const [upc, setUpc] = useState("");
    const [retail, setRetail] = useState("");
    const [image, setImage] = useState("https://cdn.shopify.com/s/files/1/0514/3520/8854/files/surplus-auction.png?v=1609197903");

    const [ipin, setIPIN] = useState("");
    const [opin, setOPIN] = useState("");
    const [location, setLocation] = useState("");
    const [load_no, setLoadNo] = useState("");
    
    const alert = useAlert()
    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()

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
        const compMount = async (e) =>{
            if (opin) {
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
                                "/api/outpallet/getitem/"+opin,
                                { headers: { "x-auth-token": token } }
                            )
                            // console.log(opinRes)
                            setIPIN(opinRes.data.item.ipin)                         
    
                        } catch (error) {
                            setErrorNotice("Error retrieving catalogs")
                        }
                    }
                }
            }
        }
        compMount()
    }, [opin])

    useEffect(()=>{
        const ipinChanged = async(e) =>{
            if (ipin) {
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
                            const ipinRes = await Axios.get(
                                "/api/inpallet/getitem/"+ipin,
                                { headers: { "x-auth-token": token } }
                            )
                            setLocation(ipinRes.data.item.location)
                            setLoadNo(ipinRes.data.item.load_no)                       
    
                        } catch (error) {
                            setErrorNotice("Error retrieving catalogs")
                        }
                    }
                }
            }
        }
        ipinChanged()
    },[ipin])

    return (
        <Fragment>

            <div>
                <ModuleHeader moduleName={"Manifest Maker"} />
                <OpinIpinFields ipin={ipin} opin={opin} setIPIN={setIPIN} setOPIN={setOPIN} setErrorNotice={setErrorNotice} load_no={load_no} location={location}/>
                <SearchModule setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setImage={setImage} />
                {/* Later on I will add context here */}
                <DownloadedProductData
                    title={title}
                    upc={upc}
                    retail={retail}
                    image={image}

                    setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setImage={setImage}
                />
                <CurrentManifest />
            </div>

        </Fragment >

    )
}
