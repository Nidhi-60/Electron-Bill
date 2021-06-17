import { ipcRenderer } from "electron";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
// import styles from "./item.module.css";

const Item = (props) => {
    // console.log(props.itemRow.amount);

    const { id , option, selectedOption, handleOptionChange, itemRow, handleAmount} = props;
 
    // style the Select
    const customStyles = {
        control: (styles) => ({
            // none of react-select's styles are passed to <Control />
            // height: "100px",
            ...styles,
            borderWidth: "0",
            // height:"0px",
            minHeight: "0px"
        }),
        ValueContainer: (styles) => ({
            ...styles,
            padding: "0",
            fontSize:"13px"
        }),
        placeholder: (defaultStyles) => ({
            ...defaultStyles,
            color:"white"
        }),
        singleValue: (defaultStyles) => ({
            ...defaultStyles,
            fontWeight: "bold",
        }),
        indicatorContainer: (defaultStyles) => ({
            ...defaultStyles,
            padding:"0px"
        })
    }


    return <React.Fragment>
                <tr>
                    <td style={{
                        textAlign:"center"
            }}>
                {id}
            </td>
            <td width="50%"
                style={{
                        padding: "0px",
                        // textAlign:"center"
            }}>
                    <Select
                        options={option}
                        value={selectedOption}
                        onChange={handleOptionChange}
                        styles={customStyles}
                    />
            </td>
            <td style={{
                textAlign: "center",
                fontWeight:"600"
                    }}>
                {itemRow.quantityType}
            </td>
                <td>
                    <Form.Control
                        type="text"
                        onChange={handleAmount}
                        style={{
                            border: "none",
                            textAlign: "center",
                            fontWeight:"600"
                        }}
                    />
                </td>
                <td style={{ width: "15%", textAlign: "center", fontWeight:"600" }}>
                {itemRow.unitPrice}
                </td>
                <td style={{ width: "15%", textAlign: "center", fontWeight:"600" }}>
                {itemRow.amount}
                </td>
            </tr>
    
    </React.Fragment>


}

export default Item;