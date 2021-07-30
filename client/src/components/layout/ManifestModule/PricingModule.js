import React, { Fragment, useEffect, useState, useContext } from 'react'
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
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";

export default function PricingModule() {
    const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);
    const [title, setTitle] = useState("");
    const [upc, setUpc] = useState("");
    const [retail, setRetail] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [image, setImage] = useState("https://cdn.shopify.com/s/files/1/0514/3520/8854/files/surplus-auction.png?v=1609197903");
    const [condition, setCondition] = useState('New');
    const [ipin, setIPIN] = useState("");
    const [opin, setOPIN] = useState("");
    const [location, setLocation] = useState("");
    const [load_no, setLoadNo] = useState("");
    const [retailer, setRetailer] = useState("");

    const [inventoryId,setInventoryId] = useState("")
    const alert = useAlert()
    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()
    const [quantity, setQuantity] = useState(1);
    const [discount, setDiscount] = useState(50);
    const [manifestData,setManifestData] = useState([])
    const [compLoad,setCompLoad] = useState(false)

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

    useEffect(()=>{
        const onLoad = () =>{
            if(localStorage.getItem("manifestData")!==null){
                setManifestData(JSON.parse(localStorage.getItem("manifestData")))
                setCompLoad(true)
            }
        }  
        onLoad()
    },[])
    useEffect(()=>{
        const updateLocalDb = () =>{            
            if(compLoad===true){
                var dat=JSON.stringify(manifestData)
                localStorage.setItem("manifestData",dat)
            }            
        }
        updateLocalDb()
    },[manifestData])
    
    const handleInventoryUpdate = async (trigger) =>{
        if(trigger==true){
            const product={
                image:image,
                load_no:load_no,
                location:location,
                opin:opin,
                ipin:ipin,
                // inventory_id:inventoryId,
                upc:upc,
                title:title,
                retailer:retailer,
                condition:condition,
                cost_price:costPrice,
                unit_retail:retail,
                quantity:quantity,
                discount: discount,
                ext_retail: Number(parseFloat(retail) * quantity).toFixed(2),
                sale_price: Number(parseFloat(retail) * (100-parseInt(discount)) / 100).toFixed(2)
            }
            
            try {
                const username = cookies.username;
                const inventoryItem = product;
                let data = { username, inventoryItem }
                // console.log(data)
                const resp = await Axios.post(`/api/products/new`, data, { headers: { "x-auth-token": userData.token } });
                const result = resp.data
                console.log(result)
                const item={
                    image:result.image,
                    load_no:result.load_no,
                    location:result.location,
                    opin:result.opin,
                    ipin:result.ipin,
                    inventory_id:result.inventory_id,
                    upc:result.upc,
                    title:result.title,
                    retailer:result.retailer,
                    condition:result.condition,
                    cost_price:result.cost_price,
                    unit_retail:result.unit_retail,
                    quantity:result.quantity,
                    discount: result.discount,
                    ext_retail: result.ext_retail,
                    sale_price: result.sale_price
                }
                setManifestData(manifestData => [...manifestData, item])
                setSuccessNotice("Item registered successfully. " + " Inventory ID: " + result.inventory_id);
                // clearAll();
            } catch (err) {
                console.log(err)
                setErrorNotice("Error in posting product")
            }
            // setManifestData(manifestData => [...manifestData, product])

        }
    }

    return (
        <Fragment>

            <div>
                <ModuleHeader moduleName={"Manifest Maker"} />
                <OpinIpinFields ipin={ipin} opin={opin} setIPIN={setIPIN} setOPIN={setOPIN} setErrorNotice={setErrorNotice} load_no={load_no} location={location}/>
                <SearchModule setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setImage={setImage} setRetailer={setRetailer}/>
                {/* Later on I will add context here */}
                <DownloadedProductData
                    title={title}
                    upc={upc}
                    retail={retail}
                    image={image}
                    // load_no={load_no}
                    // ipin={ipin}
                    // opin={opin}
                    // location={location}
                    costPrice={costPrice}
                    setCostPrice={setCostPrice}
                    retailer={retailer}
                    setRetailer={setRetailer}
                    setInventoryId={setInventoryId}
                    handleInventoryUpdate = {handleInventoryUpdate}
                    condition={condition}
                    setCondition={setCondition}
                    setDiscount={setDiscount}
                    discount={discount}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    setTitle={setTitle} setRetail={setRetail} setUpc={setUpc} setImage={setImage}
                />
                <CurrentManifest manifestData={manifestData} setManifestData={setManifestData}/>
            </div>

        </Fragment >

    )
}
