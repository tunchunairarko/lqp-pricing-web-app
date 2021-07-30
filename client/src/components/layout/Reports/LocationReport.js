import React, { Fragment, useEffect, useState, useContext } from 'react'
import '../../assets/style.css';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useAlert } from 'react-alert';
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { Button, ButtonToolbar, Image, Badge, Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare } from 'react-icons/fa';
import cellEditFactory from 'react-bootstrap-table2-editor';
import LocationCard from './LocationCard';

const dummyLocations = [{
    "_id": {
      "$oid": "60b93dde9e2d5f43bcc2d44e"
    },
    "locationNo": "A-2",
    "username": "admin",
    "pallets": [
      {
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },
      {
        "_id": {
          "$oid": "6104087525d8fc1eb81124a0"
        },
        "ipin": "IP_2T8CDPET",
        "loadNo": "Ama_TKTUCMYW"
      },
      {
        "_id": {
          "$oid": "6104089a25d8fc1eb81124a3"
        },
        "ipin": "IP_80DWH24M",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "6104099bdab83b2818307c36"
        },
        "ipin": "IP_2584KDMU",
        "loadNo": "Ama_2040MXYR"
      }
    ],
    "createdAt": {
      "$date": "2021-06-03T20:38:54.767Z"
    },
    "updatedAt": {
      "$date": "2021-07-30T14:15:55.968Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "60b93dde9e2d5f43bcc2d44e"
    },
    "locationNo": "A-3",
    "username": "admin",
    "pallets": [
      {
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },{
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },{
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },
      {
        "_id": {
          "$oid": "6104087525d8fc1eb81124a0"
        },
        "ipin": "IP_2T8CDPET",
        "loadNo": "Ama_TKTUCMYW"
      },
      {
        "_id": {
          "$oid": "6104089a25d8fc1eb81124a3"
        },
        "ipin": "IP_80DWH24M",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "6104099bdab83b2818307c36"
        },
        "ipin": "IP_2584KDMU",
        "loadNo": "Ama_2040MXYR"
      }
    ],
    "createdAt": {
      "$date": "2021-06-03T20:38:54.767Z"
    },
    "updatedAt": {
      "$date": "2021-07-30T14:15:55.968Z"
    },
    "__v": 0
  },
  ,
  {
    "_id": {
      "$oid": "60b93dde9e2d5f43bcc2d44e"
    },
    "locationNo": "A-4",
    "username": "admin",
    "pallets": [
      {
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },{
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },{
        "_id": {
          "$oid": "60b93def9e2d5f43bcc2d452"
        },
        "ipin": "LQP_K50MR4PT",
        "loadNo": "Ama_TKTUCMYW"
      },
      {
        "_id": {
          "$oid": "6104087525d8fc1eb81124a0"
        },
        "ipin": "IP_2T8CDPET",
        "loadNo": "Ama_TKTUCMYW"
      },
      {
        "_id": {
          "$oid": "6104089a25d8fc1eb81124a3"
        },
        "ipin": "IP_80DWH24M",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "610408d76a6fd412f8f64aa7"
        },
        "ipin": "IP_T50P85H0",
        "loadNo": "Ama_WM5X544P"
      },
      {
        "_id": {
          "$oid": "6104099bdab83b2818307c36"
        },
        "ipin": "IP_2584KDMU",
        "loadNo": "Ama_2040MXYR"
      }
    ],
    "createdAt": {
      "$date": "2021-06-03T20:38:54.767Z"
    },
    "updatedAt": {
      "$date": "2021-07-30T14:15:55.968Z"
    },
    "__v": 0
  }]

export default function ListTruckloads() {
    const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);
    const alert = useAlert()
    const [loadData,setLoadData] = useState([])

    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()

    /////////////////////////////
    const { ExportCSVButton } = CSVExport;
    const [selected, setSelected] = useState([])
    const { SearchBar } = Search;
    var d = new Date();
    var datestring = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" +
        d.getHours() + "_" + d.getMinutes();

    /////////////////////////////
    // useEffect(()=>{
    //     const compMount = async() =>{
    //         let token = localStorage.getItem("auth-token");
    //         if (token == null) {
    //             localStorage.setItem("auth-token", "");
    //             token = "";
    //         }
    //         else {
    //             const tokenResponse = await Axios.post(
    //                 "/api/users/tokenIsValid",
    //                 null,
    //                 { headers: { "x-auth-token": token } }
    //             );
    //             if (tokenResponse.data) {
    //                 try {
    //                     const locationRes = await Axios.get(
    //                         // "/api/products/"+cookies.username,
    //                         "/api/locations/",
    //                         { headers: { "x-auth-token": token } }
    //                     )
                        
    //                     setLoadData(locationRes.data.locations)                         
                        
    //                 } catch (error) {
    //                     setErrorNotice("Error retrieving locations")
    //                 }
    //             }
                
    //         }
    //     }
    //     compMount()
    // },[])
    
    const GenLocations = () =>{
        var jum=[]
        console.log(dummyLocations.length)
        for(var i=0; i<dummyLocations.length; i++){
            // console.log(dummyLocations[i])
            try{
                jum.push(<LocationCard locationNo={dummyLocations[i].locationNo} ipins={dummyLocations[i].pallets.length}/>)
            }catch(err){
                continue
            }
        }
        return jum
    }

    const MyExportCSV = (props) => {
        const handleClick = () => {
            d = new Date();
            datestring = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" +
                d.getHours() + "_" + d.getMinutes();
            props.onExport();
        };
        return (
            <Button variant="success" className="mr-2" onClick={handleClick}><FaFileCsv /> Export as CSV</Button>
        );
    };
    

    return (
        <Fragment>
            <ModuleHeader moduleName={"Location Report"} />
            <Row>
                <GenLocations />
            </Row>
        </Fragment >

    )
}
