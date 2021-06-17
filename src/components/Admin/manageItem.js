import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageItem = () => {
  const [view, setView] = useState("add");
  const [item, setItem] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [addItem, setAddItem] = useState({
    itemName: "",
    quantityType: "",
    unitPrice: ""
  });

  useEffect(() => {
    ipcRenderer.send("item:load");

    ipcRenderer.on("item:success", (e, data) => {
      setItem(JSON.parse(data));
    });

  }, []);

  // add Item
  const handleAddItem = () => {
    ipcRenderer.send("addItem:load", addItem);

    ipcRenderer.on("addItem:success", (e, data) => {
      setItem([...item, JSON.parse(data)]);
    });

    toast.info("item added..");
    setAddItem({
      itemName: "",
      unitPrice: ""
    });

  }

  // edit data
  const handleEdit = (id) => {
    setView("edit");
   
    let d = item.filter((i) => {
      return i._id === id;
    });

    setEditItem(d[0]);

  }


  // update Data
  const handleUpdate = () => {
    ipcRenderer.send("updateItem:load", editItem);

    ipcRenderer.send("item:load");

    ipcRenderer.on("item:success", (e, data) => {
      setItem(JSON.parse(data));
    });

    toast.success("Item Updated..");

    setEditItem({
      ...editItem,
      itemName: "",
      unitPrice: ""
    });
  }

  // delete item
  const handleDelete = (id) => {
    ipcRenderer.send("deleteItem:load", id);

    ipcRenderer.on("deleteItem:success", () => {
      let d = item.filter((i) => {
        return i._id !== id;
      })
      setItem(d);
    });

    toast.warning("Item deleted..");
  }


  // console.log(editItem);

    return <React.Fragment>
      {view === "edit" ?
      <Container style={{
        marginTop:"10px"
        }}>
        <Row className="justify-content-md-center">
           <Col md="auto">
              <h3 style={{
                  borderBottom:"2px solid black"
              }}>Item Detail</h3>
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
              <Form.Label  style={{
                fontWeight: "bold",
                letterSpacing: "1px",
                fontSize: "17px"
            }}>
                 Item Name: 
              </Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                  placeholder="Enter Item Name"
                  value={editItem.itemName}
                  onChange={(e) => setEditItem({...editItem, itemName: e.target.value})}
              />
            </Col>
          </Row>

          <Row style={{
            marginBottom: "15px",
            marginTop:"10px"
        }}>
            <Col md="3">
              <Form.Label  style={{
                fontWeight: "bold",
                letterSpacing: "1px",
                fontSize: "17px"
            }}>
                Quantity Type: 
              </Form.Label>
            </Col>
            <Col>
                <Form.Control as="select"
                  onChange={(e) => setEditItem({...editItem, quantityType: e.target.value})}>
                 <option value="0">Select</option>
                 <option value="No">No</option>
                 <option value="Kg">Kg</option>
              </Form.Control>
            </Col>
          </Row>

          <Row style={{
            marginBottom: "15px",
            marginTop:"10px"
          }}>
            <Col md="3">
              <Form.Label  style={{
                fontWeight: "bold",
                letterSpacing: "1px",
                  fontSize: "17px"
            }}>
                 Unit Price: 
              </Form.Label>
            </Col>
            <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter unit Price"
                  value={editItem.unitPrice}
                  onChange={(e) => setEditItem({...editItem, unitPrice: e.target.value})}
                />
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md="auto">
                <Button variant="primary"
                  onClick={ handleUpdate }>
                  Edit Item
                </Button>
          </Col>
          </Row>

        </Row>
      </Container>
        :
        <Container style={{
          marginTop:"10px"
          }}>
          <Row className="justify-content-md-center">
             <Col md="auto">
                <h3 style={{
                    borderBottom:"2px solid black"
                }}>Item Detail</h3>
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
                <Form.Label  style={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  fontSize: "17px"
              }}>
                   Item Name: 
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Item Name"
                  value={addItem.itemName}
                  onChange={(e) => setAddItem({...addItem, itemName:e.target.value})}
                />
              </Col>
            </Row>

            <Row style={{
              marginBottom: "15px",
              marginTop:"10px"
          }}>
              <Col md="3">
                <Form.Label  style={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  fontSize: "17px"
              }}>
                  Quantity Type: 
                </Form.Label>
              </Col>
              <Col>
                <Form.Control as="select" onChange={(e) => setAddItem({...addItem, quantityType: e.target.value})}>
                   <option value="0">Select</option>
                   <option value="No">No</option>
                   <option value="Kg">Kg</option>
                </Form.Control>
              </Col>
            </Row>

            <Row style={{
              marginBottom: "15px",
              marginTop:"10px"
            }}>
              <Col md="3">
                <Form.Label  style={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  fontSize: "17px"
              }}>
                   Unit Price: 
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter unit Price"
                  value={addItem.unitPrice}
                  onChange={(e) => setAddItem({...addItem, unitPrice: e.target.value})}
                />
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              <Col md="auto">
                <Button
                  variant="primary"
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
            </Col>
            </Row>

          </Row>

          

        </Container>
      }
      
      <Container style={{
        marginTop:"30px"
      }}>
        
      <Row className="justify-content-md-center">
      <Col md="auto">
          <h3 style={{
              borderBottom:"2px solid black"
              }}>
              Item List  
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
                    // width:"30%"
                  }}>Item Name</th>
                  <th style={{
                    textAlign: "center",
                    // width:"30%"
                  }}>
                    Quantity Type
                    </th>
                  <th style={{
                    textAlign: "center",
                    // width:"30%"
                  }}>
                    Unit Price
                  </th>
                  <th colSpan="2" style={{
                    textAlign: "center",
                    // width:"30%"
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.map((i) => {
                  return <tr key={i._id}>
                    <td style={{
                      textAlign:"center",
                      fontSize:"16px",
                      letterSpacing:"1px"
                  }}>
                      {i.itemName}
                    </td>
                    <td style={{
                      textAlign:"center",
                      fontSize:"16px",
                      letterSpacing:"1px"
                    }}>
                      {i.quantityType}
                    </td>
                    <td style={{
                      textAlign:"center",
                      fontSize:"16px",
                      letterSpacing:"1px"
                    }}>
                      {i.unitPrice}
                    </td>
                    <td>
                      <Button variant="warning" onClick={() => handleEdit(i._id)}>Edit</Button>
                    </td>
                    <td>
                      <Button variant="danger"
                        onClick={() => handleDelete(i._id) }>
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

export default ManageItem;