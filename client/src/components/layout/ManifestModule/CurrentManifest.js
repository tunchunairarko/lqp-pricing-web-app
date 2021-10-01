import React, { Fragment,useState } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Row, Col, Card, Image} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import cellEditFactory from 'react-bootstrap-table2-editor';

export default function CurrentManifest({manifestData,setManifestData}) {
    const [cookies] = useCookies(["manifest"]);
    const { ExportCSVButton } = CSVExport;
    const [selected,setSelected]=useState([])
    const { SearchBar } = Search;
    var d = new Date();
    var datestring = d.getDate()  + "_" + (d.getMonth()+1) + "_" + d.getFullYear() + "_" +
    d.getHours() + "_" + d.getMinutes();


    
    const imageFormatter=(cell, row)=>{
        return (<Image src={cell} fluid/>) ;
        // <span className="manifestTitleEle">
        //         {cell}
        //     </span>
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
        return(
            <span className="manifestTitleEle">
                {cell}
            </span>
        )
    }
    
    const handleItemDelete = () =>{
        for(var j=0; j<selected.length; j++){
            var tempid=selected[j]
            // for(var k=0; k<manifestData.length; k++){
            //     if(manifestData[k].inventory_id===tempid){
            //         setManifestData(manifestData =>(
            //             manifestData.filter((value,i)=>i!==k)
            //         ))
            //     }
            // }
            setManifestData(manifestData =>(
                manifestData.filter((value,i)=>value.inventory_id!==tempid)
            ))
        }
    }

    const MyExportCSV = (props) => {
        const handleClick = () => {
            d = new Date();
            datestring = d.getDate()  + "_" + (d.getMonth()+1) + "_" + d.getFullYear() + "_" +
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
            if(isSelect){
                setSelected(selected => [...selected, row.inventory_id])
            }
            else{
                // console.log(selected.indexOf(row.inventory_id))
                setSelected(selected =>(
                    selected.filter((value,i)=>i!==selected.indexOf(row.inventory_id))
                ))
            }
            console.log(selected)
            // console.log(row.inventory_id);
            // console.log(isSelect);
            // console.log(rowIndex);
            // console.log(e);
          },
          onSelectAll: (isSelect, rows, e) => {
            if(isSelect){
                for(const [index,values] of rows.entries()){
                    setSelected(selected => [...selected, values.inventory_id])
                }
            }
            else{
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
        formatter:imageFormatter
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
        formatter:titleFormatter
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
    
    
    return (
        <Fragment>

            <Card className="box-design mt-3 mb-3">
                <Row className="ml-3 pr-3 mt-3 ">
                    <Col xs={12} sm={12}>

                        <ToolkitProvider
                            keyField="inventory_id"
                            data={manifestData ? manifestData : []}
                            columns={columns}
                            search
                        >
                            {
                                (props) => (
                                    <Fragment >
                                        <SearchBar {...props.searchProps} style={{minWidth:"100%"}}/>
                                        <hr />
                                        <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                                            <MyExportCSV { ...props.csvProps }/>
                                            <Button variant="info" className="mr-2" onClick={()=>handleItemDelete}><FaMinusSquare /> Delete</Button>
                                            <Button variant="danger" onClick={()=>setManifestData([])}><FaTrashAlt /> Clear Manifest</Button>

                                        </ButtonToolbar>
                                        <div className="table-responsive">
                                            <BootstrapTable
                                                {...props.baseProps}
                                                id="manifest_table"                                                
                                                selectRow={selectRow}
                                                cellEdit={cellEdit}
                                                filter={filterFactory()}
                                                pagination={paginationFactory()}
                                                
                                            />
                                        </div>
                                    </Fragment>
                                )
                            }

                        </ToolkitProvider>

                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
