document.getElementById("serch-icon").addEventListener("click",()=>{
    const search=document.getElementById("search");
    search.style.display="flex";
    
});

let isSidebarDisplayed = false;
document.getElementById("menu-bar").addEventListener("click", () => {
    const leftSidebar = document.querySelector(".left-side-bar");

    if (!isSidebarDisplayed) {
        leftSidebar.style.display = "flex";
        isSidebarDisplayed = true;
    } else {
        leftSidebar.style.display = "none";
        isSidebarDisplayed = false;
    }
});


