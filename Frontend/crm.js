const anchor = document.querySelectorAll("li");
const module_v = document.querySelectorAll(".module-view");

document.querySelector(".close_panel").addEventListener("click",()=>{
    document.querySelector(".summer-cyber").classList.add("hidden");
})

document.querySelector(".featured").addEventListener("click",()=>{
    document.querySelector(".summer-cyber").classList.remove("hidden");
})

document.querySelector(".early-bird").addEventListener("click", ()=>{
    document.querySelector(".early-bird-alert").classList.remove("hidden");
})

document.querySelector(".cancel-now").addEventListener("click", ()=>{
    document.querySelector(".early-bird-alert").classList.add("hidden");
})

anchor.forEach((link) => {
    link.addEventListener("click", ()=>{
        if(link.classList.contains("active")){
            return;
        }else{    
            for(let i=0; i<anchor.length; i++){
                anchor[i].classList.remove("active");
            }
            link.classList.add("active");
        }
        loadModule();
    })
})

function loadModule(){
    for(let i=0; i<module_v.length; i++){
        module_v[i].classList.add("hidden");
    }

    if(anchor[0].classList.contains("active")){
        module_v[0].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Dashboard Board";
    }
    else if(anchor[1].classList.contains("active")){
        module_v[1].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Dealer Management";
        getDealer();
    }
    else if(anchor[2].classList.contains("active")){
        module_v[2].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Lead Management";
        getLeads();
    }
    else if(anchor[3].classList.contains("active")){
        module_v[3].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Order Management";
        getOrders();
    }
    else if(anchor[4].classList.contains("active")){
        module_v[4].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Ledger & Payment";
        getLedger();
    }
    else if(anchor[5].classList.contains("active")){
        module_v[5].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Active Schemes & Incentives";
        getIncentive();
    }
    else if(anchor[6].classList.contains("active")){
        module_v[6].classList.remove("hidden");
        document.querySelector(".title").innerHTML = "Support/Tickets";
        getLeads();
    }

}

/* Dealer Managements... */

let leadData=[];
document.querySelector(".dealer_close").addEventListener("click",()=>{
    document.querySelector(".dealer-input").classList.add("hidden");
})

document.querySelector(".btn_dealer").addEventListener("click", ()=>{
    document.querySelector(".dealer-input").classList.remove("hidden");
})

document.querySelector(".dealer-submit").addEventListener("click",()=>
{
    const get_deal = localStorage.getItem("listdealer");
    leadData = JSON.parse(get_deal);

    const d_name = document.querySelector("#dName");
    const d_loc = document.querySelector("#dLoc");    

    if(!d_name.value || !d_loc.value)
    {
        alert("Please fill in all required fields!");
        return;
    }

    const newDealer = {
        Dname: d_name.value, loc:d_loc.value, stk_lev: 0+" units", sts:"Active"
    }
    
    leadData.push(newDealer);

    if(!document.querySelector(".dealer-input").classList.contains("hidden")){
        document.querySelector(".dealer-input").classList.add("hidden");
    }
    
    localStorage.setItem("listdealer", JSON.stringify(leadData));
    console.log(leadData);
    getDealer();
})

let dealerData = [
    {Dname: "ABC_Constructor", loc:"New Delhi", stk_lev: 150+" units", sts:"Active"},
    {Dname: "DEF_Constructor", loc:"Gurgaon", stk_lev: 140+" units", sts:"Active"},
    {Dname: "GHI_Constructor", loc:"Noida", stk_lev: 130+" units", sts:"Active"},
    {Dname: "JKL_Constructor", loc:"Greater Noida", stk_lev: 180+" units", sts:"Active"},
    {Dname: "MNO_Constructor", loc:"Ghaziabad", stk_lev: 160+" units", sts:"Active"},
    {Dname: "PQR_Constructor", loc:"Ghaziabad", stk_lev: 160+" units", sts:"Active"},
    {Dname: "STU_Constructor", loc:"Ghaziabad", stk_lev: 160+" units", sts:"Active"},
    {Dname: "VWX_Constructor", loc:"Ghaziabad", stk_lev: 160+" units", sts:"Active"},
    {Dname: "JK10_Constructor", loc:"Ghaziabad", stk_lev: 160+" units", sts:"Active"}
]

localStorage.setItem("listdealer",JSON.stringify(dealerData));

function getDealer(){
    const dealer_data = localStorage.getItem("listdealer");
    if(!dealer_data) console.error("Item list not found in localStorage.");

    let get_dealer = []
    try{
        get_dealer = JSON.parse(dealer_data);
    }
    catch(error)
    {
        console.error("Error parsing stored items:", error);
    }
    dealerShow(get_dealer);
}

