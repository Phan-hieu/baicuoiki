// Thay thế bằng API Key của bạn từ WeatherAPI
const apiKey = '3c2c89ee0f91444da9045701243011';

// Hàm lấy thông tin thời tiết
async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=vi`;

    if (city) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                alert("Không tìm thấy thành phố. Vui lòng kiểm tra lại!");
                return;
            }

            // Hiển thị thông tin thời tiết
            document.getElementById('city-name').innerText = `Thành phố: ${data.location.name}, ${data.location.country}`;
            document.getElementById('temperature').innerText = `Nhiệt độ: ${data.current.temp_c}°C`;
            document.getElementById('condition').innerText = `Thời tiết: ${data.current.condition.text}`;

            document.getElementById('weather-info').style.display = 'block';
        } catch (error) {
            alert("Đã xảy ra lỗi khi lấy dữ liệu thời tiết.");
        }
    } else {
        alert("Vui lòng nhập tên thành phố.");
    }
}
