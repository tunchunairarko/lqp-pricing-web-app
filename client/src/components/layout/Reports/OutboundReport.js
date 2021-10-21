import React, { Fragment, useEffect, useState, useContext } from 'react'
import '../../assets/style.css';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useAlert } from 'react-alert';
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { Badge, Button, ButtonToolbar, Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import SearchBar from './SearchBar';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare, FaDownload } from 'react-icons/fa';
import cellEditFactory from 'react-bootstrap-table2-editor';
import OutboundInventoryItemsExport from './OutboundInventoryItemsExport'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

//////////////////////


///////////////////////////


export default function OutboundReport() {
    const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);
    const alert = useAlert()
    const [opinData, setOPINData] = useState([])
    const { ExportCSVButton } = CSVExport;
    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()

    /////////////////////////////
    
    const [selected, setSelected] = useState([])
    
    var d = new Date();
    var datestring = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" +
        d.getHours() + "_" + d.getMinutes();

    /////////////////////////////
    // useEffect(() => {
    //     const compMount = async () => {
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
    //                     const opinRes = await Axios.get(
    //                         // "/api/products/"+cookies.username,
    //                         "/api/outpallet/",
    //                         { headers: { "x-auth-token": token } }
    //                     )
    //                     // console.log(opinRes)
    //                     for (var i = 0; i < opinRes.data.opins.length; i++) {
    //                         opinRes.data.opins[i].downloadLink = <FaDownload />
    //                         if('items' in opinRes.data.opins[i] && opinRes.data.opins[i].items.length>0){
    //                             opinRes.data.opins[i].itemsDesign=[]
    //                             for(var j=0; j<opinRes.data.opins[i].items.length; j++){
    //                                 opinRes.data.opins[i].itemsDesign.push(<Badge style={{ backgroundColor: "#f1c40f" }} pill bg="primary">{opinRes.data.opins[i].items[j]}</Badge>)
    //                             }
    //                         }
    //                     }
    //                     setOPINData(opinRes.data.opins)

    //                 } catch (error) {
    //                     setErrorNotice("Error retrieving opins")
    //                 }
    //             }

    //         }
    //     }
    //     compMount()
    // }, [])
    const downloadFormatter = (cell, row) => {
        
        return (
            <OutboundInventoryItemsExport opin={row.opin} setErrorNotice={setErrorNotice} dt={cell}/>
            // <Fragment>
            //     {getInventoryData}
            // </Fragment>
        );
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
            setOPINData(opinData => (
                opinData.filter((value, i) => value.inventory_id !== tempid)
            ))
        }
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        style: { backgroundColor: '#c8e6c9' },
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                setSelected(selected => [...selected, row.opin])
            }
            else {
                setSelected(selected => (
                    selected.filter((value, i) => i !== selected.indexOf(row.opin))
                ))
            }
            console.log(selected)
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
        }
    };
    const columns = [{
        dataField: 'opin',
        text: 'IPIN',
    }, {
        dataField: 'username',
        text: 'Registering user',
    },
    {
        dataField: 'catalog',
        text: 'Catalog'
    },
    {
        dataField: 'ipin',
        text: 'IPIN',
        
    },
    {
        dataField: 'sale_price',
        text: 'Sale price'
    },
    {
        dataField: 'itemsDesign',
        text: 'Inventory items',
        csvExport: false
    },
    {
        dataField: 'downloadLink', //NEED TO DECIDE WHAT TO DO FROM HERE
        text: '',
        formatter: downloadFormatter,
        csvExport: false
    }

    ];
    const handleSetData = async(respData) => {
        // for (var i = 0; i < respData.opins.length; i++) {
        //     respData.opins[i].ipinCount = respData.opins[i].ipins.length
        // }
        for (var i = 0; i < respData.opins.length; i++) {
            if('sale_price' in respData.opins[i] !==true){
                respData.opins[i].sale_price=0.0
            }
            respData.opins[i].downloadLink = <FaDownload />
            if('items' in respData.opins[i] && respData.opins[i].items.length>0){
                // console.log("lkas")
                respData.opins[i].itemsDesign=[]
                for(var j=0; j<respData.opins[i].items.length; j++){
                    respData.opins[i].itemsDesign.push(<Badge style={{ backgroundColor: "#f1c40f" }} pill bg="primary">{respData.opins[i].items[j]}</Badge>)
                }
            }
        }
        setOPINData(respData.opins)
    }
    return (
        <Fragment>
            <ModuleHeader moduleName={"Incoming Pallet Report"} />
            <ToolkitProvider
                keyField="opin"
                data={opinData ? opinData : []}
                columns={columns}
                search
                exportCSV={ {
                    fileName: 'export.csv',
                    // ignoreHeader: true,
                    noAutoBOM: false,
                    onlyExportSelection: true
                }}
            >
                {
                    (props) => (
                        <Fragment >
                            <SearchBar apiRoute="outpallet" setErrorMessage={setErrorNotice} handleSetData={handleSetData}/>
                            <hr />
                            <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                            <ExportCSVButton { ...props.csvProps }> <FaFileCsv/>Export CSV</ExportCSVButton>
                                <Button variant="info" className="mr-2" onClick={() => handleItemDelete}><FaMinusSquare /> Delete</Button>
                                <Button variant="danger" onClick={() => setOPINData([])}><FaTrashAlt /> Clear Manifest</Button>

                            </ButtonToolbar>
                            <div className="table-responsive">
                                <BootstrapTable
                                    id="incoming_pallet_report_table"
                                    keyField='opin'
                                    data={opinData ? opinData : []}
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
