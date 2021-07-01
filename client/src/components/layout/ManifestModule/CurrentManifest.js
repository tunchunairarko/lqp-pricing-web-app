import React, { Fragment } from 'react'
import { Button, ButtonGroup, ButtonToolbar, Row, Col, Card, } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import cellEditFactory from 'react-bootstrap-table2-editor';

export default function CurrentManifest() {
    const [cookies] = useCookies(["manifest"]);
    const { SearchBar } = Search;

    const columns = [{
        dataField: 'load_id',
        text: 'Truckload'
    }, {
        dataField: 'location_id',
        text: 'Location'
    }, {
        dataField: 'IPIN',
        text: 'Product Price'
    }, {
        dataField: 'OPIN',
        text: 'OPIN'
    }, {
        dataField: 'inventory_id',
        text: 'Lplus ID'
    }, {
        dataField: 'upc',
        text: 'UPC/ASIN/EAN'
    }, {
        dataField: 'title',
        text: 'Title'
    }, {
        dataField: 'retailer',
        text: 'Retailer'
    }, {
        dataField: 'cost_price',
        text: 'Cost Price'
    }, {
        dataField: 'unit_retail',
        text: 'Unit Retail'
    }, {
        dataField: 'quantity',
        text: 'Unit Retail'
    }, {
        dataField: 'ext_retail',
        text: 'Unit Retail'
    }, {
        dataField: 'discount',
        text: 'Discount'
    }, {
        dataField: 'sale_price',
        text: 'Sale Price'
    }
    ];
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        clickToEdit: true,
        style: { backgroundColor: '#c8e6c9' }
    };
    const cellEdit = cellEditFactory(
        {
            mode: 'dbclick',
            blurToSave: true,
            aferSaveCell: (oldValue, newValue, row, column) => {
                const datafield = column.dataField

            }
        }
    )

    return (
        <Fragment>

            <Card className="box-design mt-3 mb-3">
                <Row className="ml-3 pr-3 mt-3 ">
                    <Col xs={12} sm={12}>

                        <ToolkitProvider
                            keyField="inventory_id"
                            data={cookies.manifest ? cookies.manifest : []}
                            columns={columns}
                            search
                        >
                            {
                                props => (
                                    <Fragment >
                                        <SearchBar {...props.searchProps} />
                                        <hr />
                                        <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                                            <Button variant="success" className="mr-2"><FaFileCsv /> Export as CSV</Button>
                                            <Button variant="info" className="mr-2"><FaMinusSquare /> Delete</Button>
                                            <Button variant="danger"><FaTrashAlt /> Clear Manifest</Button>

                                        </ButtonToolbar>
                                        <div className="table-responsive">
                                            <BootstrapTable

                                                keyField='inventory_id'
                                                data={cookies.manifest ? cookies.manifest : []}
                                                columns={columns}
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
