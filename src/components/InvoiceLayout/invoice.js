import { remote, ipcRenderer } from "electron";
const BrowserWindow = remote.BrowserWindow;
import React, {useState, useEffect}  from "react";
import Header from "../InvoiceHeader/header";
import ItemsData from "../invoiceContent/itemsData";
import SubHeader from "../InvoiceHeader/subHeader";

const Invoice = () => {
	const [partyDetail, setPartyDetail] = useState([]);
	const [party, setParty] = useState({
		partyName: "",
		partyAddress: "",
		partyGST: "",
		billNo: "",
		date: ""
	});

	useEffect(() => {
        ipcRenderer.send("counterPartyDetail:load");
  
        ipcRenderer.on("counterPartyDetail:success", (e, data) => {
            // console.log(JSON.parse(data));
            setPartyDetail(JSON.parse(data));
		});
		
		ipcRenderer.send("billNumber:load");

		ipcRenderer.on("billNumber:success", (e, data) => {
			let newId;
			if (data.length !== 0) {
				const id = data.pop();
				newId = parseInt(id) + 1;
			}
			else {
				newId = 1;
			}
			setParty({ ...party, billNo: newId });
		})

	}, []);


	// console.log(party);
	 
    const handlePartyName = (e) => {
        if (parseInt(e.target.value) === 0) {
			setParty({
				...party,
				partyName: "",
				partyAddress: "",
				partyGST: "",
		   })
        }
        else {
            let data = partyDetail.filter((p) => {
                return p._id === e.target.value;
            });
			setParty({
				...party,
				partyName: data[0].partyName,
				partyAddress: data[0].partyAddress,
				partyGST: data[0].partyGST
			})
        }
    }

	const handleBillNo = (e) => {
		setParty({
			...party,
			billNo: e.target.value
		})
	}

	const handleDate = (e) => {
		setParty({
			...party,
			date: e.target.value
		})
	}
	 


	return <React.Fragment>
		
		<div style={{
			height: "1060px",
			width:"800px",
			border: "2px solid black",
			marginLeft: "10px",
			marginTop:"5px"
		}}>
			<Header />
			<SubHeader
				partyDetail={partyDetail}
				handlePartyName={handlePartyName}
				party={party}
				handleBillNo={handleBillNo}
				handleDate={handleDate}
			/>
			<ItemsData party={ party }/>
		  
		</div>
			
    </React.Fragment>
}

export default Invoice;