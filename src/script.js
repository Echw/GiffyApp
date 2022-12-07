let APIKEY = "QwEqislrcalLNHEvWSpbSmY7pUUQKBhj";

const fetchGifs = async (url) => {
  const result = await fetch(url);
  if (result && result.ok) {
    return await result.json();
  } else {
    channelsContainer.innerHTML = "Server Error!";
    throw new Error("Server Error!");
  }
};

const init = () => {
  document.getElementById("searchBtn").addEventListener("click", async (e) => {
    e.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=3&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    const fetchedGifs = await fetchGifs(url);
    console.log(fetchedGifs);
    generateGifs(fetchedGifs.data);
  });
};
document.addEventListener("DOMContentLoaded", init);

const gifsContainer = document.getElementById("gifs-wrapper");

const generateGifs = (gifs) => {
  gifsContainer.innerHTML = "";

  gifs.forEach((gif) => {
    const template = ` 
        <div class='gif'>
              <img  class="img" src=${gif.images.downsized_large.url} alt='${gif.title}'/>
        </div>
    `;
    gifsContainer.insertAdjacentHTML("beforeend", template);
  });
};
