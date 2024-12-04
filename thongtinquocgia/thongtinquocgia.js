document.getElementById('fetch-btn').addEventListener('click', function () {
    const countryName = document.getElementById('country-name').value.trim();

    if (countryName === '') {
        alert('Vui lòng nhập tên quốc gia.');
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Quốc gia không tồn tại!');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0]; // Lấy thông tin quốc gia đầu tiên từ dữ liệu trả về

            const countryInfo = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt="Cờ của ${country.name.common}" />
                <p><strong>Thủ đô:</strong> ${country.capital ? country.capital[0] : 'Không có thông tin'}</p>
                <p><strong>Dân số:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Khu vực:</strong> ${country.region}</p>
            `;

            document.getElementById('country-info').innerHTML = countryInfo;
            document.getElementById('country-info').style.display = 'block';
        })
        .catch(error => {
            document.getElementById('country-info').style.display = 'none';
            alert(error.message);
        });
});
