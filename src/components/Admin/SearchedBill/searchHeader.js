import React from "react";
import { Form } from "react-bootstrap";

const SearchHeader = (props) => {
    // console.log(props);
    const { bill } = props;
    // console.log(bill);
    return <React.Fragment>
        {
            bill.length !== 0
            &&
        
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
                                defaultValue={bill[0].partyDetail.billNo}
                    />
                  </span>
                </div>
                <div style={{
                    display: "inline-block",
                    // border: "1px solid black",
                    marginLeft:"20%"
                }}>
                    <span style={{
                        fontWeight:'bold'
                    }}>
                            Date:
                    </span>
                    <span>
                        <Form.Control type="text"
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
                            defaultValue={bill[0].partyDetail.date}
                        />
                    </span>
                </div>
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
                                    type = "text"
                                    placeholder="Enter Party Name"
                                    style={{
                                        height: "32px",
                                        fontSize: "15px",
                                        color: "black",
                                        fontWeight: "bold"
                                }}
                                defaultValue={bill[0].partyDetail.partyName}
                                >
                                </Form.Control>
                            </span>
                        </div>
                    </div>
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
                                defaultValue={bill[0].partyDetail.partyAddress}
                                />
                            </span>
                        </div>
                    </div>
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
                                defaultValue={bill[0].partyDetail.partyGST}
                                />
                            </span>
                        </div>
                    </div>
            </div>
        }
    </React.Fragment>;
}

export default SearchHeader;