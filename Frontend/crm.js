const anchor = document.querySelectorAll("li");
const module_v = document.querySelectorAll(".module-view");

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
    }
    else if(anchor[1].classList.contains("active")){
        module_v[1].classList.remove("hidden");
    }
    else if(anchor[2].classList.contains("active")){
        module_v[2].classList.remove("hidden");
    }

}