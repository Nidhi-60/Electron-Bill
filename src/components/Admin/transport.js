import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const Transport = () => {
  const [transport, setTransport] = useState([]);
  const [view, setView] = useState("add");
  const [editData, setEditData] = useState({});
  const [transportDetail, setTransportDetail] = useState({
    transportName: ""
  });

  useEffect(() => {
    ipcRenderer.send("transport:load");

    ipcRenderer.on("transport:success", (e, data) => {
        setTransport(JSON.parse(data));
    });
  }, []);

  const handleAddTransport = () => {
    ipcRenderer.send("addTransport:load", (transportDetail));

    ipcRenderer.on("addTransport:success", (e, data) => {
      setTransport([...transport, JSON.parse(data)]);
    });

    toast.info("Transport added..");
    setTransportDetail({ ...transportDetail, transportName: "" });

  }

  // edit data
  const handleEdit = (id) => {
    setView("edit");
    let d = transport.filter((t) => {
      return t._id === id;
    });
    setEditData(d[0]);
  }

  // update data
  const handleUpdate = () => {
    ipcRenderer.send("updateTransport:load", (editData));

    ipcRenderer.send("transport:load");

    ipcRenderer.on("transport:success", (e, data) => {
        setTransport(JSON.parse(data));
    });

    toast.success("Transport Data Updated..");

    setEditData({
      transportName: ""
    });

  }

  // delete data
  const handleDelete = (id) => {
    ipcRenderer.send("deleteTransport:load", id);

    ipcRenderer.on("deleteTransport:success", () => {
      let d = transport.filter((t) => {
        return t._id !== id;
      })
      
      toast.warning("delete transport");
      setTransport(d);

    })
  }

  // console.log(editData);
  
  return <React.Fragment>
     
    {view === "edit"
      ?
      // edit Tranport Page
      <Container style={{
        marginTop:"10px"
        }}>
  
    
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h3 style={{
                        borderBottom:"2px solid black"
                    }}>Transport Detail</h3>
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
              <Col md="4">
                  <Form.Label  style={{
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    fontSize: "17px"
                }}>
                       Transport Name:  
                  </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Transport Name"
                 name="trasportName"
                 value={editData.transportName}
                 onChange={(e) => setEditData({...editData, transportName:e.target.value})}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md="auto">
              <Button
                variant="primary"
                onClick={handleUpdate}
              >Edit Transport</Button>
            </Col>
            </Row>
          </Row>
  
       </Container>
      :
      // add Transport page

      <Container style={{
        marginTop:"10px"
        }}>
  
    
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h3 style={{
                        borderBottom:"2px solid black"
                    }}>Transport Detail</h3>
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
              <Col md="4">
                  <Form.Label  style={{
                    fontWeight: "bold",
                    letterSpacing: "1px",
                    fontSize: "17px"
                }}>
                       Transport Name:  
                  </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Transport Name"
                 name="trasportName"
                 value={transportDetail.transportName}
                 onChange={(e) => setTransportDetail({...transportDetail, transportName:e.target.value})}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
            <Col md="auto">
                  <Button variant="primary" onClick={handleAddTransport}>Add Transport</Button>
            </Col>
            </Row>
          </Row>
  
       </Container>
    
    }
   
  
    {/** Display Page */}

     <Container style={{
      marginTop:"30px"
    }}>
      
    <Row className="justify-content-md-center">
    <Col md="auto">
        <h3 style={{
            borderBottom:"2px solid black"
            }}>
            Transport List   
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
                  Transport Name
                </th>
                 <th colSpan="2" style={{
                  textAlign: "center",
                  width:"30%"
              }}>Actions</th>
               </tr>
             </thead>
             <tbody>   
               {transport.map((t) => {
                  return   <tr key={t._id}>
                    <td width="60%"
                    style={{
                      textAlign:"center",
                      fontSize:"16px",
                      letterSpacing:"1px"
                  }}
                    >{t.transportName}</td>
                    <td>
                      <Button variant="warning"
                        onClick={() => handleEdit(t._id)}>Edit</Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(t._id)}
                      >Delete</Button>
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

export default Transport;