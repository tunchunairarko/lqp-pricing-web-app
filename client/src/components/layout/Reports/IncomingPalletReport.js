import React, { Fragment, useEffect, useState, useContext } from 'react'
import '../../assets/style.css';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useAlert } from 'react-alert';
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import SearchBar from './SearchBar';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare } from 'react-icons/fa';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

export default function IncomingPalletReport() {
    
    const alert = useAlert()
    const [ipinData,setIPINData] = useState([])
    const { ExportCSVButton } = CSVExport;
    const [errorNotice, setErrorNotice] = useState("")
    const [successNotice, setSuccessNotice] = useState("")

    /////////////////////////////
    
    const [selected, setSelected] = useState([])
    
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
    //                     const ipinRes = await Axios.get(
    //                         // "/api/products/"+cookies.username,
    //                         "/api/inpallet/",
    //                         { headers: { "x-auth-token": token } }
    //                     )
    //                     // console.log(ipinRes)
    //                     setIPINData(ipinRes.data.ipins)                         
                        
    //                 } catch (error) {
    //                     setErrorNotice("Error retrieving ipins")
    //                 }
    //             }
                
    //         }
    //     }
    //     compMount()
    // },[])
    const imageFormatter = (cell, row) => {
        return (<Image src={cell} fluid />);
    }
    const cellEdit = cellEditFactory(
        {
            mode: 'dbclick',
            blurToSave: true,
            aferSaveCell: (oldValue, newValue, row, column) => {
                const datafield = column.dataField

            }
        }
    )
    const titleFormatter = (cell, row) => {
        return (
            <span className="manifestTitleEle">
                {cell}
            </span>
        )
    }

    const handleItemDelete = () => {
        for (var j = 0; j < selected.length; j++) {
            var tempid = selected[j]
            // for(var k=0; k<ipinData.length; k++){
            //     if(ipinData[k].inventory_id===tempid){
            //         setIPINData(ipinData =>(
            //             ipinData.filter((value,i)=>i!==k)
            //         ))
            //     }
            // }
            setIPINData(ipinData => (
                ipinData.filter((value, i) => value.inventory_id !== tempid)
            ))
        }
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

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        style: { backgroundColor: '#c8e6c9' },
        onSelect: (row, isSelect, rowIndex, e) => {
            // console.log(isSelect)
            if (isSelect) {
                setSelected(selected => [...selected, row.inventory_id])
            }
            else {
                // console.log(selected.indexOf(row.inventory_id))
                setSelected(selected => (
                    selected.filter((value, i) => i !== selected.indexOf(row.inventory_id))
                ))
            }
            console.log(selected)
            // console.log(row.inventory_id);
            // console.log(isSelect);
            // console.log(rowIndex);
            // console.log(e);
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                for (const [index, values] of rows.entries()) {
                    setSelected(selected => [...selected, values.inventory_id])
                }
            }
            else {
                setSelected([])
            }
            console.log(selected)
            // console.log(isSelect);
            // console.log(rows);
            // console.log(e);
        }
    };
    const columns = [{
        dataField: 'ipin',
        text: 'IPIN',
    },{
        dataField: 'username',
        text: 'Registering user',
    },
    {
        dataField: 'location',
        text: 'Location'
    },
    {
        dataField: 'load_no',
        text: 'Truckload'
    },
    {
        dataField: 'retailer',
        text: 'Retailer'
    },
    {
        dataField: 'cost_price',
        text: 'Cost price'
    }
    
    
    ];
    const handleSetData = async(respData) => {
        for(var i=0; i<respData.ipins.length; i++){
            if('retailer' in respData.ipins[i] !==true || respData.ipins[i].retailer==null){
                respData.ipins[i].retailer="NWO"
            }
            if('cost_price' in respData.ipins[i] !==true || respData.ipins[i].cost_price==null){
                respData.ipins[i].cost_price="0.0"
            }
        }
        setIPINData(respData.ipins)
    }
    return (
        <Fragment>
            <ModuleHeader moduleName={"Incoming Pallet Report"} />
            <ToolkitProvider
                keyField="ipin"
                data={ipinData ? ipinData : []}
                columns={columns}
                search
            // exportCSV={ {
            //     fileName: 'export.csv',
            //     // ignoreHeader: true,
            //     noAutoBOM: false
            // }
            >
                {
                    (props) => (
                        <Fragment >
                            <SearchBar className="reportSearchBar" apiRoute="inpallet" setErrorMessage={setErrorNotice} handleSetData={handleSetData}/>
                            <hr />
                            <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                            <ExportCSVButton { ...props.csvProps }><FaFileCsv/>Export CSV</ExportCSVButton>
                                <Button variant="info" className="mr-2" onClick={()=>handleItemDelete}><FaMinusSquare /> Delete</Button>
                                <Button variant="danger" onClick={()=>setIPINData([])}><FaTrashAlt /> Clear Manifest</Button>

                            </ButtonToolbar>
                            <div className="table-responsive">
                                <BootstrapTable
                                    id="incoming_pallet_report_table"
                                    keyField='ipin'
                                    data={ipinData ? ipinData : []}
                                    columns={columns}
                                    selectRow={selectRow}
                                    cellEdit={cellEdit}
                                    filter={filterFactory()}
                                    pagination={paginationFactory()}
                                    {...props.baseProps}
                                />
                            </div>
                        </Fragment>
                    )
                }

            </ToolkitProvider>
        </Fragment >

    )
}
