import React, { Fragment, useEffect, useState, useContext } from 'react'
import '../../assets/style.css';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useAlert } from 'react-alert';
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { Button, ButtonToolbar, Image, Badge } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare } from 'react-icons/fa';
import cellEditFactory from 'react-bootstrap-table2-editor';

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
    useEffect(()=>{
        const compMount = async() =>{
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
                        const loadRes = await Axios.get(
                            // "/api/products/"+cookies.username,
                            "/api/truckloads/",
                            { headers: { "x-auth-token": token } }
                        )
                        for(var i=0; i<loadRes.data.truckloads.length; i++){
                            // var temp=""
                            // var tempPallets=loadRes.data.truckloads[i].pallets
                            // console.log(tempPallets)
                            for (var j=0; j<loadRes.data.truckloads[i].pallets.length; j++){
                                loadRes.data.truckloads[i].pallets[j]=<Badge style={{backgroundColor:"#f1c40f"}} pill bg="primary">{loadRes.data.truckloads[i].pallets[j]}</Badge>
                            }
                            // console.log(temp)
                            // loadRes.data.truckloads[i].palletString=temp
                        }
                        setLoadData(loadRes.data.truckloads)                         
                        
                    } catch (error) {
                        setErrorNotice("Error retrieving truckloads")
                    }
                }
                
            }
        }
        compMount()
    },[])
    const ipinFormatter = (cell, row) => {
        return (
            <Badge bg="info">{cell}</Badge>

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
            // for(var k=0; k<loadData.length; k++){
            //     if(loadData[k].inventory_id===tempid){
            //         setLoadData(loadData =>(
            //             loadData.filter((value,i)=>i!==k)
            //         ))
            //     }
            // }
            setLoadData(loadData => (
                loadData.filter((value, i) => value.inventory_id !== tempid)
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
        dataField: 'loadNo',
        text: 'Truckload',
    },{
        dataField: 'username',
        text: 'Registering user',
    },
    {
        dataField: 'retailer',
        text: 'Retailer'
    },
    {
        dataField: 'pallets', //NEED TO DECIDE WHAT TO DO FROM HERE
        text: 'IPINS'
    }
    
    
    ];

    return (
        <Fragment>
            <ModuleHeader moduleName={"Truckload Report"} />
            <ToolkitProvider
                keyField="loadNo"
                data={loadData ? loadData : []}
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
                            <SearchBar {...props.searchProps} className="reportSearchBar"/>
                            <hr />
                            <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                                <MyExportCSV {...props.csvProps} />
                                <Button variant="info" className="mr-2" onClick={()=>handleItemDelete}><FaMinusSquare /> Delete</Button>
                                <Button variant="danger" onClick={()=>setLoadData([])}><FaTrashAlt /> Clear Manifest</Button>

                            </ButtonToolbar>
                            <div className="table-responsive">
                                <BootstrapTable
                                    id="incoming_pallet_report_table"
                                    keyField='loadNo'
                                    data={loadData ? loadData : []}
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
