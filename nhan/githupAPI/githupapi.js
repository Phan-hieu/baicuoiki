async function getGitHubInfo() {
    const username = document.getElementById('githubUsername').value;
    const userInfoDiv = document.getElementById('userInfo');

    if (!username) {
        alert("Vui lòng nhập tên người dùng GitHub.");
        return;
    }

    const url = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.message === "Not Found") {
            alert("Không tìm thấy người dùng GitHub này.");
            userInfoDiv.style.display = 'none';
            return;
        }

        userInfoDiv.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar">
            <h2>${data.name || username}</h2>
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Repositories:</strong> ${data.public_repos}</p>
            <p><strong>Bio:</strong> ${data.bio || "Chưa có thông tin bio."}</p>
        `;
        userInfoDiv.style.display = 'block';
    } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu từ GitHub:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
}
