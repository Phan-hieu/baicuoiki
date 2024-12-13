{/* <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYTePaWRAj2MK2fqF4J0ykJKdSnCUdz2wiFQ&s"
                        alt="">
                    <div class="detail">
                        <h3>fjadlkfjalk</h3>
                        <p>fasdfd</p>
                    </div>
                </div> */}
// const list = document.getElementById('list');
// const search = document.getElementById('search')
// Lấy tham chiếu đến các phần tử HTML
const list = document.getElementById('list');
const search = document.getElementById('search');

// Hàm lấy dữ liệu từ API
async function fetchUsers() {
    try {
        const response = await fetch('https://randomuser.me/api?results=100');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
        return [];
    }
}

// hiển thị danh sách người dùng
function renderUsers(users) {
    // Xóa nội dung cũ trước khi hiển thị
    list.innerHTML = '';

    // Duyệt qua danh sách người dùng và thêm vào giao diện
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
      <img src="${user.picture.thumbnail}" alt="${user.name.first}" style="border-radius: 50%; margin-right: 10px;">
      <strong>${user.name.first} ${user.name.last}</strong>
      <small>${user.email}</small>
    `;
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        list.appendChild(li);
    });
}

// Hàm lọc người dùng dựa trên từ khóa tìm kiếm
function filterUsers(users, searchTerm) {
    return users.filter(user =>
        user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Hàm chính để gọi API và xử lý sự kiện
async function main() {
    // Lấy người dùng từ API
    const users = await fetchUsers();

    // Hiển thị danh sách người dùng ban đầu
    renderUsers(users);

    // Thêm sự kiện tìm kiếm
    search.addEventListener('input', (e) => {
        const filteredUsers = filterUsers(users, e.target.value);
        renderUsers(filteredUsers);
    });
}

// Gọi hàm chính để khởi chạy
main();
