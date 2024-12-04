document.getElementById('getFactBtn').addEventListener('click', function () {
    //  thông tin về mèo từ API catfact.ninja
    fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            const catFactText = data.fact;
            document.getElementById('catFactText').textContent = catFactText;
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin mèo:', error);
            document.getElementById('catFactText').textContent = 'Không thể lấy thông tin về mèo.';
        });

    // Lấy hình ảnh mèo ngẫu nhiên từ API TheCatAPI
    const apiKey = 'YOUR_API_KEY';
    const catImageUrl = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`;

    fetch(catImageUrl)
        .then(response => response.json())
        .then(data => {
            const catImage = data[0].url;
            document.getElementById('catImage').src = catImage;
        })
        .catch(error => {
            console.error('Lỗi khi lấy hình ảnh mèo:', error);
            document.getElementById('catImage').src = '';
        });

    // Lấy hình ảnh ngẫu nhiên về chó từ API dog.ceo
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            const dogImageUrl = data.message;
            document.getElementById('dogImage').src = dogImageUrl;
        })
        .catch(error => {
            console.error('Lỗi khi lấy hình ảnh chó:', error);
            document.getElementById('dogImage').src = '';
        });
});
