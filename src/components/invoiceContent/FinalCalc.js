import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { ToWords } from "to-words";
import SaveInvoice from "./saveInvoice";


const FinalCalc = (props) => {
    // console.log(props);
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
          currency: true,
          ignoreDecimal: false,
          ignoreZeroCurrency: false,
        }
      });

    const { rowOneAmount,
        rowTwoAmount,
        rowThreeAmount,
        rowFourAmount,
        rowFiveAmount,
        rowSixAmount,
        rowSevenAmount,
        rowEightAmount,
        rowNineAmount,
        rowTenAmount,
        rowElevenAmount,
        rowTwelveAmount,
        rowThrteenAmount,
    } = props;

    const [transport, setTransport] = useState([]);
    const [totalPackage, setTotalPackage] = useState(0);
    const [showBtn, setShowBtn] = useState(true);
    const [billTransport, setBillTransport] = useState({
        "transportName": ""
    });

    useEffect(() => {
        ipcRenderer.send("transport:load");
 
        ipcRenderer.on("transport:success", (e, data) => {
            setTransport(JSON.parse(data));
        })

    }, []);


    // console.log(billTransport);
    // console.log("sum" ,rowOneAmount + rowTwoAmount);
    const totalAmount = rowOneAmount + rowTwoAmount + rowThreeAmount + rowFourAmount + rowFiveAmount + rowSixAmount + rowSevenAmount + rowEightAmount + rowNineAmount + rowTenAmount + rowElevenAmount + rowTwelveAmount + rowThrteenAmount;
    const CGST = (totalAmount * 18) / 100;
    const SGST = (totalAmount * 18) / 100;
    const totalPackagePrice = totalPackage * 100;
    const grandTotal = totalAmount + CGST + SGST + totalPackagePrice;

     

    // console.log(totalAmount);   

     // style number value   
     const numberFormat = (value) =>
     new Intl.NumberFormat('en-IN', {
         // style: 'currency',
         currency: 'INR'
     }).format(value);
    

    return <React.Fragment>
      
        <div style={{
            // border: "1px solid black",
            height: "150px",
            borderTop:"2px solid black"
        }}>
           
        {/**Information Section */}
            <div style={{
                width: "65%",
                display: "inline-block",
                marginLeft:"2%"
            }}>
              
                <div style={{
                    width: "85%",
                    fontWeight: "bold",
                    // border: "1px solid black",
                    // padding: "2px",
                    // borderRadius: "5px",
                    fontSize: "14px",
                    letterSpacing:"1px"
                }}>
                  Account No: XXXXXXXXXXXXXXX
                </div>
                <div style={{
                    width: "85%",
                    // border: "1px solid black",
                    // borderRadius: "5px",
                    // padding: "2px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    letterSpacing:"1px"
                }}>
                    IFCCode: XXXXXX
                </div>
                <div style={{
                    width: "80%",
                    // padding: "4px",
                    // border: "1px solid black",
                    marginBottom: "2px",
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    borderRadius: "5px",
                    textAlign: "center",
                    height:"55px"
                }}>
                    {toWords.convert(grandTotal)}
                </div>
                
                <div style={{
                    width:"100%"
                }}>
                    <Table bordered responsive size="sm">
                        <thead>
                            <tr>
                                <th>SR.No</th>
                                <th>Transport Name</th>
                                <th>date</th>
                                <th>Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td width="20%">
                            <Form.Control
                                type="text"
                                style={{
                                    height: "25px",
                                    // fontWeight:"600"
                                }}
                                    />
                             </td>
                                <td width="70%">
                                    <select style={{
                                        width:"100%"
                                    }}
                                        onChange={(e) => setBillTransport({
                                            ...billTransport,
                                            transportName: e.target.value
                                    })}
                                    >
                                        <option value="0">Select</option>
                                        {transport.map((t) => {
                                            return <option value={t.transportName} key={t._id}>{ t.transportName}</option>
                                      })}
                                    </select>
                                </td>
                                <td width="15%">
                                    <Form.Control
                                        type="date"
                                        style={{
                                            height:"25px"
                                         }}
                                    />
                                </td>
                                <td width="20%">
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => { setTotalPackage(e.target.value) }}
                                        style={{
                                           height:"25px"
                                        }}
                                    />
                                </td>
                            </tr>
                           
                        </tbody>
                    </Table>
                </div>
                
            </div>
            
            
           {/**  Total Section */}

            <div style={{
                // border: "1px solid black",
                width: "30%",
                display: "inline-block",
                marginLeft:"21px"
            }}>
                <Table bordered responsive size="sm">
                    <tbody>
                        <tr>
                            <th style={{
                                width: "50%",
                                textAlign:"center"
                            }}>
                                Total
                            </th>
                            <td style={{
                                textAlign:"center"
                            }}>{ numberFormat(totalAmount) }</td>
                        </tr>
                        <tr>    
                            <th style={{
                                width: "50%",
                                textAlign:"center"
                            }}>
                                CGST 18%
                            </th>
                            <td  style={{
                                textAlign:"center"
                            }}>
                                {numberFormat(CGST)}
                            </td>
                        </tr>
                        <tr>
                            <th style={{
                                width: "50%",
                                textAlign:"center"
                            }}>
                                SGST 18%
                            </th>
                            <td  style={{
                                textAlign:"center"
                            }}>
                                {numberFormat(SGST)}
                            </td>
                        </tr>
                        <tr>
                            <th style={{
                                width: "50%",
                                textAlign:"center"
                            }}>
                                Package
                            </th>
                            <td  style={{
                                textAlign:"center"
                            }}>
                               {numberFormat(totalPackagePrice)} 
                            </td>
                        </tr>
                        <tr>
                            <th style={{
                                width: "50%",
                                textAlign:"center"
                            }}>
                                Grand Total
                            </th>
                            <td  style={{
                                textAlign: "center",
                                fontWeight:"600"
                            }}>
                                {numberFormat(grandTotal)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
           
        
        </div>

        <SaveInvoice data={props}
            transport={billTransport.transportName}
            totalPackage={totalPackage}
            totalAmount={totalAmount}
            gst={CGST}
            grandTotal={grandTotal}
        />
    
    </React.Fragment>
}

export default FinalCalc;