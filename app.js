let searchBtn = document.getElementById("search-btn");
let followers = document.getElementById("followers");
let following = document.getElementById("following");
let createdAt = document.getElementById("createdAt");
let repo = document.getElementById("Repositories");
let userSearch = document.getElementById("p-Name");
let profileLink = document.getElementById("profileLink");
let userLocation = document.getElementById("userLocation");
let profileImage = document.getElementById("profileImage");
let apiKey = 'https://api.github.com/users/';
let updatedAt = document.getElementById("updatedAt");

let getData = () => {
    let data = new Promise((resolve, reject) => {
        fetch(apiKey + userSearch.value)
            .then(async (res) => resolve(await res.json()))
            .catch((err) => reject(err));

    });

    data.then((res) => {
        const date = new Date(res.created_at);
        const updatedDate = date.toLocaleDateString();
        createdAt.innerText = updatedDate;
        profileLink.innerHTML = `<a href="${res.html_url}" target="_blank">${res.html_url}</a>`;
        userLocation.innerText = res.location;
        followers.innerText = res.followers;
        following.innerText = res.following;
        repo.innerText = res.public_repos;
        profileImage.src = res.avatar_url;
        updatedAt.innerText = res.updated_at;
        userSearch.value = "";



    }).catch((err) => {
        console.log("Errr", err)
    });
}

searchBtn.addEventListener("click", getData);

userSearch.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        getData()
    }
});

