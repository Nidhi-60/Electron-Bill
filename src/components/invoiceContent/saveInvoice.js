import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ipcRenderer, remote } from "electron";
import { toast } from "react-toastify";
const BrowserWindow = remote.BrowserWindow;

const SaveInvoice = (props) => {
    // console.log(props);
    const { data, transport, totalPackage, totalAmount, gst, grandTotal } = props ;
    // console.log(data);
    const [finalBill, setFinalBill] = useState({
        partyDetail: {},
        item: [],
        total: "",
        gst: "",
        totalPackage: "",
        grandTotal: "",
        transportName: "",
    });
    const [printButton, setPrintButton] = useState(true);


    useEffect(() => {
        setFinalBill({
            ...finalBill,
            partyDetail: data.partyDetail,
            item: [
                data.oneItemRow,
                data.twoItemRow,
                data.threeItemRow,
                data.fourItemRow,
                data.fiveItemRow,
                data.sixItemRow,
                data.sevenItemRow,
                data.eightItemRow,
                data.nineItemRow,
                data.tenItemRow,
                data.elevenItemRow,
                data.twelveItemRow,
                data.thrteenItemRow,
            ],
            total: totalAmount,
            gst: gst,
            totalPackage: totalPackage,
            grandTotal: grandTotal,
            transportName: transport
       })
    }, [props]);
    
    // console.log(finalBill);

    // console.log(props);

    const handlePrint = () => {

        setPrintButton(false);
        ipcRenderer.send("finalBill:load", finalBill);
     
        ipcRenderer.on("finalBill:success", (e, data) => {
            // toast.success(data);
            console.log(data);
        });

        var options = {
            silent: false,
            printBackground: true,
            color: false,
            margins: { marginType: 'none' },
            landscape: false,
            pagesPerSheet: 1,
            collate: false,
            copies: 1,
            pageSize: "A4"
        }
    
    
        let win = BrowserWindow.getFocusedWindow();
        // let win = BrowserWindow.getAllWindows()[0];
        
        win.webContents.print(options, (success, failureReason) => {
            setPrintButton(true);
            if (!success) console.log(failureReason);
            console.log('Print Initiated');
            
        });


       
    }
       

    return <React.Fragment>
    
        {printButton
            &&
            <Button variant="primary" style={{
                marginTop: "20px",
                marginBottom:"5px"
            }}
            onClick={handlePrint}
            >
                Print
            </Button> 
        }
       
    
    </React.Fragment>
}

export default SaveInvoice;