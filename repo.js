let box = document.querySelector(".box1");
let upper = document.querySelector("#up");
let list = document.querySelector("#droplist");
let text = document.querySelector(".shade");
let center = document.querySelector("#center");
let btn = document.querySelector("#refresh");

async function fetchRepository(query) {
    try {
        btn.innerHTML = 'Refresh';
        btn.style.backgroundColor = 'black';
        text.style.backgroundColor = 'white';
        center.innerHTML = 'Loading...';
        let response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
        let data = await response.json();
        if (data.items.length > 0) {
            let num = Math.floor(Math.random() * data.items.length);
            let repo = data.items[num];
            let repoInfo = `
                <div>
                    <h3>${repo.name}</h3>
                    <p>Stars: ${repo.stargazers_count}</p>
                    <p>Link: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
                </div>
            `;
            center.innerHTML = repoInfo;
        } else {
            center.innerHTML = 'No repositories found';
        }
    } catch (error) {
        btn.style.backgroundColor = 'red';
        btn.innerHTML = 'Click to Retry';
        text.style.backgroundColor = 'red';
        console.error('Error fetching data:', error);
        center.innerHTML = 'Error fetching data';
    }
}

list.addEventListener("change", function() {
    btn.style.display = 'block';
    let val = list.value;
    console.log(val);
    fetchRepository(val);
});

btn.addEventListener("click", function() {
    let val = list.value;
    console.log('Refreshing with value:', val);
    fetchRepository(val);
});