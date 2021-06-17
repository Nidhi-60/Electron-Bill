const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const DataStore = require("nedb");

// party Name database
const counterPartyDb = new DataStore({
	filename: "db/CounterPartyDb.db",
	autoload: true
});

// item Database
const itemDb = new DataStore({
	filename: "db/ItemDb.db",
	autoload: true
});

// transport databse
const transportDb = new DataStore({
	filename: "db/TransportDb.db",
	autoload: true
});

// final Bill
const finalBillDb = new DataStore({
	filename: "db/FinalBillDb.db",
	autoload: true
});

let mainWindow;

let isDev = false;
const isMac = process.platform === "darwin" ? true : false;


if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true;
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 900,
		height: 1200,
		show: false,
		title: "Parshwanath Billing App",
		icon: `${__dirname}/assets/logo.png`,
		backgroundColor: "white",
		webPreferences: {
			nodeIntegration: true,
        	contextIsolation: false,
        	enableRemoteModule: true,
		},
	});

	// mainWindow.maximize();

	let indexPath;

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		})
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		})
	}

	if (isDev) {
		mainWindow.webContents.openDevTools();
	}

	mainWindow.loadURL(indexPath);

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		// Open devtools if dev
		// if (isDev) {
		// 	// const {
		// 	// 	default: installExtension,
		// 	// 	REACT_DEVELOPER_TOOLS,
		// 	// } = require('electron-devtools-installer')

		// 	// installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
		// 	// 	console.log('Error loading React DevTools: ', err)
		// 	// )
		// 	mainWindow.webContents.openDevTools();
		// }
	});


	mainWindow.on('closed', () => (mainWindow = null))
}

const template = [
	...(isMac ? [{ role: 'appMenu' }] : []),
	{
		role: 'fileMenu',
	},
	{
		role: 'editMenu',
	},
	{
		label: "Admin",
		submenu: [
			{
				label: "Go to bill",
				click: () => {
					mainWindow.webContents.send("menu", { LABEL: "bill" });
				}
			},
			{
				label: "Manage CounterParty",
				click: () => {
					mainWindow.webContents.send("menu", { LABEL: "counterparty" });
				}
			},
			{
				label: "Manage Transport",
				click: () => {
					mainWindow.webContents.send("menu", { LABEL: "transport" });
				}
			},
			{
				label: "Manage Item",
				click: () => {
					mainWindow.webContents.send("menu", { LABEL: "item" });
				}
			},
			{
				label: "Search Bill",
				click: () => {
					mainWindow.webContents.send("menu", { LABEL: "searchBill" });
				}
			},
		]
	},
	...(isDev
		? [
			{
				label: 'Developer',
				submenu: [
					{ role: 'reload' },
					{ role: 'forcereload' },
					{ type: 'separator' },
					{ role: 'toggledevtools' },
				],
			},
		]
		: []),
];

app.on('ready', () => {
	createMainWindow();
	// addData();
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

});




app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow();
	}
})

// Stop error
app.allowRendererProcessReuse = true;

// fetch counter party detail
ipcMain.on("counterPartyDetail:load", async () => {
	await counterPartyDb.find({}, (err, doc) => {
		if (doc) {
			// console.log("inside doc" ,doc);
			mainWindow.webContents.send("counterPartyDetail:success", JSON.stringify(doc));
		}
		else {
			console.log(err);
		}
	});
});

// fetch item detail
ipcMain.on("item:load", async () => {
	await itemDb.find({}, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("item:success", JSON.stringify(doc));
		}
		else {
			console.log(err);
		}
	});
});

// fetch transport detail
ipcMain.on("transport:load", async () => {
	await transportDb.find({}, (err, doc) => {
		if (doc){
			mainWindow.webContents.send("transport:success", JSON.stringify(doc));
		}
		else {
			console.log(err);
		}
	});
});

// add CounterParty detail
ipcMain.on("addParty:load", async (e, data) => {
	await counterPartyDb.insert(data, (err, doc) => {
		if (doc) {
			// console.log(doc);
			mainWindow.webContents.send("addParty:success", doc);
		}
		else {
			console.log(err);
		}
	});
});

