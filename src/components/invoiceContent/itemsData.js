import { ipcRenderer } from "electron";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import FinalCalc from "./FinalCalc";
import Item from "./item";
import styles from "./item.module.css";


const ItemsData = (props) => {
    // console.log(props);
    const { party } = props;
    const [item, setItem] = useState([]);
    const [option, setOption] = useState([]);

    const [rowOneAmount, setRowOneAmount] = useState(0);
    const [rowTwoAmount, setRowTwoAmount] = useState(0);
    const [rowThreeAmount, setRowThreeAmount] = useState(0);
    const [rowFourAmount, setRowFourAmount] = useState(0);
    const [rowFiveAmount, setRowFiveAmount] = useState(0);
    const [rowSixAmount, setRowSixAmount] = useState(0);
    const [rowSevenAmount, setRowSevenAmount] = useState(0);
    const [rowEightAmount, setRowEightAmount] = useState(0);
    const [rowNineAmount, setRowNineAmount] = useState(0);
    const [rowTenAmount, setRowTenAmount] = useState(0);
    const [rowElevenAmount, setRowElevenAmount] = useState(0);
    const [rowTwelveAmount, setRowTwelveAmount] = useState(0);
    const [rowThrteenAmount, setRowThrteenAmount] = useState(0);

    // row one data
    const [oneSelectedOption, setOneSelectedOption] = useState(null);
    const [oneItemRow, setOneItemRow] = useState({ amount: "0", userQuantity:"0" });


        // row two data
    const [twoSelectedOption, setTwoSelectedOption] = useState(null);
    const [twoItemRow, setTwoItemRow] = useState({ amount: "0", userQuantity:"0" });

    // row three data
    const [threeSelectedOption, setThreeSelectedOption] = useState(null);
    const [threeItemRow, setThreeItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row four data
        const [fourSelectedOption, setFourSelectedOption] = useState(null);
    const [fourItemRow, setFourItemRow] = useState({ amount: "0", userQuantity:"0"});
    
        // row five data
        const [fiveSelectedOption, setFiveSelectedOption] = useState(null);
    const [fiveItemRow, setFiveItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row six data
        const [sixSelectedOption, setSixSelectedOption] = useState(null);
    const [sixItemRow, setSixItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row seven data
        const [sevenSelectedOption, setSevenSelectedOption] = useState(null);
    const [sevenItemRow, setSevenItemRow] = useState({ amount: "0" , userQuantity:"0"});
    
        // row Eight data
        const [eightSelectedOption, setEightSelectedOption] = useState(null);
    const [eightItemRow, setEightItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row nine data
        const [nineSelectedOption, setNineSelectedOption] = useState(null);
    const [nineItemRow, setNineItemRow] = useState({ amount: "0", userQuantity:"0" });

        // row ten data
        const [tenSelectedOption, setTenSelectedOption] = useState(null);
    const [tenItemRow, setTenItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row eleven data
        const [elevenSelectedOption, setElevenSelectedOption] = useState(null);
    const [elevenItemRow, setElevenItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row twelve data
        const [twelveSelectedOption, setTwelveSelectedOption] = useState(null);
    const [twelveItemRow, setTwelveItemRow] = useState({ amount: "0", userQuantity:"0" });
    
        // row thrteen data
        const [thrteenSelectedOption, setThrteenSelectedOption] = useState(null);
    const [thrteenItemRow, setThrteenItemRow] = useState({ amount: "0", userQuantity:"0" });
    
    

    useState(() => {
        ipcRenderer.send("item:load");

        // item get
        ipcRenderer.on("item:success", (e, data) => {
            setItem(JSON.parse(data));
            
            let d = JSON.parse(data);

            // set value for option
            let da = d.map((i) => {
                 return {...i, "label": i.itemName, "value": i.itemName}
            })

            setOption(da);
        });
    }, []);



    // handle one Row selectedd option
    const handleOneOptionChange = oneSelectedOption => {
        setOneSelectedOption(oneSelectedOption);
        // console.log(selectedOption);
        setOneItemRow({ ...oneItemRow, ...oneSelectedOption });
        // console.log(itemRow);

    }


    // handle two Row selectedd option
    const handleTwoOptionChange = twoSelectedOption => {
        setTwoSelectedOption(twoSelectedOption);
        // console.log(selectedOption);
        setTwoItemRow({ ...twoItemRow, ...twoSelectedOption });
        // console.log(itemRow);

    }

     // handle three Row selectedd option
    const handleThreeOptionChange = threeSelectedOption => {
        setThreeSelectedOption(threeSelectedOption);
        // console.log(selectedOption);
        setThreeItemRow({ ...threeItemRow, ...threeSelectedOption });
        // console.log(itemRow);
    }

     // handle four Row selectedd option
     const handleFourOptionChange = fourSelectedOption => {
        setFourSelectedOption(fourSelectedOption);
        // console.log(selectedOption);
        setFourItemRow({ ...fourItemRow, ...fourSelectedOption });
        // console.log(itemRow);
    }

     // handle five Row selectedd option
     const handleFiveOptionChange = fiveSelectedOption => {
        setFiveSelectedOption(fiveSelectedOption);
        // console.log(selectedOption);
        setFiveItemRow({ ...fiveItemRow, ...fiveSelectedOption });
        // console.log(itemRow);
    }

     // handle six Row selectedd option
     const handleSixOptionChange = sixSelectedOption => {
        setSixSelectedOption(sixSelectedOption);
        // console.log(selectedOption);
        setSixItemRow({ ...sixItemRow, ...sixSelectedOption });
        // console.log(itemRow);
    }

     // handle seven Row selectedd option
     const handleSevenOptionChange = sevenSelectedOption => {
        setSevenSelectedOption(sevenSelectedOption);
        // console.log(selectedOption);
        setSevenItemRow({ ...sevenItemRow, ...sevenSelectedOption });
        // console.log(itemRow);
    }

     // handle eigth Row selectedd option
     const handleEightOptionChange = eigthSelectedOption => {
        setEightSelectedOption(eightSelectedOption);
        // console.log(selectedOption);
        setEightItemRow({ ...eightItemRow, ...eightSelectedOption });
        // console.log(itemRow);
    }
     // handle nine Row selectedd option
     const handleNineOptionChange = nineSelectedOption => {
        setNineSelectedOption(nineSelectedOption);
        // console.log(selectedOption);
        setNineItemRow({ ...nineItemRow, ...nineSelectedOption });
        // console.log(itemRow);
    }

     // handle ten Row selectedd option
     const handleTenOptionChange = tenSelectedOption => {
        setTenSelectedOption(tenSelectedOption);
        // console.log(selectedOption);
        setTenItemRow({ ...tenItemRow, ...tenSelectedOption });
        // console.log(itemRow);
    }

     // handle eleven Row selectedd option
     const handleElevenOptionChange = elevenSelectedOption => {
        setElevenSelectedOption(elevenSelectedOption);
        // console.log(selectedOption);
        setElevenItemRow({ ...elevenItemRow, ...elevenSelectedOption });
        // console.log(itemRow);
    }

     // handle twelve Row selectedd option
     const handleTwelveOptionChange = twelveSelectedOption => {
        setTwelveSelectedOption(twelveSelectedOption);
        // console.log(selectedOption);
        setTwelveItemRow({ ...twelveItemRow, ...twelveSelectedOption });
        // console.log(itemRow);
    }

     // handle three Row selectedd option
     const handleThrteenOptionChange = thrteenSelectedOption => {
        setThrteenSelectedOption(thrteenSelectedOption);
        // console.log(selectedOption);
        setThrteenItemRow({ ...thrteenItemRow, ...thrteenSelectedOption });
        // console.log(itemRow);
    }

    // console.log(oneItemRow);
    // console.log(twoItemRow);
    // console.log(oneSelectedOption);

    // handle one Row Amount
    const handleOneAmount = (e) => {
        setOneItemRow({ ...oneItemRow, amount: numberFormat(oneItemRow.unitPrice * e.target.value) , userQuantity:e.target.value});
        setRowOneAmount(oneItemRow.unitPrice * e.target.value);
    }

    // handle two Row Amount
    const handleTwoAmount = (e) => {
        setTwoItemRow({ ...twoItemRow, amount: numberFormat(twoItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowTwoAmount(twoItemRow.unitPrice * e.target.value);
    }

    // handle three Row Amount
    const handleThreeAmount = (e) => {
        setThreeItemRow({ ...threeItemRow, amount: numberFormat(threeItemRow.unitPrice * e.target.value) , userQuantity:e.target.value});
        setRowThreeAmount(threeItemRow.unitPrice * e.target.value);
    }

    // handle four Row Amount
    const handleFourAmount = (e) => {
        setFourItemRow({ ...fourItemRow, amount: numberFormat(fourItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowFourAmount(fourItemRow.unitPrice * e.target.value);
    }

    // handle fivee Row Amount
    const handleFiveAmount = (e) => {
        setFiveItemRow({ ...fiveItemRow, amount: numberFormat(fiveItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowFiveAmount(fiveItemRow.unitPrice * e.target.value); 
    }

    // handle six Row Amount
    const handleSixAmount = (e) => {
        setSixItemRow({ ...sixItemRow, amount: numberFormat(sixItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowSixAmount(sixItemRow.unitPrice * e.target.value);
    }

    // handle seven Row Amount
    const handleSevenAmount = (e) => {
        setSevenItemRow({ ...sevenItemRow, amount: numberFormat(sevenItemRow.unitPrice * e.target.value), userQuantity:e.target.value});
        setRowSevenAmount(sevenItemRow.unitPrice * e.target.value);
    }

    // handle eight Row Amount
    const handleEightAmount = (e) => {
        setEightItemRow({ ...eightItemRow, amount: numberFormat(eightItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowEightAmount(eightItemRow.unitPrice * e.target.value);
    }

    // handle nine Row Amount
    const handleNineAmount = (e) => {
        setNineItemRow({ ...nineItemRow, amount: numberFormat(nineItemRow.unitPrice * e.target.value) , userQuantity:e.target.value});
        setRowNineAmount(nineItemRow.unitPrice * e.target.value);
    }

    // handle ten Row Amount
    const handleTenAmount = (e) => {
        setTenItemRow({ ...tenItemRow, amount: numberFormat(tenItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowTenAmount(tenItemRow.unitPrice * e.target.value);
    }

    // handle eleven Row Amount
    const handleElevenAmount = (e) => {
        setElevenItemRow({ ...elevenItemRow, amount: numberFormat(elevenItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowElevenAmount(elevenItemRow.unitPrice * e.target.value);
    }

    // handle twelve Row Amount
    const handleTwelveAmount = (e) => {
        setTwelveItemRow({ ...twelveItemRow, amount: numberFormat(twelveItemRow.unitPrice * e.target.value) , userQuantity:e.target.value});
        setRowTwelveAmount(twelveItemRow.unitPrice * e.target.value);
    }

    // handle two Row Amount
    const handleThrteenAmount = (e) => {
        setThrteenItemRow({ ...thrteenItemRow, amount: numberFormat(thrteenItemRow.unitPrice * e.target.value), userQuantity:e.target.value });
        setRowThrteenAmount(thrteenItemRow.unitPrice * e.target.value);
    }

    
    
    
    // console.log(itemRow);
    // style number value   
    const numberFormat = (value) =>
        new Intl.NumberFormat('en-IN', {
            // style: 'currency',
            currency: 'INR'
        }).format(value);

    // console.log(totalAmount);
   
    return <React.Fragment> 
        <div>
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
                  
                    <Item
                        id="1"
                        option={option}
                        selectedOption={oneSelectedOption}
                        handleOptionChange={handleOneOptionChange}
                        itemRow={oneItemRow}
                        handleAmount = {handleOneAmount}
                      />
                    
                      <Item
                        id="2"
                        option={option}
                        selectedOption={twoSelectedOption}
                        handleOptionChange={handleTwoOptionChange}
                        itemRow={twoItemRow}
                        handleAmount = {handleTwoAmount}
                    />
                    
                    <Item
                        id="3"
                        option={option}
                        selectedOption={threeSelectedOption}
                        handleOptionChange={handleThreeOptionChange}
                        itemRow={threeItemRow}
                        handleAmount = {handleThreeAmount}
                    />
                    
                    <Item
                        id="4"
                        option={option}
                        selectedOption={fourSelectedOption}
                        handleOptionChange={handleFourOptionChange}
                        itemRow={fourItemRow}
                        handleAmount = {handleFourAmount}
                    />
                    
                    <Item
                        id="5"
                        option={option}
                        selectedOption={fiveSelectedOption}
                        handleOptionChange={handleFiveOptionChange}
                        itemRow={fiveItemRow}
                        handleAmount = {handleFiveAmount}
                    />
                    
                    <Item
                        id="6"
                        option={option}
                        selectedOption={sixSelectedOption}
                        handleOptionChange={handleSixOptionChange}
                        itemRow={sixItemRow}
                        handleAmount = {handleSixAmount}
                    />
                    
                    <Item
                        id="7"
                        option={option}
                        selectedOption={sevenSelectedOption}
                        handleOptionChange={handleSevenOptionChange}
                        itemRow={sevenItemRow}
                        handleAmount = {handleSevenAmount}
                    />

                    <Item
                        id="8"
                        option={option}
                        selectedOption={eightSelectedOption}
                        handleOptionChange={handleEightOptionChange}
                        itemRow={eightItemRow}
                        handleAmount = {handleEightAmount}
                    />
                    
                    <Item
                        id="9"
                        option={option}
                        selectedOption={nineSelectedOption}
                        handleOptionChange={handleNineOptionChange}
                        itemRow={nineItemRow}
                        handleAmount = {handleNineAmount}
                    />
                    
                    <Item
                        id="10"
                        option={option}
                        selectedOption={tenSelectedOption}
                        handleOptionChange={handleTenOptionChange}
                        itemRow={tenItemRow}
                        handleAmount = {handleTenAmount}
                    />
                    
                    <Item
                        id="11"
                        option={option}
                        selectedOption={elevenSelectedOption}
                        handleOptionChange={handleElevenOptionChange}
                        itemRow={elevenItemRow}
                        handleAmount = {handleElevenAmount}
                    />
                    
                    <Item
                        id="12"
                        option={option}
                        selectedOption={twelveSelectedOption}
                        handleOptionChange={handleTwelveOptionChange}
                        itemRow={twelveItemRow}
                        handleAmount = {handleTwelveAmount}
                    />
                    
                    <Item
                        id="13"
                        option={option}
                        selectedOption={thrteenSelectedOption}
                        handleOptionChange={handleThrteenOptionChange}
                        itemRow={thrteenItemRow}
                        handleAmount = {handleThrteenAmount}
                    />
                       
                    
                </tbody>
            </Table>
           
            

            <FinalCalc rowOneAmount={rowOneAmount}
                       rowTwoAmount = {rowTwoAmount}
                       rowThreeAmount = {rowThreeAmount}
                       rowFourAmount = {rowFourAmount}
                       rowFiveAmount = {rowFiveAmount}
                       rowSixAmount = {rowSixAmount}
                       rowSevenAmount = {rowSevenAmount}
                       rowEightAmount = {rowEightAmount}
                       rowNineAmount = {rowNineAmount}
                       rowTenAmount = {rowTenAmount}
                       rowElevenAmount = {rowElevenAmount}
                       rowTwelveAmount = {rowTwelveAmount}
                       rowThrteenAmount={rowThrteenAmount}
                partyDetail={party}
                oneItemRow={oneItemRow}
                twoItemRow={twoItemRow}
                threeItemRow={threeItemRow}
                fourItemRow={fourItemRow}
                fiveItemRow={fiveItemRow}
                sixItemRow={sixItemRow}
                sevenItemRow={sevenItemRow}
                eightItemRow={eightItemRow}
                nineItemRow={nineItemRow}
                tenItemRow={tenItemRow}
                elevenItemRow={elevenItemRow}
                twelveItemRow={twelveItemRow}
                thrteenItemRow={thrteenItemRow}
            />
      
            
        </div>
        
    </React.Fragment>
}

export default ItemsData;