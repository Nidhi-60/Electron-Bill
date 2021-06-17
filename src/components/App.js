import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
import Invoice from './InvoiceLayout/invoice';
import CounterParty from './Admin/CounterParty';
import Transport from './Admin/transport';
import ManageItem from './Admin/manageItem';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BillSearch from './Admin/billSearch';
import FilledSearch from './Admin/SearchedBill/filledSearch';


const App = () => {
	const [page, setPage] = useState("bill");
	const [billId, setBillId] = useState();
	
	ipcRenderer.on("menu", (e, data) => {
		setPage(data.LABEL);
	});

	let currentPage;

	const handleSearchBill = (id) => {
		setBillId(id);
		setPage("searchedBill");
	}

	if (page === "bill") {
		currentPage = <Invoice />;
	}
	else if (page === "counterparty") {
		currentPage = <CounterParty />;
	}
	else if (page === "transport") {
		currentPage = <Transport />;
	}
	else if (page === "searchBill") {
		currentPage = <BillSearch handleSearchBill={handleSearchBill} />;
	}
	else if (page === "searchedBill") {
		currentPage = <FilledSearch id={ billId }/>
	}
	else {
		currentPage = <ManageItem />;
	}




	return <React.Fragment>
		<ToastContainer />
		{currentPage}
		
	</React.Fragment>
}

	export default App;
