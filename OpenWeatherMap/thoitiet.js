
document.addEventListener("DOMContentLoaded", function () {
    const search = document.querySelector('.search');
    const city = document.querySelector('.city');
    const country = document.querySelector('.country');
    const value = document.querySelector('.value');
    const shortDesc = document.querySelector('.short-desc');
    const visibility = document.querySelector('.visibility span');
    const wind = document.querySelector('.wind span');
    const sun = document.querySelector('.sun span');

    const apiKey = 'd4a0139be0b4a2167dceb39e3c0a7360';

    async function fetchWeatherData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please try again.');
        }
    }

    function displayWeatherData(data) {
        city.textContent = data.name;
        country.textContent = data.sys.country;
        value.textContent = `${data.main.temp}°C`;
        shortDesc.textContent = translateWeatherDescription(data.weather[0].description);
        visibility.textContent = `${data.visibility} m`;
        wind.textContent = `${data.wind.speed} m/s`;
        sun.textContent = `${data.main.humidity}%`;
    }

    // Initial fetch for Hanoi weather
    fetchWeatherData('Hanoi');

    // Add event listener for search functionality
    search.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            const cityName = e.target.value.trim();
            if (cityName) {
                fetchWeatherData(cityName);
            }
        }
    });
});
function translateWeatherDescription(description) {
    const translations = {
        "clear sky": "Trời quang",
        "few clouds": "Có mây rải rác",
        "scattered clouds": "Mây rải rác",
        "broken clouds": "Mây đứt đoạn",
        "shower rain": "Mưa rào",
        "rain": "Mưa",
        "thunderstorm": "Dông",
        "snow": "Tuyết",
        "mist": "Sương mù",
        "overcast clouds": "Những đám mây u ám",

    };
    return translations[description] || description; // không có trong danh sách, giữ nguyên tiếng Anh
}
