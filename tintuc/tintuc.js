// API Key của bạn từ NewsAPI
const apiKey = '5aee14a15a574cd392cd7d039d603477';
const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-14-12&sortBy=publishedAt&apiKey=5aee14a15a574cd392cd7d039d603477`;

async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            displayNews(data.articles);
        } else {
            alert('Không thể tải tin tức.');
        }
    } catch (error) {
        console.error('Lỗi khi tải tin tức:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        // Kiểm tra nếu có ảnh
        const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/400x250?text=No+Image'; // Sử dụng ảnh placeholder nếu không có ảnh

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Tin tức';
        image.classList.add('news-image'); // Thêm lớp để định dạng ảnh

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || 'Không có mô tả';

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Đọc thêm';
        link.target = '_blank';

        // Thêm ảnh vào phần tử bài viết
        newsItem.appendChild(image);
        newsItem.appendChild(title);
        newsItem.appendChild(description);
        newsItem.appendChild(link);

        newsContainer.appendChild(newsItem);
    });
}

// Gọi hàm fetchNews khi trang được tải
fetchNews();
