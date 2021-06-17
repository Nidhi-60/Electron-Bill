import { ipcRenderer } from "electron";
import React from "react";
import { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";

const EditCounterPartyDetail = (props) => {
    const { data, userid } = props;


    delete data[0]._id;
    const [editData, setEditData] = useState(data[0]);

    const handleEditParty = () => {
        // console.log(id);
        ipcRenderer.send("editParty:load", { "data": editData, "userid": userid });

    }


    return <React.Fragment>
    
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
    </React.Fragment>
}

export default EditCounterPartyDetail;