// delete counterParty
ipcMain.on("partyDelete:load", async (e, id) => {
	await counterPartyDb.remove({ _id: id }, (err, numDeleted) => {
		// console.log(numDeleted);
		if (numDeleted === 1) {
			mainWindow.webContents.send("partyDelete:success");
		}
	});
});

// edit counter party 
ipcMain.on("editParty:load", async (e, d) => {
	// console.log(d);
	const userid = d._id;
	delete d._id;
	await counterPartyDb.update({ _id: userid }
		, {
			partyName: d.partyName,
			partyGST: d.partyGST,
			partyAddress: d.partyAddress
		},
		(err) => {
			if (err) {
				console.log(err);
		   }
		}
	)
})

// fetch transport
ipcMain.on("transport:load", async () => {
	await transportDb.find({}, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("transport:success", (JSON.stringify(doc)));
		}
		else {
			console.log(err);
		}
   })
})

// add Transport
ipcMain.on("addTransport:load", async (e, data) => {
	await transportDb.insert(data, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("addTransport:success", JSON.stringify(doc));
		}
		else {
			console.log(err)
		}
	})
})

// edit transport
ipcMain.on("updateTransport:load", async (e, data) => {
	// console.log(data);
	const userid = data._id;
	delete data._id;
	await transportDb.update({ _id: userid }, {
		"transportName": data.transportName
	}, (err) => {
		if (err) {
			console.log(err);
		}
	});
})

// delete transport
ipcMain.on("deleteTransport:load", async (e, id) => {
	await transportDb.remove({ _id: id }, (err, numDeleted) => {
		// console.log(numDeleted);
		if (numDeleted === 1) {
			mainWindow.webContents.send("deleteTransport:success");
		}
	});
});

// edit item
ipcMain.on("updateItem:load", async (e, data) => {
	// console.log(data);
	const itemId = data._id;
	delete data._id;
	await itemDb.update({ _id: itemId }, {
		"itemName": data.itemName,
		"quantityType": data.quantityType,
		"unitPrice": data.unitPrice
	}, (err) => {
		if (err) {
			console.log(err);
		}
	});
})

// delete item
ipcMain.on("deleteItem:load", async (e, id) => {
	await itemDb.remove({ _id: id }, (err, numDeleted) => {
		// console.log(numDeleted);
		if (numDeleted === 1) {
			mainWindow.webContents.send("deleteItem:success");
		}
	});
});

// add item
ipcMain.on("addItem:load", async (e, data) => {
	await itemDb.insert(data, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("addItem:success", JSON.stringify(doc));
		}
		else {
			console.log(err)
		}
	})
})

// final bill save
ipcMain.on("finalBill:load", async (e, data) => {
	await finalBillDb.insert(data, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("finalBill:success", "Bill saved successfully");
		}
		else {
			console.log(err);
		}
	})
})

// fetch final bill
ipcMain.on("getFinalBill:load", async () => {
	await finalBillDb.find({}, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("getFinalBill:success", (JSON.stringify(doc)));
		}
		else {
			console.log(err);
		}
   })
})


// fetch final bill by id
ipcMain.on("billById:load", async (e, id) => {
	await finalBillDb.find({ _id: id }, (err, doc) => {
		if (doc) {
			mainWindow.webContents.send("billById:success", doc);
		}
		else {
			console.log(err);
		}
	})
})

// fetch bill Number
ipcMain.on("billNumber:load", async () => {
	await finalBillDb.find({})
		.sort({ 'partyDetail.billNo': 1 })
		.projection({ 'partyDetail.billNo': 1, '_id': 0 })
		.exec((err, doc) => {
			// console.log(doc);
			if (doc) {
				let ar = doc.map((d) => {
					return d.partyDetail.billNo;
				})
				// console.log(ar);
				mainWindow.webContents.send("billNumber:success", (ar));
				// console.log(ar);
				// console.log(doc);
		}
		else {
			console.log(err);
		}
	})
})


// delete Final bill
ipcMain.on("deleteFinalBill:load", async (e, id) => {
	// console.log(id);
	await finalBillDb.remove({ _id: id }, (err, numDeleted) => {
		// console.log(numDeleted);
		if (numDeleted === 1) {
			mainWindow.webContents.send("deleteFinalBill:success");
		}
	});
});