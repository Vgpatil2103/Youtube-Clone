

let API_KEY = "AIzaSyBb3PAC6R8XJwh3_UrYwwG8YPLevueEr88";

async function popular() {
    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=20`;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.items);

    const channelDetails = [];
    for (const { snippet } of data.items) {
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet&id=${snippet.channelId}`
        );
        const channelData = await channelResponse.json();
        channelDetails.push(channelData.items[0].snippet);
    }

    append(data.items, channelDetails);
     
}

popular();

function append(data,channelDetails) {
    let container = document.createElement("div");
    container.className = "videos";

    data.forEach(({ snippet, id: { videoId } },index) => {
        let img = snippet.thumbnails.high.url;
        let title = snippet.title;
        let channelTitle = snippet.channelTitle;
        let channelLogo = channelDetails[index].thumbnails.default.url;
        let videoElement = document.createElement("div");
        videoElement.classList.add("video-list");

        videoElement.innerHTML = `
            <div class="videoPreview">
                <img id="thumbnail" src="${img}">
            </div>
            <div class="logo_description">
                <div class="channel">
                    <img id="channel-logo" src=${channelLogo}>
                </div>
                <div class="description">
                    <p id="description-text">${channelTitle}</p>
                    <div class="channel-name">
                        <p id="video-channel-name">${title}</p>
                    </div>
                    <div class="views">
                        <p id="video-views">2M Views .</p>
                        <div class="year">
                            <p id="video-year"> &nbsp; 1 Year ago</p>
                        </div>
                    </div>
                </div>
            </div>`;

        container.appendChild(videoElement);
    });

    // Appending the created videos to the element with class 'videos'
    document.querySelector(".videos").appendChild(container);
}
//search functionality

    async function searching(searchTerm = "") {
   
    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=20&q=${searchTerm}`;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.items);
    const channelDetails = [];
    for (const { snippet } of data.items) {
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet&id=${snippet.channelId}`
        );
        const channelData = await channelResponse.json();
        console.log(channelData);
        channelDetails.push(channelData.items[0].snippet);
    }

    searchAppend(data.items, channelDetails);
   

   
    
    
}

function searchAppend(data,channelDetails){
    // Clear existing videos
    document.querySelector(".videos").innerHTML = "";

    let container = document.createElement("div");
    container.className = "videos";

    data.forEach(({ snippet, id: { videoId } }, index) => {
        let img = snippet.thumbnails.high.url;
        let title = snippet.title;
        let channelTitle = snippet.channelTitle;
        let channelLogo = channelDetails[index].thumbnails.default.url;
        let videoElement = document.createElement("div");
        videoElement.classList.add("video-list");

        videoElement.innerHTML = `
            <div class="videoPreview">
                <img id="thumbnail" src="${img}">
            </div>
            <div class="logo_description">
                <div class="channel">
                    <img id="channel-logo" src=${channelLogo}>
                </div>
                <div class="description">
                    <p id="description-text">${channelTitle}</p>
                    <div class="channel-name">
                        <p id="video-channel-name">${title}</p>
                    </div>
                    <div class="views">
                        <p id="video-views">2M Views .</p>
                        <div class="year">
                            <p id="video-year"> &nbsp; 1 Year ago</p>
                        </div>
                    </div>
                </div>
            </div>`;

        container.appendChild(videoElement);
    });

    // Appending the created videos to the element with class 'videos'
    document.querySelector(".videos").appendChild(container);
}
document.getElementById("search-icon").addEventListener("click", () => {
    const searchTerm = document.getElementById("search").value;
    searching(searchTerm);
    const search=document.getElementById("search");
    search.style.display="flex";
});


//quicklinks

async function qlinks(searchTerm = "") {
    const BASE_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=20&q=${searchTerm}`;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data.items);

    const channelDetails = [];
    for (const { snippet } of data.items) {
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet&id=${snippet.channelId}`
        );
        const channelData = await channelResponse.json();
        console.log(channelData);
        channelDetails.push(channelData.items[0].snippet);
    }

    searchqlinkAppend(data.items, channelDetails);
}

function searchqlinkAppend(data, channelDetails) {
    // Clear existing videos
    document.querySelector(".videos").innerHTML = "";

    let container = document.createElement("div");
    container.className = "videos";

    data.forEach(({ snippet, id: { videoId } }, index) => {
        let img = snippet.thumbnails.high.url;
        let title = snippet.title;
        let channelTitle = snippet.channelTitle;
        let channelLogo = channelDetails[index].thumbnails.default.url;
        let videoElement = document.createElement("div");
        videoElement.classList.add("video-list");

        videoElement.addEventListener("click", () => {
            playVideo(videoId);
        });
        
        videoElement.innerHTML = `
            <div class="videoPreview">
                <img id="thumbnail" src="${img}">
            </div>
            <div class="logo_description">
                <div class="channel">
                    <img id="channel-logo" src=${channelLogo}>
                </div>
                <div class="description">
                    <p id="description-text">${channelTitle}</p>
                    <div class="channel-name">
                        <p id="video-channel-name">${title}</p>
                    </div>
                    <div class="views">
                        <p id="video-views">2M Views .</p>
                        <div class="year">
                            <p id="video-year"> &nbsp; 1 Year ago</p>
                        </div>
                    </div>
                </div>
            </div>`;

        container.appendChild(videoElement);
    });

    // Appending the created videos to the element with class 'videos'
    document.querySelector(".videos").appendChild(container);
}

// Fix event listener for all buttons with the class 'quick-link'
document.querySelectorAll(".quick-link").forEach(button => {
    button.addEventListener("click", () => {
        const searchTerm = button.id;
        qlinks(searchTerm);
        button.classList.add("active");
        });
});


function playVideo(videoId) {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
}

//left menu bar
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


