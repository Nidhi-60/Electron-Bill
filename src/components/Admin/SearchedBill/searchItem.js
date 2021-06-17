import React from "react";
import { Table } from "react-bootstrap";

const SearchItem = (props) => {
    console.log(props);
    const { bill } = props;
    return <React.Fragment>
        {
            bill.length !== 0
            &&

            <Table bordered responsive size="sm" style={{
                marginBottom: "0px",
            }}>
                 <thead>
                    <tr>
                        <th>
                            No
                        </th>
                        <th style={{
                            textAlign:"center"
                        }}>
                            Particular
                        </th>
                        <th>
                            Unit
                        </th>
                        <th style={{
                            textAlign:"center"
                        }}>
                            Quantity
                        </th>
                        <th>
                            Rate Per Unit
                        </th>
                        <th style={{
                            textAlign:"center"
                        }}>
                            Amount
                        </th>
                    </tr>
                    </thead>
                <tbody>
                    {bill[0].item.map((i, index) => {
                        return <tr key={i._id}>
                            <td style={{
                                textAlign:"center"
                            }}>
                                {index + 1}
                            </td>
                            <td width="50%" style={{
                                padding: "5px",
                                textAlign: "center",
                                fontWeight:"600"
                            }}>
                                {i.itemName}
                            </td>
                            <td style={{
                                textAlign: "center",
                                fontWeight:"600"
                            }}>
                                {i.quantityType}
                            </td>
                            <td  style={{
                                // border: "none",
                                textAlign: "center",
                                fontWeight:"600"
                            }}>
                                {i.userQuantity}
                            </td>
                            <td
                                style={{
                                    width: "15%",
                                    textAlign: "center",
                                    fontWeight: "600"
                                }}>
                                {i.unitPrice}
                            </td>
                            <td
                                style={{
                                    width: "15%",
                                    textAlign: "center",
                                    fontWeight: "600"
                                }}>
                                {i.amount}
                            </td>
                        </tr>
                    })} 
                </tbody>
            </Table>
        }
            
    </React.Fragment>
}

export default SearchItem;