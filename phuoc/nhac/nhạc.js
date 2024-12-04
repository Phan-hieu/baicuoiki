const clientId = '20f703db068d4ab2a2c5425e20a3e139'; //  Client ID 
const clientSecret = 'fc02bf84d4184a8faf62a356fd18ae5f'; //  Client Secret 

// lấy token truy cập từ Spotify
async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

//  tìm kiếm bài hát
async function searchTracks(query) {
    const token = await getToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await response.json();
    return data.tracks.items;
}

// sự kiện cho nút tìm kiếm
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search').value;
    if (!query) return;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Loading...';

    try {
        const tracks = await searchTracks(query);
        resultsContainer.innerHTML = '';

        tracks.forEach(track => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <p><strong>${track.name}</strong> by ${track.artists.map(artist => artist.name).join(', ')}</p>
                <audio controls src="${track.preview_url}">Your browser does not support the audio element.</audio>
            `;
            resultsContainer.appendChild(div);
        });
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = 'Error loading results.';
    }
});
