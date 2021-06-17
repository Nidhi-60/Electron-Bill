import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const CounterParty = () => {
    const [counterParty, setCounterParty] = useState([]);
    const [view, setView] = useState("add");
    const [editData, setEditData] = useState({});
    const [partyDetail, setPartyDetail] = useState({
        partyName: "",
        partyAddress: "",
        partyGST: ""
    });


    useEffect(() => {
        ipcRenderer.send("counterPartyDetail:load");

        ipcRenderer.on("counterPartyDetail:success", (e, data) => {
            setCounterParty(JSON.parse(data));
        });
    }, []);

    // console.log(counterParty);

    // add party detail
    const handleAddParty = (e) => {
        e.preventDefault();
        ipcRenderer.send("addParty:load", partyDetail);

        ipcRenderer.on("addParty:success", (e, data) => {
            // console.log(data);
            setCounterParty([...counterParty, data]);
        });

        toast.info("party data added..");
    };

   //    delete party detail
    const handleDelete = (e, id) => {
        e.preventDefault();
        ipcRenderer.send("partyDelete:load", id);

        ipcRenderer.on("partyDelete:success", () => {
            let newDoc = counterParty.filter((c) => {
                return c._id !== id;
            });
            setCounterParty(newDoc);
        });

        toast.warning("Party data deleted..");
    }
    
    // edit Party detail
    const handleEdit = (id) => {
        setView("edit");
        let party = counterParty.filter((c) => {
            return c._id === id;
        })

        // console.log(party[0]);
        setEditData(party[0]); 
    }

    const handleEditParty = () => {
        // console.log(id);
        ipcRenderer.send("editParty:load", editData );

        ipcRenderer.send("counterPartyDetail:load");

        ipcRenderer.on("counterPartyDetail:success", (e, data) => {
            setCounterParty(JSON.parse(data));
        });

        setEditData({
            partyName: "",
            partyAddress: "",
            partyGST: ""
        });
        toast.success("Party data Updated..");
    }

   
    // console.log("main called");

    // console.log(partyDetail);

    return <React.Fragment>
        
        {view === "edit" ?


        <Container style={{
            marginTop:"10px"
            }}>
        
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h3 style={{
                        borderBottom:"2px solid black"
                    }}>Counter Party Detail</h3>
                </Col>
            </Row>
    
            <Row className="justify-content-md-center" style={{
                border: "1px solid black",
                marginTop: "15px",
                padding: "5px",
                borderRadius:"5px"
            }}>
                
                <Row style={{
                    marginBottom: "15px",
                    marginTop:"10px"
                }}>
                    <Col md="3">
                        <Form.Label style={{
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            fontSize: "17px"
                        }}>
                          Party Name:
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Party Name"
                            name="partyName"
                            value={editData.partyName}
                            onChange={(e) => setEditData({...editData, partyName: e.target.value})}
                        />
                    </Col>
                </Row>
                <Row style={{
                    marginBottom:"15px"
                }}>
                    <Col md="3">
                        <Form.Label style={{
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            fontSize: "17px"
                        }}>
                            Address : 
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter Party Address"
                            name="partyAddress"
                            value={editData.partyAddress}
                            onChange={(e) => setEditData({...editData, partyAddress:e.target.value})}
                        />
                    </Col>
                </Row>
    
                <Row style={{
                    marginBottom:"15px"
                }}>
                    <Col md="3">
                        <Form.Label style={{
                            fontWeight: "bold",
                            letterSpacing: "1px",
                            fontSize: "17px"
                        }}>
                            GST No : 
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter GST Number"
                            name="partyGST"
                            value={editData.partyGST}
                            onChange={(e) => setEditData({...editData, partyGST:e.target.value})}
                        />
                    </Col>
                </Row>
    
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Button
                            variant="primary"
                            onClick={handleEditParty}
                        >
                            Edit Data
                        </Button>
                    </Col>
                </Row>
               
            </Row>
        
        </Container>
            
            
            
            :
            
            // add party detail

            <Container style={{
                marginTop:"10px"
            }}>
            
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h3 style={{
                            borderBottom:"2px solid black"
                        }}>Counter Party Detail</h3>
                    </Col>
                </Row>
    
                <Row className="justify-content-md-center" style={{
                    border: "1px solid black",
                    marginTop: "15px",
                    padding: "5px",
                    borderRadius:"5px"
                }}>
                    
                    <Row style={{
                        marginBottom: "15px",
                        marginTop:"10px"
                    }}>
                        <Col md="3">
                            <Form.Label style={{
                                fontWeight: "bold",
                                letterSpacing: "1px",
                                fontSize: "17px"
                            }}>
                              Party Name:
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Enter Party Name"
                                name="partyName"
                                value={partyDetail.partyName}
                                onChange={(e) => setPartyDetail({...partyDetail, partyName: e.target.value})}
                            />
                        </Col>
                    </Row>
                    <Row style={{
                        marginBottom:"15px"
                    }}>
                        <Col md="3">
                            <Form.Label style={{
                                fontWeight: "bold",
                                letterSpacing: "1px",
                                fontSize: "17px"
                            }}>
                                Address : 
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Enter Party Address"
                                name="partyAddress"
                                value={partyDetail.partyAddress}
                                onChange={(e) => setPartyDetail({...partyDetail, partyAddress:e.target.value})}
                            />
                        </Col>
                    </Row>
    
                    <Row style={{
                        marginBottom:"15px"
                    }}>
                        <Col md="3">
                            <Form.Label style={{
                                fontWeight: "bold",
                                letterSpacing: "1px",
                                fontSize: "17px"
                            }}>
                                GST No : 
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Enter GST Number"
                                name="partyGST"
                                value={partyDetail.partyGST}
                                onChange={(e) => setPartyDetail({...partyDetail, partyGST:e.target.value})}
                            />
                        </Col>
                    </Row>
    
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                variant="primary"
                                onClick={handleAddParty}
                            >
                                Add Data
                            </Button>
                        </Col>
                    </Row>
                   
                </Row>
            
            </Container>
        }
      
     {/**Display detail */}

        <Container style={{
            marginTop:"30px"
        }}>
            <Row className="justify-content-md-center">
            <Col md="auto">
                <h3 style={{
                    borderBottom:"2px solid black"
                    }}>
                   Party List   
                </h3>
            </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Table bordered responsive>
                        <thead>
                           <tr>
                               <th style={{
                                    textAlign: "center",
                                    width:"30%"
                                }}>
                                    Name
                                </th>
                               <th style={{
                                    textAlign: "center",
                                   width:"30%"
                                }}>
                                    Address
                                </th>
                                <th style={{
                                    textAlign:"center"
                                }}>
                                    GST No
                                </th>
                                <th colSpan="2" style={{
                                    textAlign:"center"
                                }}>
                                    Action
                                </th>
                           </tr>
                        </thead>
                        <tbody>
                            {counterParty.map((cp) => {
                                return <tr key={cp._id}>
                                    <td style={{
                                        textAlign:"center",
                                        fontSize:"16px",
                                        letterSpacing:"1px"
                                    }}>
                                        {cp.partyName}
                                    </td>
                                    <td style={{
                                        textAlign:"center",
                                        fontSize:"16px",
                                        letterSpacing:"1px"
                                    }}>
                                        {cp.partyAddress}
                                    </td>
                                    <td style={{
                                        textAlign:"center",
                                        fontSize:"16px",
                                        letterSpacing:"1px"
                                    }}>
                                        {cp.partyGST}
                                    </td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            onClick={() => handleEdit(cp._id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={(e) => handleDelete(e,cp._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        
        
    </React.Fragment>
}

export default CounterParty;