function dealerShow(list){
    const container = document.querySelector(".dealer_table");
    container.innerHTML = 
    `<table class="dealer_content">
        <thead>
            <tr>
                <th>Dealer Name</th>
                <th>Location</th>
                <th>Stock Level</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="dealer-list-items">
            <!-- Dealer data will be populated here -->
            
        </tbody>
    </table>`;

    const tablebdy = document.querySelector("#dealer-list-items");
    list.forEach((p)=>{
        const card = document.createElement("tr");
        card.innerHTML =`
        <td>${p.Dname}</td>
        <td>${p.loc}</td>
        <td>${p.stk_lev}</td>
        <td><span class="status active">${p.sts}</span></td>`;
        tablebdy.appendChild(card);
    });
}

/* Leads Management.. */
let leads = [];
document.querySelector(".lead_close").addEventListener("click",()=>{
    document.querySelector(".lead-input").classList.add("hidden");

})

document.querySelector(".btn_leads").addEventListener("click", ()=>{
        document.querySelector(".lead-input").classList.remove("hidden");
})

document.querySelector(".lead-submit").addEventListener("click",()=>
{
    let get_leads = localStorage.getItem("listLead");

    leads =JSON.parse(get_leads);
    const l_name = document.querySelector("#lName");
    const l_src = document.querySelector("#source");    
    const assign_To = document.querySelector("#assignedName"); 
    const status = document.querySelector("#sts");  

    const newLeads = {
        LName:l_name.value, src:l_src.value, assign_to:assign_To.value, sts:status.value
    }

    leads.push(newLeads);

    if(!document.querySelector(".lead-input").classList.contains("hidden")){
        document.querySelector(".lead-input").classList.add("hidden");
    }

    localStorage.setItem("listLead", JSON.stringify(leads));
    getLeads();
})

let leads_Data = [
    {LName:"Global Tech Crop", src:"Website", assign_to:"Sarah Connor", sts:"Hot"},
    {LName:"Apex Logistics", src:"Referral", assign_to:"John Smith", sts:"Warm"}
]

localStorage.setItem("listLead", JSON.stringify(leads_Data));

function getLeads(){
    const lead_data = localStorage.getItem("listLead");
    if(!lead_data) console.error("Item list not found in localStorage.");

    let get_leads = []
    try{
        get_leads = JSON.parse(lead_data);
    }
    catch(error)
    {
        console.error("Error parsing stored items:", error);
    }
    leadShow(get_leads);
}

function leadShow(list){
    const contain = document.querySelector(".lead_table");
    contain.innerHTML = `
    <table class="lead_content">
        <thead>
            <tr>
                <th class="p-4">Lead Name</th>
                <th class="p-4">Source</th>
                <th class="p-4">Assigned To</th>
                <th class="p-4">Status</th>
                <th class="p-4">Actions</th>
            </tr>
        </thead>
        <tbody id="lead-list-items">
        <!-- Dealer data will be populated here -->
            
        </tbody>
    </table>`;

    const tablebdy = document.querySelector("#lead-list-items");
    list.forEach((p)=>{
        const card = document.createElement("tr");
        card.innerHTML =`
        <td>${p.LName}</td>
        <td>${p.src}</td>
        <td>${p.assign_to}</td>
        <td>${p.sts}</td>
        <td>Edit</td>`;
        tablebdy.appendChild(card);
    });
}

/* Order Management */
let order_Data = [];

let orderList = [
    {OrderID:"TF-101", DealerName:"Alpha Tech", ProductName:"Core Processor", Amount:"$"+1+","+200, Status:"pending", TimeLine:"Advance Status"},
    {OrderID:"TF-102", DealerName:"Nexus Systems", ProductName:"GPU Array", Amount:"$"+4+","+500, Status:"shipped", TimeLine:"Advance Status"},
    {OrderID:"TF-103", DealerName:"Byte Dealers", ProductName:"Neural Link", Amount:"$"+800, Status:"delivered", TimeLine:"Advance Status"}
]

localStorage.setItem("listOrder", JSON.stringify(orderList));

document.querySelector(".order_close").addEventListener("click", ()=>{
    document.querySelector(".order_input").classList.add("hidden");
})

document.querySelector(".order_btn").addEventListener("click",()=>{
    document.querySelector(".order_input").classList.remove("hidden");
})

document.querySelector(".order-submit").addEventListener("click",()=>
{
    let get_leads = localStorage.getItem("listOrder");

    order_Data =JSON.parse(get_leads);

    const Deal_name = document.querySelector("#dealName");
    const prod = document.querySelector("#prod");    
    const amt = document.querySelector("#amt"); 
    const stats = document.querySelector("#stats");  

    if(!Deal_name.value || !prod.value)
    {
        alert("Please fill in all required fields!");
        return;
    }

    const order_num = order_Data[order_Data.length-1];
    const lastId = order_num.OrderID;
    const lastNumber = parseInt(lastId.replace(/\D/g, ""));

    const newLeads = {

        OrderID:`TF-${lastNumber + 1}`, DealerName:Deal_name.value, ProductName:prod.value, Amount:"$"+amt.value, Status:stats.value, TimeLine:"Advance Status"
    }

    order_Data.push(newLeads);

    if(!document.querySelector(".order_input").classList.contains("hidden")){
        document.querySelector(".order_input").classList.add("hidden");
    }

    localStorage.setItem("listOrder", JSON.stringify(order_Data));
    getOrders();
})

