// Dữ liệu tài khoản và sản phẩm giả lập
const users = {
    'user1': '12345'
};

const products = [
    { id: 1, name: 'Laptop', price: 500 },
    { id: 2, name: 'Smartphone', price: 300 },
    { id: 3, name: 'Headphones', price: 50 },
    { id: 4, name: 'Monitor', price: 150 },
    { id: 5, name: 'Keyboard', price: 30 },
];

// Xử lý đăng nhập
document.getElementById('login-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Kiểm tra nếu cả 2 ô input đều trống
    if (username.trim() === '' && password.trim() === '') {
        errorMessage.textContent = 'Username and password cannot be empty';
        return;
    }

    // Kiểm tra nếu username và password có ít nhất 5 ký tự
    if (username.length < 5 & password.length < 5) {
        errorMessage.textContent = 'Username and password must be at least 5 characters long';
        return;
    }

    if (username.length < 5) {
        errorMessage.textContent = 'Username must be at least 5 characters long';
        return;
    }

    if (password.length < 5) {
        errorMessage.textContent = 'Password must be at least 5 characters long';
        return;
    }

    if (users[username] === password) {
        localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập
        window.location.href = '../pages/products.html'; // Chuyển hướng sang products.html
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Hiển thị danh sách sản phẩm
function displayProducts(products) {
    const tableBody = document.getElementById('products-table-body');
    const noProductsMessage = document.getElementById('no-products-message');
    tableBody.innerHTML = '';

    if (products.length === 0) {
        noProductsMessage.style.display = 'block';
    } else {
        noProductsMessage.style.display = 'none';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Tìm kiếm sản phẩm khi nhấn nút
document.getElementById('search-btn')?.addEventListener('click', function() {
    const searchQuery = document.getElementById('product-name').value.toLowerCase();
    
    if (this.textContent === 'Search') {
        // Thực hiện tìm kiếm khi nút là 'Search'
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );
        displayProducts(filteredProducts);
        this.textContent = 'Cancel';  // Đổi nút thành 'Cancel'
        this.classList.add('cancel');  // Thêm lớp 'cancel' để thay đổi màu nút
    } else {
        // Hiển thị lại tất cả sản phẩm khi nút là 'Cancel'
        document.getElementById('product-name').value = '';  // Xóa giá trị trong ô tìm kiếm
        displayProducts(products);  // Hiển thị lại toàn bộ sản phẩm
        this.textContent = 'Search';  // Đổi nút thành 'Search'
        this.classList.remove('cancel');  // Xóa lớp 'cancel' để khôi phục màu nút
    }
});

// Thêm sản phẩm
document.getElementById('add-product-btn')?.addEventListener('click', function() {
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;

    // Kiểm tra nếu tên sản phẩm và giá hợp lệ
    if (productName.trim() === '' || (productPrice.trim() === '' || isNaN(productPrice) || productPrice <= 0)) {
        if (productPrice === '') {
            alert('Please enter a product price');
        } else if (isNaN(productPrice)) {
            alert('Please enter a valid number for product price');
        } else if (productPrice <= 0) {
            alert('Product price must be greater than 0');
        } else {
            alert('Please enter a valid product name');
        }
        return;
    }

    // Tạo sản phẩm mới
    const newProduct = {
        id: products.length + 1,  // ID tự động tăng theo số lượng sản phẩm hiện có
        name: productName,
        price: parseFloat(productPrice)
    };

    // Thêm sản phẩm vào mảng sản phẩm
    products.push(newProduct);

    // Cập nhật lại danh sách sản phẩm hiển thị
    displayProducts(products);

    // Xóa các giá trị trong input
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
});

// Hiển thị danh sách sản phẩm khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);  // Hiển thị toàn bộ sản phẩm ban đầu
});

// Kiểm tra trạng thái đăng nhập và hiển thị sản phẩm
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('products.html')) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            displayProducts(products); // Hiển thị danh sách sản phẩm
        } else {
            window.location.href = '../pages/index.html'; // Quay lại trang đăng nhập nếu chưa đăng nhập
        }
    }
});

// Xử lý đăng xuất
document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
    window.location.href = '../pages/index.html'; // Quay lại trang đăng nhập
});
