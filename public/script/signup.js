const myForm = document.getElementById('myForm');
const hoTenInput = document.getElementById('hoTenInput');
const diaChiInput = document.getElementById('diaChiInput');
const soDienThoaiInput = document.getElementById('soDienThoaiInput');
const taiKhoanInput = document.getElementById('taiKhoanInput');
const matKhauInput = document.getElementById('matKhauInput');
const xacNhanMatKhauInput = document.getElementById('xacNhanMatKhauInput');

myForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (hoTenInput.value.trim() === '' ||
      diaChiInput.value.trim() === '' ||
      soDienThoaiInput.value.trim() === '' ||
      taiKhoanInput.value.trim() === '' ||
      matKhauInput.value.trim() === '' ||
      xacNhanMatKhauInput.value.trim() === '') {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  if (matKhauInput.value !== xacNhanMatKhauInput.value) {
    alert('Mật khẩu và xác nhận mật khẩu không khớp.');
    return;
  }

  
  // Gọi hàm fetch API
  await fetch('http://localhost:3000/auth/signup/', {
    method: 'POST',
    body: JSON.stringify({
      name: hoTenInput.value,
      address: diaChiInput.value,
      phone: soDienThoaiInput.value,
      account: taiKhoanInput.value,
      password: matKhauInput.value,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then( response => response.json())
  .then(response => {
    console.log(response)
    if(response.message == "Tạo tài khoản thành công")
    {
      // Chuyển hướng trang web của bạn sang một trang khác
      window.location.replace('http://localhost:3000/login/');
    }
    else{
      alert(response.message)
    }

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});