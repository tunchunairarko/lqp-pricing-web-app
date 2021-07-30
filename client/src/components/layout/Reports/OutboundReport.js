import React, { Fragment, useEffect, useState, useContext } from 'react'
import '../../assets/style.css';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useAlert } from 'react-alert';
import Axios from "axios";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FaFileCsv, FaTrashAlt, FaMinusSquare,FaDownload } from 'react-icons/fa';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { CSVLink, CSVDownload } from "react-csv";

//////////////////////

const dummyData = [{
    "_id": {
        "$oid": "60f98b8b592bb03958ce021d"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000001",
    "createdAt": {
        "$date": "2021-07-22T15:15:23.958Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:15:23.958Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98b97592bb03958ce021e"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000002",
    "createdAt": {
        "$date": "2021-07-22T15:15:35.485Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:15:35.485Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98be62d633518906a79c5"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000003",
    "createdAt": {
        "$date": "2021-07-22T15:16:54.247Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:16:54.247Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98bf5719d7418800b5607"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000004",
    "createdAt": {
        "$date": "2021-07-22T15:17:09.523Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:17:09.523Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98bfebf369e3830dc4e19"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000005",
    "createdAt": {
        "$date": "2021-07-22T15:17:18.713Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:17:18.713Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98c03bf369e3830dc4e1a"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000006",
    "createdAt": {
        "$date": "2021-07-22T15:17:23.906Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:17:23.906Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98c09bf369e3830dc4e1b"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "Health",
    "condition": "New",
    "cost_price": "34",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177",
    "sale_price": "88.5",
    "inventory_id": "LID-0000007",
    "createdAt": {
        "$date": "2021-07-22T15:17:29.141Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:17:29.141Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98d34ad15d721fc193104"
    },
    "image": "https://m.media-amazon.com/images/I/71uRjZMDlSL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B078Z7YV2P",
    "title": "INEVIFIT Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Measures Weight up to 400 lbs. Includes Batteries",
    "retailer": "Far",
    "condition": "New",
    "cost_price": "12",
    "unit_retail": "38.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "38.99",
    "sale_price": "19.495",
    "inventory_id": "LID-0000008",
    "createdAt": {
        "$date": "2021-07-22T15:22:28.743Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:22:28.743Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f98d40ad15d721fc193105"
    },
    "image": "https://m.media-amazon.com/images/I/71uRjZMDlSL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B078Z7YV2P",
    "title": "INEVIFIT Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Measures Weight up to 400 lbs. Includes Batteries",
    "retailer": "Far",
    "condition": "New",
    "cost_price": "12",
    "unit_retail": "38.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "38.99",
    "sale_price": "19.495",
    "inventory_id": "LID-0000009",
    "createdAt": {
        "$date": "2021-07-22T15:22:40.521Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:22:40.521Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f990a9451db208a065a33e"
    },
    "image": "https://m.media-amazon.com/images/I/61b23R4BXKS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07FXTB52B",
    "title": "BEAUTURAL Digital Body Weight Bathroom Scale Precision Weighing Bath Scale, Small, Step-On Technology, High Capacity - 400 lb, Large Display, Batteries and Tape Measure Included",
    "retailer": "Re",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "16.9",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "16.9",
    "sale_price": "8.45",
    "inventory_id": "LID-0000010",
    "createdAt": {
        "$date": "2021-07-22T15:37:13.365Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:37:13.365Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f990e8451db208a065a33f"
    },
    "image": "https://m.media-amazon.com/images/I/61b23R4BXKS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07FXTB52B",
    "title": "BEAUTURAL Digital Body Weight Bathroom Scale Precision Weighing Bath Scale, Small, Step-On Technology, High Capacity - 400 lb, Large Display, Batteries and Tape Measure Included",
    "retailer": "Re",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "16.9",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "16.9",
    "sale_price": "8.45",
    "inventory_id": "LID-0000011",
    "createdAt": {
        "$date": "2021-07-22T15:38:16.132Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:38:16.132Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f991548df29735e4f0fa90"
    },
    "image": "https://m.media-amazon.com/images/I/61b23R4BXKS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07FXTB52B",
    "title": "BEAUTURAL Digital Body Weight Bathroom Scale Precision Weighing Bath Scale, Small, Step-On Technology, High Capacity - 400 lb, Large Display, Batteries and Tape Measure Included",
    "retailer": "Re",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "16.9",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "16.9",
    "sale_price": "8.45",
    "inventory_id": "LID-0000012",
    "createdAt": {
        "$date": "2021-07-22T15:40:04.958Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:40:04.958Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f991a6dc8cf64f109a882c"
    },
    "image": "https://m.media-amazon.com/images/I/61b23R4BXKS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07FXTB52B",
    "title": "BEAUTURAL Digital Body Weight Bathroom Scale Precision Weighing Bath Scale, Small, Step-On Technology, High Capacity - 400 lb, Large Display, Batteries and Tape Measure Included",
    "retailer": "Re",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "16.9",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "16.9",
    "sale_price": "8.45",
    "inventory_id": "LID-0000013",
    "createdAt": {
        "$date": "2021-07-22T15:41:26.071Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:41:26.071Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9924fb344a63b8821e731"
    },
    "image": "https://m.media-amazon.com/images/I/61b23R4BXKS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07FXTB52B",
    "title": "BEAUTURAL Digital Body Weight Bathroom Scale Precision Weighing Bath Scale, Small, Step-On Technology, High Capacity - 400 lb, Large Display, Batteries and Tape Measure Included",
    "retailer": "Re",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "16.9",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "16.9",
    "sale_price": "8.45",
    "inventory_id": "LID-0000014",
    "createdAt": {
        "$date": "2021-07-22T15:44:15.307Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:44:15.307Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9927b2d3f760cc4f14cd4"
    },
    "image": "https://m.media-amazon.com/images/I/61b23R4BXKS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07FXTB52B",
    "title": "BEAUTURAL Digital Body Weight Bathroom Scale Precision Weighing Bath Scale, Small, Step-On Technology, High Capacity - 400 lb, Large Display, Batteries and Tape Measure Included",
    "retailer": "Re",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "16.9",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "16.9",
    "sale_price": "8.45",
    "inventory_id": "LID-0000015",
    "createdAt": {
        "$date": "2021-07-22T15:44:59.315Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:44:59.315Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f992b713d82111985e3275"
    },
    "image": "https://m.media-amazon.com/images/I/61USc+v7jyL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S8DWDPC",
    "title": "INEVIFIT Premium Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Precisely Measures Weight up to 400 lbs",
    "retailer": "Kiler",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "33.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "33.99",
    "sale_price": "16.995",
    "inventory_id": "LID-0000016",
    "createdAt": {
        "$date": "2021-07-22T15:45:59.423Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:45:59.423Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f992caede5f93f346b9511"
    },
    "image": "https://m.media-amazon.com/images/I/61USc+v7jyL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S8DWDPC",
    "title": "INEVIFIT Premium Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Precisely Measures Weight up to 400 lbs",
    "retailer": "Kiler",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "33.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "33.99",
    "sale_price": "16.995",
    "inventory_id": "LID-0000017",
    "createdAt": {
        "$date": "2021-07-22T15:46:18.480Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:46:18.480Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f992ebede5f93f346b9512"
    },
    "image": "https://m.media-amazon.com/images/I/61USc+v7jyL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S8DWDPC",
    "title": "INEVIFIT Premium Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Precisely Measures Weight up to 400 lbs",
    "retailer": "Kiler",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "33.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "33.99",
    "sale_price": "16.995",
    "inventory_id": "LID-0000018",
    "createdAt": {
        "$date": "2021-07-22T15:46:51.069Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:46:51.069Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9934c983d7048fc2d74de"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "",
    "condition": "New",
    "cost_price": "",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.995",
    "inventory_id": "LID-0000019",
    "createdAt": {
        "$date": "2021-07-22T15:48:28.368Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:48:28.368Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f99354983d7048fc2d74df"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Renhio",
    "condition": "New",
    "cost_price": "",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.995",
    "inventory_id": "LID-0000020",
    "createdAt": {
        "$date": "2021-07-22T15:48:36.502Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:48:36.502Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f99382983d7048fc2d74e0"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Renhio",
    "condition": "New",
    "cost_price": "4",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.995",
    "inventory_id": "LID-0000021",
    "createdAt": {
        "$date": "2021-07-22T15:49:22.708Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:49:22.708Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9939057ae9e2f285a686f"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Renhio",
    "condition": "New",
    "cost_price": "4",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.995",
    "inventory_id": "LID-0000022",
    "createdAt": {
        "$date": "2021-07-22T15:49:36.554Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:49:36.554Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f993db2c5d694690528324"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Renhio",
    "condition": "New",
    "cost_price": "4",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.995",
    "inventory_id": "LID-0000023",
    "createdAt": {
        "$date": "2021-07-22T15:50:51.017Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:50:51.017Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f993f10e6ad73ba00fad1f"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Renhio",
    "condition": "New",
    "cost_price": "4",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.995",
    "inventory_id": "LID-0000024",
    "createdAt": {
        "$date": "2021-07-22T15:51:13.691Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:51:13.691Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9943059dad718d89e37ab"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "29.99",
    "sale_price": "14.995",
    "inventory_id": "LID-0000025",
    "createdAt": {
        "$date": "2021-07-22T15:52:16.558Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:52:16.558Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9943f59dad718d89e37ac"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "1",
    "discount": "20",
    "ext_retail": "29.99",
    "sale_price": "5.997999999999999",
    "inventory_id": "LID-0000026",
    "createdAt": {
        "$date": "2021-07-22T15:52:31.819Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:52:31.819Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9945e337d6f496cfe7dad"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "1",
    "discount": "20",
    "ext_retail": "29.99",
    "sale_price": "23.991999999999997",
    "inventory_id": "LID-0000027",
    "createdAt": {
        "$date": "2021-07-22T15:53:02.100Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:53:02.100Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f99499b6e8d73cccafd424"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "1",
    "discount": "20",
    "ext_retail": "29.99",
    "sale_price": "23.99",
    "inventory_id": "LID-0000028",
    "createdAt": {
        "$date": "2021-07-22T15:54:01.048Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:54:01.048Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f994a1b6e8d73cccafd425"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "1",
    "discount": "30",
    "ext_retail": "29.99",
    "sale_price": "20.99",
    "inventory_id": "LID-0000029",
    "createdAt": {
        "$date": "2021-07-22T15:54:09.586Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:54:09.586Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f994aab6e8d73cccafd426"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "3",
    "discount": "30",
    "ext_retail": "89.97",
    "sale_price": "20.99",
    "inventory_id": "LID-0000030",
    "createdAt": {
        "$date": "2021-07-22T15:54:18.325Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:54:18.325Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f994c4b6e8d73cccafd427"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "1",
    "discount": "05",
    "ext_retail": "29.99",
    "sale_price": "28.49",
    "inventory_id": "LID-0000031",
    "createdAt": {
        "$date": "2021-07-22T15:54:44.312Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:54:44.312Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f994eafe3cd92a6412cbb9"
    },
    "image": "https://m.media-amazon.com/images/I/61v60JmrcLL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B082W886W9",
    "title": "Smart Tape Measure Body with App - RENPHO Bluetooth Measuring Tapes for Body Measuring, Weight Loss, Muscle Gain, Fitness Bodybuilding, Retractable, Measures Body Part Circumferences, Inches & cm",
    "retailer": "repho",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "29.99",
    "quantity": "2",
    "discount": "05",
    "ext_retail": "59.98",
    "sale_price": "28.49",
    "inventory_id": "LID-0000032",
    "createdAt": {
        "$date": "2021-07-22T15:55:22.799Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T15:55:22.799Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f99626c99bc401c438e094"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ds",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000033",
    "createdAt": {
        "$date": "2021-07-22T16:00:38.255Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T16:00:38.255Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9962bc99bc401c438e095"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ds",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000034",
    "createdAt": {
        "$date": "2021-07-22T16:00:43.198Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T16:00:43.198Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9962fc99bc401c438e096"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ds",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000035",
    "createdAt": {
        "$date": "2021-07-22T16:00:47.013Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T16:00:47.013Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f99635c99bc401c438e097"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ds",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000036",
    "createdAt": {
        "$date": "2021-07-22T16:00:53.119Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T16:00:53.119Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9967ac99bc401c438e098"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ds",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000037",
    "createdAt": {
        "$date": "2021-07-22T16:02:02.801Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T16:02:02.801Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f99690c99bc401c438e099"
    },
    "image": "https://m.media-amazon.com/images/I/61Iylz+aQbS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B0947G31T3",
    "title": "Accu-Measure Digital Scale - Accurate and Precise - Bathroom and Home Scale - Track Your Progress - Easy to Store - Up to 400 Pounds",
    "retailer": "",
    "condition": "New",
    "cost_price": "",
    "unit_retail": "21.5",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "21.50",
    "sale_price": "10.75",
    "inventory_id": "LID-0000038",
    "createdAt": {
        "$date": "2021-07-22T16:02:24.453Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T16:02:24.453Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d7fc305e22189051e576"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "renho",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000039",
    "createdAt": {
        "$date": "2021-07-22T20:41:32.656Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:41:32.656Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d808305e22189051e577"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "renho",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000040",
    "createdAt": {
        "$date": "2021-07-22T20:41:44.401Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:41:44.401Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d8400f416522fcdb8ed9"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "renho",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000041",
    "createdAt": {
        "$date": "2021-07-22T20:42:40.073Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:42:40.073Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d84d0f416522fcdb8eda"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "renho",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000042",
    "createdAt": {
        "$date": "2021-07-22T20:42:53.417Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:42:53.417Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d8720f416522fcdb8edc"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Hazelnut",
    "condition": "New",
    "cost_price": "hi",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000043",
    "createdAt": {
        "$date": "2021-07-22T20:43:30.752Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:43:30.752Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d87c0f416522fcdb8edd"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Hazelnut",
    "condition": "New",
    "cost_price": "hi",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000044",
    "createdAt": {
        "$date": "2021-07-22T20:43:40.086Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:43:40.086Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d88d0f416522fcdb8ede"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Hazelnut",
    "condition": "New",
    "cost_price": "hi",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000045",
    "createdAt": {
        "$date": "2021-07-22T20:43:57.298Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:43:57.298Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d8a6f3edf4492ccec500"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Hazelnut",
    "condition": "New",
    "cost_price": "hi",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000046",
    "createdAt": {
        "$date": "2021-07-22T20:44:22.953Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:44:22.953Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d8b9f3edf4492ccec501"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Hazelnut",
    "condition": "New",
    "cost_price": "hi",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000047",
    "createdAt": {
        "$date": "2021-07-22T20:44:41.420Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:44:41.420Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d8caf3edf4492ccec502"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Hazelnut",
    "condition": "New",
    "cost_price": "hi",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000048",
    "createdAt": {
        "$date": "2021-07-22T20:44:58.127Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:44:58.127Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d8e7f3edf4492ccec504"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "hja",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000049",
    "createdAt": {
        "$date": "2021-07-22T20:45:27.126Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:45:27.126Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9d92af3edf4492ccec505"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Jiniper",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000050",
    "createdAt": {
        "$date": "2021-07-22T20:46:34.709Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:46:34.709Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9da4043afdc3cecad5bb7"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "erty",
    "condition": "New",
    "cost_price": "5",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000051",
    "createdAt": {
        "$date": "2021-07-22T20:51:12.582Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:51:12.582Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9dae54be15e540c08583b"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tyuii",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000052",
    "createdAt": {
        "$date": "2021-07-22T20:53:57.913Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:53:57.913Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9dbb14be15e540c08583c"
    },
    "image": "https://m.media-amazon.com/images/I/71XBnMBFEAS._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B08Z499YYQ",
    "title": "sinocare Smart Body Fat Scale, Digital Bathroom Scales Body Fat Composition Analyzer Monitors Health Measurement for BMI, Visceral Fat, Muscle (28mm*28mm)",
    "retailer": "kil0",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "23.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "23.99",
    "sale_price": "11.99",
    "inventory_id": "LID-0000053",
    "createdAt": {
        "$date": "2021-07-22T20:57:21.219Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T20:57:21.219Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9dec6359e322bb0973be1"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "huio",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000054",
    "createdAt": {
        "$date": "2021-07-22T21:10:30.074Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:10:30.074Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9dec9359e322bb0973be2"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "huio",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000055",
    "createdAt": {
        "$date": "2021-07-22T21:10:33.789Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:10:33.789Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9decf359e322bb0973be3"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "hhjkhjHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "huio",
    "condition": "New",
    "cost_price": "3",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000056",
    "createdAt": {
        "$date": "2021-07-22T21:10:39.956Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:10:39.956Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9dff0359e322bb0973be4"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "adfa2",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000057",
    "createdAt": {
        "$date": "2021-07-22T21:15:28.332Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:15:28.332Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9e1fae96db43698a7707a"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ASa",
    "condition": "New",
    "cost_price": "1",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000058",
    "createdAt": {
        "$date": "2021-07-22T21:24:10.311Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:24:10.311Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9e261d0cc79502c8315b1"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "hui",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000059",
    "createdAt": {
        "$date": "2021-07-22T21:25:53.871Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:25:53.871Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60f9e28cd0cc79502c8315b2"
    },
    "image": "https://m.media-amazon.com/images/I/71Jo6fy1OaL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B08QRZLL55",
    "title": "GymCope Digital Scales Bathroom, Weighing Scales for Body Weight 200kg/440lb/31st Capacity, Precision Large Backlit LCD Ultra Slim Glass Weight Scale (Black)",
    "retailer": "asad",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "19.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "19.99",
    "sale_price": "9.99",
    "inventory_id": "LID-0000060",
    "createdAt": {
        "$date": "2021-07-22T21:26:36.157Z"
    },
    "updatedAt": {
        "$date": "2021-07-22T21:26:36.157Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf40c0e5d1e21a8f44317"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "TUT",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000061",
    "createdAt": {
        "$date": "2021-07-23T16:53:32.315Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T16:53:32.315Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf495e0ec3d4f34a4da91"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "TUT",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000062",
    "createdAt": {
        "$date": "2021-07-23T16:55:49.150Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T16:55:49.150Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf496e0ec3d4f34a4da92"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "TUT",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000063",
    "createdAt": {
        "$date": "2021-07-23T16:55:50.450Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T16:55:50.450Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf966022ddf16a8a9b6eb"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tyu",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000064",
    "createdAt": {
        "$date": "2021-07-23T17:16:22.355Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T17:16:22.355Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf968022ddf16a8a9b6ec"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tyu",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000065",
    "createdAt": {
        "$date": "2021-07-23T17:16:24.185Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T17:16:24.185Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf968022ddf16a8a9b6ed"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tyu",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000066",
    "createdAt": {
        "$date": "2021-07-23T17:16:24.991Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T17:16:24.991Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60faf969022ddf16a8a9b6ee"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tyu",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000067",
    "createdAt": {
        "$date": "2021-07-23T17:16:25.564Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T17:16:25.564Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0a98af83c8103c9e475c"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Term",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000068",
    "createdAt": {
        "$date": "2021-07-23T18:29:44.093Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:29:44.093Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0a99af83c8103c9e475d"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Term",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000069",
    "createdAt": {
        "$date": "2021-07-23T18:29:45.774Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:29:45.774Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0a9aaf83c8103c9e475e"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Term",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000070",
    "createdAt": {
        "$date": "2021-07-23T18:29:46.470Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:29:46.470Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0a9baf83c8103c9e475f"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "Term",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000071",
    "createdAt": {
        "$date": "2021-07-23T18:29:47.039Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:29:47.039Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bbd4b30b92bf85ac210"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tg",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000072",
    "createdAt": {
        "$date": "2021-07-23T18:34:37.595Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:34:37.595Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bbf4b30b92bf85ac211"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tg",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000073",
    "createdAt": {
        "$date": "2021-07-23T18:34:39.114Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:34:39.114Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bbf4b30b92bf85ac212"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tg",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000074",
    "createdAt": {
        "$date": "2021-07-23T18:34:39.895Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:34:39.895Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bc04b30b92bf85ac213"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "tg",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000075",
    "createdAt": {
        "$date": "2021-07-23T18:34:40.644Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:34:40.644Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bf31ea13e246cdc4b2e"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "fa",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000076",
    "createdAt": {
        "$date": "2021-07-23T18:35:31.584Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:35:31.584Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bf51ea13e246cdc4b2f"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "fa",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000077",
    "createdAt": {
        "$date": "2021-07-23T18:35:33.469Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:35:33.469Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bf51ea13e246cdc4b30"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "fa",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000078",
    "createdAt": {
        "$date": "2021-07-23T18:35:33.986Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:35:33.986Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bf61ea13e246cdc4b31"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "fa",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000079",
    "createdAt": {
        "$date": "2021-07-23T18:35:34.575Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:35:34.575Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0bf71ea13e246cdc4b32"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "fa",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000080",
    "createdAt": {
        "$date": "2021-07-23T18:35:35.097Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:35:35.097Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0c7a48719d11bcd4f923"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "uiy",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000081",
    "createdAt": {
        "$date": "2021-07-23T18:37:46.918Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:37:46.918Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0c7c48719d11bcd4f924"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "uiy",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000082",
    "createdAt": {
        "$date": "2021-07-23T18:37:48.740Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:37:48.740Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb0c7d48719d11bcd4f925"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "uiy",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000083",
    "createdAt": {
        "$date": "2021-07-23T18:37:49.834Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T18:37:49.834Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1e9ecbdc1648c8abf90b"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "gh",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177.00",
    "sale_price": "88.50",
    "inventory_id": "LID-0000084",
    "createdAt": {
        "$date": "2021-07-23T19:55:10.124Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:55:10.124Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1ea0cbdc1648c8abf90c"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "gh",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177.00",
    "sale_price": "88.50",
    "inventory_id": "LID-0000085",
    "createdAt": {
        "$date": "2021-07-23T19:55:12.566Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:55:12.566Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1ea1cbdc1648c8abf90d"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "gh",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177.00",
    "sale_price": "88.50",
    "inventory_id": "LID-0000086",
    "createdAt": {
        "$date": "2021-07-23T19:55:13.004Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:55:13.004Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1ea1cbdc1648c8abf90e"
    },
    "image": "https://m.media-amazon.com/images/I/51I9GDeTDRL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B000F63QI2",
    "title": "Health o Meter Professional 400KL Mechanical Beam Medical Scale Physician Balance",
    "retailer": "gh",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "177",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "177.00",
    "sale_price": "88.50",
    "inventory_id": "LID-0000087",
    "createdAt": {
        "$date": "2021-07-23T19:55:13.680Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:55:13.680Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1f058bb0f750c44518cd"
    },
    "image": "https://m.media-amazon.com/images/I/71uRjZMDlSL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B078Z7YV2P",
    "title": "INEVIFIT Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Measures Weight up to 400 lbs. Includes Batteries",
    "retailer": "fs",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "38.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "38.99",
    "sale_price": "19.50",
    "inventory_id": "LID-0000088",
    "createdAt": {
        "$date": "2021-07-23T19:56:53.240Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:56:53.240Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1f068bb0f750c44518ce"
    },
    "image": "https://m.media-amazon.com/images/I/71uRjZMDlSL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B078Z7YV2P",
    "title": "INEVIFIT Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Measures Weight up to 400 lbs. Includes Batteries",
    "retailer": "fs",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "38.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "38.99",
    "sale_price": "19.50",
    "inventory_id": "LID-0000089",
    "createdAt": {
        "$date": "2021-07-23T19:56:54.403Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:56:54.403Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1f078bb0f750c44518cf"
    },
    "image": "https://m.media-amazon.com/images/I/71uRjZMDlSL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B078Z7YV2P",
    "title": "INEVIFIT Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Measures Weight up to 400 lbs. Includes Batteries",
    "retailer": "fs",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "38.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "38.99",
    "sale_price": "19.50",
    "inventory_id": "LID-0000090",
    "createdAt": {
        "$date": "2021-07-23T19:56:55.210Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:56:55.210Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fb1f088bb0f750c44518d0"
    },
    "image": "https://m.media-amazon.com/images/I/71uRjZMDlSL._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B078Z7YV2P",
    "title": "INEVIFIT Bathroom Scale, Highly Accurate Digital Bathroom Body Scale, Measures Weight up to 400 lbs. Includes Batteries",
    "retailer": "fs",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "38.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "38.99",
    "sale_price": "19.50",
    "inventory_id": "LID-0000091",
    "createdAt": {
        "$date": "2021-07-23T19:56:56.073Z"
    },
    "updatedAt": {
        "$date": "2021-07-23T19:56:56.073Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8c4ed1150b187ce7eeda"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "bf",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000092",
    "createdAt": {
        "$date": "2021-07-24T21:55:26.342Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:55:26.342Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8c52d1150b187ce7eedb"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "bf",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000093",
    "createdAt": {
        "$date": "2021-07-24T21:55:30.291Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:55:30.291Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8c81d1150b187ce7eedc"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "as",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000094",
    "createdAt": {
        "$date": "2021-07-24T21:56:17.926Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:56:17.926Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8c89d1150b187ce7eedd"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "as",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000095",
    "createdAt": {
        "$date": "2021-07-24T21:56:25.971Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:56:25.971Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8ca3c078310f08c9ec1d"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "as",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000096",
    "createdAt": {
        "$date": "2021-07-24T21:56:51.983Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:56:51.983Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8ceae82fc048f88ca720"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ads",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000097",
    "createdAt": {
        "$date": "2021-07-24T21:58:02.680Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:58:02.680Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fc8ceee82fc048f88ca721"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "ads",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000098",
    "createdAt": {
        "$date": "2021-07-24T21:58:06.172Z"
    },
    "updatedAt": {
        "$date": "2021-07-24T21:58:06.172Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fd251a9778522edc9299fe"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "kkjj",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000099",
    "createdAt": {
        "$date": "2021-07-25T08:47:22.521Z"
    },
    "updatedAt": {
        "$date": "2021-07-25T08:47:22.521Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fd251d9778522edc9299ff"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "kkjj",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000100",
    "createdAt": {
        "$date": "2021-07-25T08:47:25.293Z"
    },
    "updatedAt": {
        "$date": "2021-07-25T08:47:25.293Z"
    },
    "__v": 0
}, {
    "_id": {
        "$oid": "60fd251d9778522edc929a00"
    },
    "image": "https://m.media-amazon.com/images/I/51Z7mqxKK6S._AC_UL320_.jpg",
    "load_no": "Ama_TKTUCMYW",
    "location": "A-2",
    "opin": "OP_5MU2TPDU",
    "ipin": "LQP_K50MR4PT",
    "upc": "B07S9PTLNZ",
    "title": "RENPHO Digital Bathroom Scale, Highly Accurate Body Weight Scale with Lighted LED Display, Round Corner Design, 400 lb, Black",
    "retailer": "kkjj",
    "condition": "New",
    "cost_price": "2",
    "unit_retail": "17.99",
    "quantity": "1",
    "discount": "50",
    "ext_retail": "17.99",
    "sale_price": "8.99",
    "inventory_id": "LID-0000101",
    "createdAt": {
        "$date": "2021-07-25T08:47:25.605Z"
    },
    "updatedAt": {
        "$date": "2021-07-25T08:47:25.605Z"
    },
    "__v": 0
}]

///////////////////////////


export default function OutboundReport() {
    const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);
    const alert = useAlert()
    const [opinData, setOPINData] = useState([])

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
    useEffect(() => {
        const compMount = async () => {
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
                            // "/api/products/"+cookies.username,
                            "/api/outpallet/",
                            { headers: { "x-auth-token": token } }
                        )
                        // console.log(opinRes)
                        for (var i = 0; i < opinRes.data.opins.length; i++) {
                            opinRes.data.opins[i].downloadLink = <FaDownload />
                        }
                        setOPINData(opinRes.data.opins)

                    } catch (error) {
                        setErrorNotice("Error retrieving opins")
                    }
                }

            }
        }
        compMount()
    }, [])
    const downloadFormatter = (cell, row) => {
        return (
            <CSVLink data={dummyData} className="btn btn-primary">
                {cell}
            </CSVLink>
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
                setSelected(selected => [...selected, row.opin])
            }
            else {
                // console.log(selected.indexOf(row.inventory_id))
                setSelected(selected => (
                    selected.filter((value, i) => i !== selected.indexOf(row.opin))
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
        text: 'IPIN'
    },
    {
        dataField: 'sale_price',
        text: 'Sale price'
    },
    {
        dataField: 'downloadLink', //NEED TO DECIDE WHAT TO DO FROM HERE
        text: '',
        formatter:downloadFormatter
    }

    ];

    return (
        <Fragment>
            <ModuleHeader moduleName={"Incoming Pallet Report"} />
            <ToolkitProvider
                keyField="opin"
                data={opinData ? opinData : []}
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
                            <SearchBar {...props.searchProps} className="reportSearchBar" />
                            <hr />
                            <ButtonToolbar aria-label="manifest-handler-toolbar" className="mb-2">
                                <MyExportCSV {...props.csvProps} />
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
