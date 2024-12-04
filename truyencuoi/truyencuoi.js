
document.getElementById("joke-btn").addEventListener("click", fetchJoke);

function fetchJoke() {
    const jokeElement = document.getElementById("joke");
    jokeElement.textContent = "Đang tải...";  // Hiển thị thông báo tải

    // Gọi API JokeAPI
    fetch("https://v2.jokeapi.dev/joke/Any?type=single")
        .then(response => response.json())
        .then(data => {
            // Kiểm tra xem API có câu chuyện hài hay không
            if (data.error) {
                jokeElement.textContent = "Không thể lấy câu chuyện hài.";
            } else {
                // Nếu câu chuyện hài tồn tại, hiển thị nó
                jokeElement.textContent = data.joke;
            }
        })
        .catch(error => {
            jokeElement.textContent = "Đã có lỗi xảy ra. Thử lại sau.";
        });
}


