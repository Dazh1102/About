// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  // sticky navbar
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// scroll reveal
ScrollReveal({
  //  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

// Thêm sửa xóa
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
  } else if (document.getElementById("famale").checked) {
    gender = document.getElementById("famale").value;
  }

  // họ và tên
  // nếu như không nhập họ và tên vào thì nó sẽ báo lỗi
  if (_.isEmpty(fullname)) {
    document.getElementById("fullname-error").innerHTML =
      "Vui lòng nhập họ và tên";
  } else if (fullname.trim().length <= 2) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "Tên không được nhỏ hơn 2 kí tự";
  } else if (fullname.trim().length > 50) {
    fullname = "";
    document.getElementById("fullname-error").innerHTML =
      "Tên không được lớn hơn 50 kí tự";
  }
  // nếu nhập họ và tên vào r thì nó k báo lỗi nữa
  else {
    document.getElementById("fullname-error").innerHTML = "";
  }
  // địa chỉ email
  if (_.isEmpty(email)) {
    email = "";
    document.getElementById("email-error").innerHTML = "Vui lòng nhập email";
  } else if (!emailIsValid(email)) {
    email = "";
    document.getElementById("email-error").innerHTML =
      "email không đúng định dạng";
  } else {
    document.getElementById("email-error").innerHTML = "";
  }
  // số điện thoại
  if (_.isEmpty(phone)) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "vui lòng nhập số điện thoại";
  } else if (phone.trim().length > 10 || phone.trim().length < 10) {
    phone = "";
    document.getElementById("phone-error").innerHTML =
      "nhập sai số điện thoại ";
  } else {
    document.getElementById("phone-error").innerHTML = "";
  }
  // địa chỉ
  if (_.isEmpty(address)) {
    address = "";
    document.getElementById("address-error").innerHTML =
      "vui lòng nhập địa chỉ ";
  } else {
    document.getElementById("address-error").innerHTML = "";
  }
  // giới tính
  if (_.isEmpty(gender)) {
    gender = "";
    document.getElementById("gender-error").innerHTML =
      "vui lòng chọn giới tính ";
  } else {
    document.getElementById("gender-error").innerHTML = "";
  }

  if (fullname && email && phone && address && gender) {
    let sinhvien = localStorage.getItem("sinhvien")
      ? JSON.parse(localStorage.getItem("sinhvien"))
      : [];

    sinhvien.push({
      fuffname: fullname,
      email: email,
      phone: phone,
      address: address,
      gender: gender,
    });

    localStorage.setItem("sinhvien", JSON.stringify(sinhvien));

    this.renderListsinhvien();
  }
}
function renderListsinhvien() {
  let sinhvien = localStorage.getItem("sinhvien");
  if (sinhvien) {
    sinhvien = JSON.parse(sinhvien);
  } else {
    sinhvien = [];
  }

  if (sinhvien.length === 0) {
    document.getElementById("list_sinhvien").style.display = "none";
    return false;
  }

  document.getElementById("list_sinhvien").style.display = "block";

  let tableContent = `<tr>
               <td width = "10"></td>
               <td>Họ và Tên </td>
               <td>Email</td>
               <td>Điện Thoại</td>
               <td>Địa Chỉ </td>
               <td> giới tính </td>
               <td>Hành Động </td>
           </tr>`;

  sinhvien.forEach((sinhvien, index) => {
    let sinhvienId = index;

    let genderlabel = parseInt(sinhvien.gender) === 1 ? "Nam" : "Nữ";
    index++;
    tableContent += `<tr>
   <td>${index}</td>
   <td>${sinhvien.fuffname}</td>
   <td>${sinhvien.email}</td>
   <td>${sinhvien.phone}</td>
   <td>${sinhvien.address}</td>
   <td>${genderlabel}</td>
   <td>
   <a href='#Requiment' onclick = "editsinhvien(${sinhvienId})">Edit</a> |  <a href ='#Requiment' onclick = "deletesinhvien(${sinhvienId})">Delete</a> 
    </td>

</tr>`;
  });

  document.getElementById("grid-sinhvien").innerHTML = tableContent;
}

function deletesinhvien(id) {
  let sinhvien = localStorage.getItem("sinhvien");
  if (sinhvien) {
    sinhvien = JSON.parse(sinhvien);
  } else {
    sinhvien = [];
  }
  sinhvien.splice(id, 1);
  localStorage.setItem("sinhvien", JSON.stringify(sinhvien));
  renderListsinhvien();
}

function editsinhvien(index) {
  let sinhvien = localStorage.getItem("sinhvien");
  const newName = prompt("Tên mới:", sinhvien.fullname);
  const newemail = prompt("Email mới:", sinhvien.email);
  const newphone = prompt(" phone mới:", sinhvien.phone);
  const newaddress = prompt("địa chỉ mới:", sinhvien.address);
  const newgender = prompt("giới tính mới:", student.gender);
  if (newName && newemail && newphone && newaddress && newgender) {
    sinhvien[index] = {
      name: newName,
      email: newemail,
      phone: newphone,
      address: newaddress,
      gender: newgender,
    };
    sinhvien.splice(id, 1);
    localStorage.setItem("sinhvien", JSON.stringify(sinhvien));
    renderListsinhvien();
  }
}
