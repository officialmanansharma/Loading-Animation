const loader = document.getElementById('loader-id');
const content = document.getElementById('content-id');

window.addEventListener("load", (event) => {
    loader.style.display = 'flex';
    setTimeout(() => {
        loader.style.display = 'none';
        getData();
    }, 3000);
});

//--------------------------------------------------------

let page = 1;
const data = 'https://newsapi.org/v2/everything?q=tesla&from=2023-10-23&sortBy=publishedAt&apiKey=ebf9900e73434f09bc30dd893c0c4edd';
const container = document.querySelector('.container');
const contentLoader = document.querySelector('.content-loader');
let isLoading = false;

async function getData() {
    try {
        const response = await fetch(`${data}?_page=${page}&_limit=1`);
        const contents = await response.json();
        drawData(contents);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function drawData(contents) {
    const section = contents.map((content) =>
        `
        <div class="section">
            <h1>Section ${content.id}</h1>
            <h3>${content.title}</h3>
            <p>${content.body}</p>
        </div>
        `
    );
    page++;
    container.innerHTML += section;
    isLoading = false;
}

window.addEventListener('scroll', () => {
    if (!isLoading && isScrolledToBottom()) {
        contentLoader.classList.remove('hidden');
        isLoading = true;
        setTimeout(() => {
            contentLoader.classList.add('hidden');
            getData();
        }, 1000);
    }
});

function isScrolledToBottom() {
    return (
        document.documentElement.scrollTop + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight
    );
}