function getOrders(){
    let list_order = localStorage.getItem("listOrder");
    if(!list_order) console.error("Item list not found in localStorage.");

    let getValue = [];
    try{
        getValue = JSON.parse(list_order);
    }
    catch(error)
    {
        console.error("Error parsing stored items:", error);
    }
    showOrder(getValue);
}

function showOrder(list){
    const box = document.querySelector(".order_table");
    box.innerHTML = `
    <table class="order_content">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Dealer Name</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Timeline</th>
            </tr>
        </thead>
        <tbody class="order_list_items">
            

        </tbody>
    </table>`;

    const tableBody = document.querySelector(".order_list_items");
    list.forEach((data)=>{
        const tableBox = document.createElement("tr");
        tableBox.innerHTML = `
        <td>${data.OrderID}</td>
        <td>${data.DealerName}</td>
        <td>${data.ProductName}</td>
        <td>${data.Amount}</td>
        <td>${data.Status}</td>
        <td>${data.TimeLine}</td>`;
        tableBody.appendChild(tableBox);
    });
}

/* ledger and payment.. */

let ledge_data = [];
const transactions = [
    { date: "2026-03-01", ref: "INV-5501", type: "Order", debit: 15000, credit: 0 },
    { date: "2026-03-05", ref: "PAY-102", type: "Payment", debit: 0, credit: 10000 },
    { date: "2026-03-12", ref: "INV-5588", type: "Order", debit: 4200, credit: 0 },
    { date: "2026-03-20", ref: "PAY-105", type: "Payment", debit: 0, credit: 5000 }
];

localStorage.setItem("listTransaction", JSON.stringify(transactions));

function getLedger(){
    let ledglist = localStorage.getItem("listTransaction");
    if(!ledglist) console.error("Item list not found in localStorage.");

    let get_ledg = [];
    try{
        get_ledg = JSON.parse(ledglist);
    }
    catch(error)
    {
        console.error("Error parsing stored items:", error);
    }
    showLedger(get_ledg);
}

function showLedger(list){
    const ledBox = document.querySelector(".ledger_table");
    let run_balance = 0;
    ledBox.innerHTML = `
    <table class="table_content">
        <thead>
            <tr>
                <th>Date</th>
                <th>Ref Number</th>
                <th>Type</th>
                <th>Debit(Order)</th>
                <th>Credit(Payment)</th>
                <th>Running Balance</th>
            </tr>
        </thead>
        <tbody class="list_item"></tbody>
    </table>`;

    const ledgerBody = document.querySelector(".list_item");
    list.forEach((data)=>{
        const table_Box = document.createElement("tr");
        run_balance += (data.debit - data.credit);
        table_Box.innerHTML = `
        <td>${data.date}</td>
        <td>${data.ref}</td>
        <td>${data.type}</td>
        <td class="text-danger">${data.debit > 0 ? "$"+data.debit.toLocaleString():"-"}</td>
        <td class="text-success">${data.credit > 0 ? "$"+data.credit.toLocaleString():"-"}</td>
        <td>${run_balance.toLocaleString()}</td>`;
        ledgerBody.appendChild(table_Box);
        document.querySelector("#total-due").innerHTML = "$"+run_balance.toLocaleString();
    })
}

/* Ledger Management */
const incentiveData = [
    { name: "Q1 Bulk Buyer", period: "Jan-Mar", target: 100000, current: 112000, payout: 2240, status: "Paid" },
    { name: "Summer Blast", period: "April", target: 50000, current: 32500, payout: 0, status: "In Progress" }
];

localStorage.setItem("listInct",JSON.stringify(incentiveData));

function getIncentive(){
    let listInce = localStorage.getItem("listInct");
    if(!listInce) console.error("Item list not found in localStorage.");

    let get_incent = [];
    try{
        get_incent = JSON.parse(listInce);
    }
    catch(error)
    {
        console.error("Error parsing stored items:", error);
    }
    showIncentive(get_incent);
}

function showIncentive(list){
    const box = document.querySelector(".table-container");
    box.innerHTML = `
    <table class="order_content">
        <thead>
            <tr>
                <th>Scheme Name</th>
                <th>Period</th>
                <th>Target</th>
                <th>Achievement</th>
                <th>Earnings</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody id="incentive-list">
            

        </tbody>
    </table>`;

    const tableBody = document.querySelector("#incentive-list");
    list.forEach((data)=>{
        const tableBox = document.createElement("tr");
        tableBox.innerHTML = `
        <td>${data.name}</td>
        <td>${data.period}</td>
        <td>${data.target.toLocaleString()}</td>
        <td>${data.current.toLocaleString()}</td>
        <td>${data.payout.toLocaleString()}</td>
        <td>${data.status}</td>`;
        tableBody.appendChild(tableBox);
    });
}