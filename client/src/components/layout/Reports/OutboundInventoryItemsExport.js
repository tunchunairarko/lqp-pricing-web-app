import React, { Fragment, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import exportFromJSON from 'export-from-json'
import Axios from 'axios'

export default function OutboundInventoryItemsExport({ opin, setErrorNotice, dt }) {
    const [itemData, setItemData] = useState([])
    const exportType = exportFromJSON.types.csv
    // useEffect(()=>{
    //     const getInventoryData = async () => {

    //     }
    //     getInventoryData()
    // },[opin])

    const downloadCSV = async () => {
        // console.log(itemData)
        let token = localStorage.getItem("auth-token");
        try {
            const inventoryRes = await Axios.get(
                // "/api/products/"+cookies.username,
                "/api/products/getopin/" + opin,
                { headers: { "x-auth-token": token } }
            )
            const filename = opin + '.csv'
            const data=inventoryRes.data.inventoryItems
            exportFromJSON({ data, filename, exportType })
            // setItemData(inventoryRes.data.inventoryItems)


        } catch (error) {
            setErrorNotice("Error exporting csv")
        }
        

        // // return(
        // //     <CSVDownload data={itemData} target="_blank" />
        // // )
    }

    return (
        <Fragment>
            <Button variant="primary" onClick={() => downloadCSV()}>
                {dt}
            </Button>
        </Fragment>
    )
}
