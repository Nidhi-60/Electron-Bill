import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
    return <React.Fragment>
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <span
                        style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        fontVariant: "petite-caps",
                        marginLeft:"35%"
                    }}>
                    || Shree Ganeshay Namah ||
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <span
                        style={{
                        fontSize: "15px",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        letterSpacing: "1px"
                    }}>
                    GST No: 24AIGPM5571J1Z1
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>   
                <div
                    style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                        marginLeft:"80%"    
                }}>
                    Retail/Tax Invoice
                </div>
                <div
                style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    marginLeft:"80%"
                }}
                >
                    Original/Duplicate
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div
                        style={{
                        fontWeight: "bold",
                        letterSpacing:"1px"
                    }}>
                        Specialist in : - 
                    </div>
                    <div style={{
                        fontWeight: "bold",
                        letterSpacing:"1px"
                    }}>
                        G. M. Bushes & Submarsible Parts
                    </div>
                </Col>
                <Col>
                    <div
                        style={{
                            marginLeft: "40%",
                            fontSize: "30px",
                            textDecoration: "underline",
                            letterSpacing:"1px"
                    }}>
                        PARSWANATH
                    </div>
                    <div
                        style={{
                            marginLeft: "45%",    
                            fontSize: "30px",
                            textDecoration: "underline",
                            letterSpacing:"1px"
                    }}
                    >
                        ENTERPRISE
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{
                        marginLeft: "56%",
                        fontWeight:"bold"
                    }}>
                        Bordi Pado, Ratan Pole, PATAN - 384265
                    </div>
                    <div style={{
                        marginLeft: "76%",
                        fontWeight:"bold"
                    }}>
                        Mobile : - 9427405812
                    </div>
                </Col>
            </Row>
            
        </Container>
        
    </React.Fragment>
}

export default Header;