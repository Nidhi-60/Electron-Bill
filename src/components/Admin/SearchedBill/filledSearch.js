import { ipcRenderer, remote } from "electron";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Header from "../../InvoiceHeader/header";
import SearchFinalCalc from "./searchFinalCalc";
import SearchHeader from "./searchHeader";
import SearchItem from "./searchItem";
const BrowserWindow = remote.BrowserWindow;

const FilledSearch = (props) => {
    // console.log(props);
    const { id } = props;
    const [bill, setBill] = useState([]);
    const [printButton, setPrintButton] = useState(true);

    useEffect(() => {
        ipcRenderer.send("billById:load", id);

        ipcRenderer.on("billById:success", (e, data) => {
            // console.log(data);
            setBill(data);
        })

    }, []);


    const handlePrint = () => {
        setPrintButton(false);
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

   
    // setShowBtn(true);

    // console.log(bill[0]);

    return <React.Fragment>
    <div style={{
        height: "1060px",
        width:"800px",
        border: "2px solid black",
        marginLeft: "10px",
        marginTop:"5px"
        }}>
            <Header />
            <SearchHeader bill={bill} />
            <SearchItem bill={bill} />
            <SearchFinalCalc bill={bill} />
        </div> 
    
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

export default FilledSearch;