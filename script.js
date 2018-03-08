const requestInput = document.getElementById('request-input');
const countInput = document.getElementById('count-input');
const galleryList = document.getElementById('gallery-list');

requestInput.addEventListener('input', inputHandler);
countInput.addEventListener('input', inputHandler);

function inputHandler() {
  const searchQuery = requestInput.value;
  const count = countInput.value;

  if (!searchQuery) {
    galleryList.innerHTML = '';
    return;
  }

  sendRequest(searchQuery, count);
}

function sendRequest(query, count) {
  count = count || 10;
  query = encodeURIComponent(query);

  const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=NXNp3Vhfmrv6xJTAP40VoofaPdHSZCj9&limit=${count}`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      console.error(xhr.status + ': ' + xhr.statusText);
    } else {
      const res = xhr.responseText;
      const data = JSON.parse(res);

      galleryList.innerHTML = '';
      data.data.forEach(img => {
        const li = document.createElement('li');
        const image = document.createElement('img');

        image.setAttribute('alt', img.title);
        image.setAttribute('src', img.images.fixed_width_downsampled.url);

        li.appendChild(image);

        galleryList.appendChild(li);
      });
    }
  }

  xhr.onload = () => {
    console.log(`Request: "${query}" with count: ${count} has been successfully finished`);
  }

  xhr.onabort = () => {
    console.log(`Request "${query}" with count ${count} has been aborted`);
  }
}