<<<<<<< HEAD
var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function (el) {
  el.addEventListener("click", openTabs);
});

function openTabs(el) {
  var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
  var electronic = btn.dataset.electronic; // lấy giá trị trong data-electronic

  tabContent.forEach(function (el) {
    el.classList.remove("active");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active");
  });

  document.querySelector("#" + electronic).classList.add("active");

  btn.classList.add("active");
}
=======
var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");

tabLinks.forEach(function (el) {
  el.addEventListener("click", openTabs);
});

function openTabs(el) {
  var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
  var electronic = btn.dataset.electronic; // lấy giá trị trong data-electronic

  tabContent.forEach(function (el) {
    el.classList.remove("active");
  });

  tabLinks.forEach(function (el) {
    el.classList.remove("active");
  });

  document.querySelector("#" + electronic).classList.add("active");

  btn.classList.add("active");
}
>>>>>>> eeff314f2fa87d18c3303c4829ff7198c548e42e
