import React, { Fragment, useEffect, useState, useContext } from 'react'
import '../../assets/style.css';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useAlert } from 'react-alert';
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare } from 'react-icons/fa';
import cellEditFactory from 'react-bootstrap-table2-editor';
import SearchBar from './SearchBar';

export default function ItemInventory() {
    const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);
    const alert = useAlert()
    const [itemInventoryData,setItemInventoryData] = useState([])
    const { ExportCSVButton } = CSVExport;
    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()

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
    //                     const productRes = await Axios.get(
    //                         // "/api/products/"+cookies.username,
    //                         "/api/products/",
    //                         { headers: { "x-auth-token": token } }
    //                     )
    //                     // console.log(productRes)
    //                     setItemInventoryData(productRes.data.inventoryItems)                         
                        
    //                 } catch (error) {
    //                     setErrorNotice("Error retrieving inventory items")
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
            // for(var k=0; k<itemInventoryData.length; k++){
            //     if(itemInventoryData[k].inventory_id===tempid){
            //         setItemInventoryData(itemInventoryData =>(
            //             itemInventoryData.filter((value,i)=>i!==k)
            //         ))
            //     }
            // }
            setItemInventoryData(itemInventoryData => (
                itemInventoryData.filter((value, i) => value.inventory_id !== tempid)
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
        dataField: 'image',
        text: 'Image',
        formatter: imageFormatter
    },
    {
        dataField: 'load_no',
        text: 'Truckload'
    }, {
        dataField: 'location',
        text: 'Location'
    }, {
        dataField: 'ipin',
        text: 'IPIN'
    }, {
        dataField: 'opin',
        text: 'OPIN'
    },
    {
        dataField: 'inventory_id',
        text: 'Liquidation ID'
    }, {
        dataField: 'upc',
        text: 'UPC/ASIN/EAN'
    }, {
        dataField: 'title',
        text: 'Title',
        formatter: titleFormatter
    }, {
        dataField: 'retailer',
        text: 'Retailer'
    }, {
        dataField: 'condition',
        text: 'Condition'
    }, {
        dataField: 'cost_price',
        text: 'Cost Price'
    }, {
        dataField: 'unit_retail',
        text: 'Unit Retail'
    }, {
        dataField: 'quantity',
        text: 'Quantity'
    }, {
        dataField: 'ext_retail',
        text: 'Ext Retail'
    }, {
        dataField: 'discount',
        text: 'Discount'
    }, {
        dataField: 'sale_price',
        text: 'Sale Price'
    }
    ];
    const handleSetData = async(respData) => {
        setItemInventoryData(respData.inventoryItems)
    }

    return (
        <Fragment>
            <ModuleHeader moduleName={"Inventory Item Database"} />
            <ToolkitProvider
                keyField="inventory_id"
                data={itemInventoryData ? itemInventoryData : []}
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
                            <SearchBar apiRoute="products" setErrorMessage={setErrorNotice} handleSetData={handleSetData}/>
                            <hr />
                            <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                            <ExportCSVButton { ...props.csvProps }><FaFileCsv/>Export CSV</ExportCSVButton>
                                <Button variant="info" className="mr-2" onClick={()=>handleItemDelete}><FaMinusSquare /> Delete</Button>
                            </ButtonToolbar>
                            <div className="table-responsive">
                                <BootstrapTable
                                    id="item_inventory_table"
                                    keyField='inventory_id'
                                    data={itemInventoryData ? itemInventoryData : []}
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
