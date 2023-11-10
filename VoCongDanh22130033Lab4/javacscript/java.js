function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function save() {
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let gender = "";
  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("male").value;
  }
  // kiểm tra xem đã nhập đúng hay chưa
  if (_.isEmpty(fullname)) {
    document.getElementById("fullname-error").innerHTML =
      "Vui lòng nhập Họ và tên!";
  } else if (fullname.trim().length <= 2) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "Họ và tên phải  không được nhỏ hơn 2 kí tự";
  } else if (fullname.trim().length > 50) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "Họ và tên phải  không được lớn hơn 50 kí tự";
  } else if (fullname) {
    document.getElementById("fullname-error").innerHTML = "";
  }

  if (_.isEmpty(email)) {
    email = "";
    document.getElementById("email-error").innerHTML =
      "Vui lòng Email của bạn!";
  } else if (!emailIsValid(email)) {
    email = "";
    document.getElementById("email-error").innerHTML =
      "Vui lòng nhập đúng định dạng Email!";
  } else if (email) {
    document.getElementById("email-error").innerHTML = "";
  }
  if (_.isEmpty(phone)) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "Vui lòng số điện thoại của bạn!";
  } else if (phone.trim().length > 10) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "Số điện thoại không đúng";
  } else if (phone) {
    document.getElementById("phone-error").innerHTML = "";
  }
  if (_.isEmpty(address)) {
    address = "";
    document.getElementById("address-error").innerHTML =
      "Vui lòng địa chỉ của bạn!";
  } else if (address) {
    document.getElementById("address-error").innerHTML = "";
  }
  if (_.isEmpty(gender)) {
    gender = "";
    document.getElementById("gender-error").innerHTML =
      "Vui lòng chọn giới tính của bạn bạn!";
  } else if (gender) {
    document.getElementById("gender-error").innerHTML = "";
  }
  //lưu trữ trong danh sách sinh viên
  if (fullname && email && phone && address && gender) {
    //lưu vào trong danh sách
    let students = localStorage.getItem("students")
      ? JSON.parse(localStorage.getItem("students"))
      : [];

    students.push({
      fullname: fullname,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });
    localStorage.setItem("students", JSON.stringify(students));
    this.renderListStudent();
  }
}
// Lưu trữ
function renderListStudent() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  if (students.length === 0) {
    document.getElementById("list-student").style.display = "none";
    return false;
  }
  document.getElementById("list-student").style.display = "block";
  let tableContent = `<tr>
    <td width= "30">#</td>
    <td>Họ và tên</td>
    <td>Email</td>
    <td>Điện thoại</td>
    <td>Giới tính</td>
    <td>Địa chỉ</td>
   
    <td>Hành động</td>
  </tr>`;
  students.forEach((student, index) => {
    let studentId = index;
    let genderLable = parseInt(student.gender) === 1 ? "Nam" : "Nữ";
    index++;
    tableContent += `<tr>
          <td>${index}</td>
          <td>${student.fullname}</td>
          <td>${student.email}</td>
          <td>${student.phone}</td>
          <td>${genderLable}</td>
          <td>${student.address}</td>
          <td>
              <a href="#" onclick='editStudent(${studentId})'>Edit</a> | <a href="#" onclick='deleteStudent(${studentId})'>Delete</a>
          </td>
      </tr>`;
  });

  document.getElementById("grid-view-students").innerHTML = tableContent;
}
function deleteStudent(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  students.splice(id, 1);
  localStorage.setItem("students", JSON.stringify(students));
  // window.location.reload();
  renderListStudent();
}
function editStudent(id) {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  let student = students[id];
  // populate student data into form for editing
  document.getElementById("fullname").value = student.fullname;
  document.getElementById("email").value = student.email;
  document.getElementById("phone").value = student.phone;
  document.getElementById("gender").value = student.gender;
  document.getElementById("address").value = student.address;

  // save the id of the student being edited
  document.getElementById("studentId").value = id;
}

function saveStudent() {
  let students = localStorage.getItem("students")
    ? JSON.parse(localStorage.getItem("students"))
    : [];

  let studentId = document.getElementById("studentId").value;

  if (studentId) {
    // if a studentId is present, update the student
    students[studentId] = {
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value,
    };
  } else {
    // else, add a new student
    students.push({
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value,
    });
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderListStudent();
}
