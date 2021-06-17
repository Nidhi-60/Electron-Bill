import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const SearchedBill = (props) => {
    // console.log(props);
    const { bill } = props;
    const [newBill, setNewBill] = useState(bill);
    console.log(newBill);

    const handleDeleteBill = (id) => {
        ipcRenderer.send("deleteFinalBill:load", id);

        ipcRenderer.on("deleteFinalBill:success", () => {
            // console.log(message);
            toast.warning("Bill deleted");

            let b = newBill.filter((bi) => {
                return bi._id !== id;
            })

            setNewBill(b);
        });
        
    }


    return <React.Fragment> 
        <Container style={{
            marginTop:"15px"
        }}>
        
            <Row>
            {newBill.map((b) => {
                return <Col md="4" style={{
                    border: "1px solid black",
                    marginLeft: "15px",
                    borderRadius: "5px",
                    padding: "5px",
                    marginBottom:"10px"
                }}
                key={b._id} 
                >
                       
                    <div>Bill No: { b.partyDetail.billNo}</div>
                    <div>Party Name: { b.partyDetail.partyName}</div>
                    <div>Date: { b.partyDetail.date}</div>
                    <div>Total: { b.grandTotal}</div>
                    <div>
                        <Button
                            variant="warning"
                            onClick={() => props.handleSearchBill(b._id)}
                        >
                            view
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleDeleteBill(b._id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Col>
            })}
            </Row>
        </Container>
    </React.Fragment>
}

export default SearchedBill;