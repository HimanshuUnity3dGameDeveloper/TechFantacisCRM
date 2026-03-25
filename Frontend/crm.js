const anchor = document.querySelectorAll("li");
const module_v = document.querySelectorAll(".module-view");

/* Dealer Management */
document.querySelector(".btn_dealer").addEventListener("click", ()=>{
    if(!document.querySelector(".dealer-input").classList.contains("hidden")){
        return;
    }else{
        document.querySelector(".dealer-input").classList.remove("hidden")
    }
})

document.querySelector(".dealer-submit").addEventListener("click",()=>
{
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

    const dealer_Data = leadData.push(newDealer);

    localStorage.setItem("listLead", JSON.stringify(dealer_Data));
    getLead();
    
    if(!document.querySelector(".dealer-input").classList.contains("hidden")){
        document.querySelector(".dealer-input").classList.add("hidden")
    }
})

/* Leads Management */
document.querySelector(".btn_leads").addEventListener("click", ()=>{
    if(!document.querySelector(".lead-input").classList.contains("hidden")){
        return;
    }else{
        document.querySelector(".lead-input").classList.remove("hidden")
    }
})

document.querySelector(".lead-submit").addEventListener("click",()=>
{
    if(!document.querySelector(".lead-input").classList.contains("hidden")){
        document.querySelector(".lead-input").classList.add("hidden")
    }
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
        document.querySelector("h2").innerHTML = "Dashboard";
    }
    else if(anchor[1].classList.contains("active")){
        module_v[1].classList.remove("hidden");
        document.querySelector("h2").innerHTML = "Dealer Management";
        getDealer();
    }
    else if(anchor[2].classList.contains("active")){
        module_v[2].classList.remove("hidden");
        document.querySelector("h2").innerHTML = "Lead Management";
        getLeads();
    }

}

/* Dealer Managements... */
let dealerData = [
    {Dname: "ABC_Constructor", loc:"New Delhi", stk_lev: 150+" units", sts:"Active"},
    {Dname: "DEF_Constructor", loc:"Gurgaon", stk_lev: 140+" units", sts:"Active"},
    {Dname: "GHI_Constructor", loc:"Noida", stk_lev: 130+" units", sts:"Active"},
    {Dname: "JKL_Constructor", loc:"Greater Noida", stk_lev: 180+" units", sts:"Active"},
    {Dname: "MNO_Constructor", loc:"Ghaziabad", stk_lev: 160+" units", sts:"Active"}
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
function getLeads(){
    const lead_data = localStorage.getItem("listdealer");
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

}