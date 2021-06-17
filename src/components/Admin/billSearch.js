import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SearchedBill from "./searchedBill";

const BillSearch = (props) => {
    const [showNumberSearch, setShowNumberSearch] = useState(true);
    const [showNameSearch, setShowNameSearch] = useState(false);
    const [showDateSearch, setShowDateSearch] = useState(false);
    const [billNo, setBillNo] = useState("");
    const [partyName, setPartyName] = useState("");
    const [date, setDate] = useState("");
    const [partyNameDetail, setPartyNameDetail] = useState([]);
    const [finalBill, setFinalBill] = useState([]);
    const [searchBill, setSearchBill] = useState([]);
    
    useEffect(() => {
        ipcRenderer.send("counterPartyDetail:load");

        ipcRenderer.on("counterPartyDetail:success", (e, data) => {
            setPartyNameDetail(JSON.parse(data));
        });

        ipcRenderer.send("getFinalBill:load");

        ipcRenderer.on("getFinalBill:success", (e, data) => {
            setFinalBill(JSON.parse(data));
        });

    }, []);

    // console.log(finalBill);
    
    const handleSelectChange = (e) => {
        if (e.target.value === "billName") {
            setShowNameSearch(true);
            setShowNumberSearch(false);
            setShowDateSearch(false);
        }
        else if (e.target.value === "billDate") {
            setShowNameSearch(false);
            setShowNumberSearch(false);
            setShowDateSearch(true);
        }
        else {
            setShowNameSearch(false);
            setShowNumberSearch(true);
            setShowDateSearch(false);
        }
    }

    const handleSearchByBillNumber = () => {
        // console.log("hello bill no");
        // console.log(billNo);
        let searchedBill = finalBill.filter((fb) => {
            // console.log(fb.partyDetail.billNo);
            return fb.partyDetail.billNo === parseInt(billNo);
        })
        setSearchBill(searchedBill);
    }

    // console.log(searchBill);

    const handleSearchByPartyName = () => {
        // console.log("hello from bill Name");
        let searchedBill = finalBill.filter((fb) => {
            return fb.partyDetail.partyName === partyName;
        })
        setSearchBill(searchedBill);
    }

    // console.log(searchBill);

    const handleSearchByDate = () => {
        // console.log("hello from bill date");
        // console.log(date);
        let searchedBill = finalBill.filter((fb) => {
            return fb.partyDetail.date === date;
        })
        setSearchBill(searchedBill);
    }



    return <React.Fragment>
  
    <Container style={{
        marginTop:"10px"
        }}>
            
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h3 style={{
                        borderBottom:"2px solid black"
                    }}>Search Bill</h3>
                </Col>
            </Row>
            <Row
                className="justify-content-md-center"
                style={{
                    marginTop:"10px"
                }}
            >
                <Row>
                    <Col md="4">
                    <span>Choose Category for Search: </span>
                    </Col>
                    <Col md="4">
                    <Form.Control as="select" onChange={handleSelectChange}>
                        <option value="0">Select</option>
                        <option value="billNo">Bill No</option>
                        <option value="billName">Bill Name</option>
                        <option value="billDate">Bill Date</option>
                    </Form.Control>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "10px",
                    // border: "1px solid black",
                    padding: "5px",
                    borderRadius:"5px"
                }}>
                    {showNumberSearch
                        &&
                        <React.Fragment>
                        <Row>
                           <Col md="3">
                               <Form.Label>Enter Bill No: </Form.Label>
                           </Col>
                           <Col md="5">
                               <Form.Control
                                    type="text"
                                    placeholder="Enter Bill No.."
                                    value={billNo}
                                    onChange={(e) => setBillNo(e.target.value)}
                               />
                           </Col>
                       </Row>
                       <Row className="justify-content-md-center"
                           style={{
                           marginTop:"5px"
                           }}>
                           <Col md="auto">
                                <Button
                                    variant="primary"
                                    onClick={handleSearchByBillNumber}>
                                    Search
                                </Button>
                           </Col>
                        </Row>
                        
                        {searchBill.length !== 0
                            ?
                            <SearchedBill bill={searchBill} {...props}/>
                            : null
                        }
                         
                    </React.Fragment>
                    }
                    {showNameSearch
                        &&
                        <React.Fragment>
                        <Row>
                           <Col md="3">
                               <Form.Label>Enter Party Name: </Form.Label>
                           </Col>
                           <Col md="5">
                               <Form.Control
                                   as="select"
                                    placeholder="Enter Party Name.."
                                    // value={partyName}
                                    onChange={(e) => setPartyName(e.target.value)}
                                >
                                    <option value="0">Select</option>
                                    {partyNameDetail.map((p) => {
                                        return <option value={p.partyName} key={p._id}>{p.partyName }</option>
                                    })}
                                </Form.Control>
                           </Col>
                       </Row>
                       <Row className="justify-content-md-center"
                           style={{
                           marginTop:"5px"
                           }}>
                           <Col md="auto">
                                <Button
                                    variant="primary"
                                    onClick={handleSearchByPartyName}
                                >
                                    Search
                                </Button>
                           </Col>
                        </Row>
                        {searchBill.length !== 0
                            ?
                            <SearchedBill bill={searchBill} {...props}/>
                            : null
                        }
 
                        </React.Fragment>
                    }
                    {showDateSearch
                        &&
                        <React.Fragment>
                        <Row>
                           <Col md="3">
                               <Form.Label>Enter Date: </Form.Label>
                           </Col>
                           <Col md="5">
                               <Form.Control
                                   type="date"
                                //    placeholder="Enter Party Name.."
                                    onChange={(e) => setDate(e.target.value)}
                               />
                           </Col>
                       </Row>
                       <Row className="justify-content-md-center"
                           style={{
                           marginTop:"5px"
                           }}>
                           <Col md="auto">
                                <Button
                                    variant="primary"
                                    onClick={handleSearchByDate}
                                >
                                    Search
                                </Button>
                           </Col>
                        </Row>
                        {searchBill.length !== 0
                            ?
                            <SearchedBill bill={searchBill} {...props}/>
                            : null
                        }
                          
                        </React.Fragment>
                    }
                </Row>
            </Row>
    </Container>        
        
    </React.Fragment>
}

export default BillSearch;