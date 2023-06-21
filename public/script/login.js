    const loginForm = document.querySelector('#login-form');
    const emailInput = document.querySelector('#email-input');
    const passwordInput = document.querySelector('#password-input');
    const loginButton = document.querySelector('#login-button');

    loginButton.addEventListener('click', async () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        // Gọi API bằng Axios để kiểm tra thông tin
        try {
            // Gọi API lấy dữ liệu từ database
            const response = await fetch( "http://localhost:3000/auth/login", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    account: email,
                    password: password
                }),
            })
            .then( response => response.json())
            .then( response => {
                //Trả về tất cả các tin tức
                return response;
            })
            .catch(( Error ) => {
                return  [];
            });

            if(response.message == "Đăng nhập thành công")
            {
                const response = await fetch( "http://localhost:3000/auth/login/isAuthenticated", { 
                    method: 'post', 
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    account: email
                }),})
                // Chuyển hướng đến trang khác nếu đăng nhập thành công
                window.location.href = '/dashboard';
            }
            else
            {
                alert('Tài khoản mật khẩu không chính xác');
            }
        } catch (error) {
            console.error(error);
            // Hiển thị thông báo lỗi nếu đăng nhập không thành công
            alert('Đang có lỗi xảy ra');
        }
    });