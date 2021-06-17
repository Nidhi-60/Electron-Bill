import React from "react";
import { Form, Table } from "react-bootstrap";
import { ToWords } from "to-words";

const SearchFinalCalc = (props) => {

    const { bill } = props;

    console.log(bill);
 
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
          currency: true,
          ignoreDecimal: false,
          ignoreZeroCurrency: false,
        }
    });


     // style number value   
     const numberFormat = (value) =>
     new Intl.NumberFormat('en-IN', {
         // style: 'currency',
         currency: 'INR'
     }).format(value);

    return <React.Fragment>
        {
            bill.length !== 0
            &&
            
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
                       {toWords.convert(bill[0].grandTotal)}
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
                                <td width="10%">
                                <Form.Control
                                    type="text"
                                    style={{
                                        height: "25px",
                                        // fontWeight:"600"
                                    }}
                                        />
                                 </td>
                                    <td style={{
                                        width:"40%"
                                    }}>
                                       {bill[0].transportName}
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            style={{
                                                height:"25px"
                                            }}
                                            defaultValue={bill[0].partyDetail.date}
                                        />
                                    </td>
                                    <td width="5%">
                                        <Form.Control
                                            type="text"
                                            style={{
                                               height:"25px"
                                            }}
                                            defaultValue={bill[0].totalPackage}
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
                                }}>{ numberFormat(bill[0].total) }</td>
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
                                   {numberFormat(bill[0].gst)}
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
                                {numberFormat(bill[0].gst)} 
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
                                {numberFormat(bill[0].totalPackage * 100)}
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
                                {numberFormat(bill[0].grandTotal)} 
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            
            </div>
        }
    </React.Fragment>
}

export default SearchFinalCalc;