// các phần tử từ DOM
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

// Địa chỉ API của OpenFDA
const apiEndpoint = 'https://api.fda.gov/drug/label.json';

// Hàm tìm kiếm thông tin thuốc
async function searchDrug() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Vui lòng nhập tên thuốc.');
        return;
    }

    // Xóa kết quả trước đó
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(`${apiEndpoint}?search=openfda.brand_name:${query}&limit=5`);
        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu từ API OpenFDA.');
        }
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayResults(data.results);
        } else {
            resultsDiv.innerHTML = `<p>Không tìm thấy kết quả cho "${query}".</p>`;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p>Lỗi: ${error.message}</p>`;
    }
}

// Hàm hiển thị kết quả
function displayResults(results) {
    results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const title = item.openfda.brand_name ? item.openfda.brand_name[0] : 'Tên thuốc không xác định';
        const manufacturer = item.openfda.manufacturer_name ? item.openfda.manufacturer_name[0] : 'Nhà sản xuất không xác định';
        const purpose = item.purpose ? item.purpose[0] : 'Không có thông tin mục đích sử dụng.';

        resultItem.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Nhà sản xuất:</strong> ${manufacturer}</p>
            <p><strong>Mục đích:</strong> ${purpose}</p>
        `;
        resultsDiv.appendChild(resultItem);
    });
}

// Thêm sự kiện vào nút tìm kiếm
searchButton.addEventListener('click', searchDrug);
