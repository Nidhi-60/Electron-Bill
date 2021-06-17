import { ipcRenderer } from "electron";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";


const SubHeader = (props) => {
    const { partyDetail,
        handlePartyName,
        party,
        handleBillNo,
        handleDate
    } = props;
    
    return <React.Fragment>
        {/** date & bill no */}

        <div style={{
            borderTop: "2px solid",
        }}>
        
            <div style={{
                display: "inline-block",
                marginTop:"2px"
            }}>
                <span style={{
                    marginLeft: "10px",
                    fontWeight:"bold"
                }}>
                    Bill No:
                </span>
                <span>
                    <Form.Control type="text"
                        style={{
                            display: "inline-block",
                            width: "40%",
                            marginLeft: "10px",
                            height: "30px",
                            fontSize: "17px",
                            color: "black",
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                        placeholder="Enter Bill No"
                        value={party.billNo}
                        onChange = {handleBillNo} 
                    />
                </span>
            </div>
            <div style={{
                display: "inline-block",
                // border: "1px solid black",
                marginLeft:"29%"
            }}>
                <span style={{
                    fontWeight:'bold'
                }}>
                    Date:
                </span>
                <span>
                    <Form.Control type="date"
                        required
                        style={{
                            display: "inline-block",
                            width: "70%",
                            marginLeft: "10px",
                            // height: "30px",
                            // fontSize: "13px"
                            height: "30px",
                            fontSize: "15px",
                            color: "black",
                            fontWeight: "bold"
                        }}
                        value={party.data}
                        onChange = {handleDate}
                    />
                </span>
            </div>
        </div>

        {/** Party Name */}

        <div style={{
            marginTop:"10px"
        }}>
            <div style={{
                // border: "1px solid black",
                display: "inline-block",
            }}>
                <span style={{
                    fontWeight: "bold",
                    marginLeft:"10px"
                }}>
                    M/S: 
                </span>
            </div>
            <div style={{
                display: "inline-block",
                marginLeft: '30px',
                // border: "1px solid black",
                width:"50%"
            }}>
                <span>
                    <Form.Control
                        as = "select"
                        placeholder="Enter Party Name"
                        onChange={handlePartyName}
                        style={{
                            height: "32px",
                            fontSize: "15px",
                            color: "black",
                            fontWeight: "bold"
                        }}
                    >
                        <option value="0">Select Party Name</option>
                        {partyDetail.map((p) => {
                            return <option value={p._id} key={p._id}>{ p.partyName }</option>
                        })}
                    </Form.Control>
                   
                </span>
            </div>
        </div>

        {/** Address Row */}

        <div style={{
            marginTop:"10px"
        }}>
            <div style={{
                // border: "1px solid black",
                display: "inline-block",
            }}>
                <span style={{
                    fontWeight: "bold",
                    marginLeft:"10px"
                }}>
                    Address: 
                </span>
            </div>
            <div style={{
                display: "inline-block",
                marginLeft: '30px',
                // border: "1px solid black",
                width:"50%"
            }}>
                <span>
                    <Form.Control
                        type="text"
                        placeholder="Enter Party Address"
                        style={{
                            height: "32px",
                            fontSize: "15px",
                            color: "black",
                            fontWeight: "bold"
                        }}
                        defaultValue = {party.partyAddress}
                    />
                </span>
            </div>
        </div>
        
        {/** gst no row*/}

        <div style={{
            marginTop: "10px",
            borderBottom: "2px solid"
        }}>
            <div style={{
                // border: "1px solid black",
                display: "inline-block",
            }}>
                <span style={{
                    fontWeight: "bold",
                    marginLeft:"10px"
                }}>
                    Party GST No: 
                </span>
            </div>
            <div style={{
                display: "inline-block",
                marginLeft: '30px',
                // border: "1px solid black",
                width: "50%",
            }}>
                <span>
                    <Form.Control
                        type="text"
                        placeholder="Enter GST Number"
              
                        style={{
                            height: "32px",
                            fontSize: "15px",
                            color: "black",
                            fontWeight: "bold"
                        }}
                        defaultValue={party.partyGST}
                    />
                </span>
            </div>
        </div>
     
        
    </React.Fragment>
}

export default SubHeader;