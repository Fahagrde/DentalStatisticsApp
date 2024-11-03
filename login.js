// إضافة حساب admin إذا لم يكن موجودًا بالفعل في localStorage
(function initializeAdminAccount() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const adminExists = users.some((user) => user.username === "admin");

  // إذا لم يكن حساب admin موجودًا، نقوم بإنشائه
  if (!adminExists) {
    users.push({ username: "admin", password: "admin123" });
    localStorage.setItem("users", JSON.stringify(users));
    console.log("تم إنشاء حساب admin بنجاح.");
  }
})();

// معالجة تسجيل الدخول
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // جلب المستخدمين من localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق من وجود المستخدم
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // تسجيل الدخول ناجح
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("loggedInUser", username); // تخزين اسم المستخدم
      window.location.href = "index.html";
    } else {
      // عرض رسالة خطأ
      document.getElementById("error-message").style.display = "block";
    }
  });
