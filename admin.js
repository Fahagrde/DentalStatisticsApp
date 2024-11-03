// التأكد من أن المستخدم "admin" هو الوحيد الذي يمكنه الوصول إلى هذه الصفحة
if (localStorage.getItem("loggedInUser") !== "admin") {
  alert("يجب أن تكون مدير النظام للوصول إلى هذه الصفحة.");
  window.location.href = "login.html";
}

// وظيفة لإضافة المستخدمين إلى localStorage
function addUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
}

// معالجة إرسال النموذج لإضافة المستخدم الجديد
document
  .getElementById("addUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    addUser(username, password);

    // عرض رسالة نجاح بعد إضافة المستخدم
    document.getElementById("success-message").style.display = "block";
    document.getElementById("addUserForm").reset();
  });

// حدث للنقر على زر "مسح جميع الإحصائيات"
document.getElementById("clearAllStats").addEventListener("click", function () {
  const confirmClear = confirm(
    "هل أنت متأكد أنك تريد مسح جميع الإحصائيات؟ هذا الإجراء لا يمكن التراجع عنه."
  );
  if (confirmClear) {
    // حذف جميع الإحصائيات من localStorage
    localStorage.removeItem("dailyStats");
    console.log("تم مسح جميع الإحصائيات.");
    alert("تم مسح جميع الإحصائيات بنجاح.");

    // تحديث قسم عرض الإحصائيات لإزالة المحتوى
    const monthlyStatsDiv = document.getElementById("monthlyStats");
    monthlyStatsDiv.innerHTML = "<p>لا توجد إحصائيات لعرضها.</p>";
  }
});

// حساب وعرض الإحصائيات الشهرية حسب المركز والطبيب
document
  .getElementById("showMonthlyStats")
  .addEventListener("click", function () {
    const dailyStats = JSON.parse(localStorage.getItem("dailyStats")) || [];
    const monthlyStats = {};

    // تجميع الإحصائيات حسب المركز والشهر
    dailyStats.forEach((stat) => {
      const month = stat.date.slice(0, 7); // الحصول على الشهر والسنة (yyyy-mm)
      const center = stat.center; // المركز
      const enteredBy = stat.enteredBy; // اسم الطبيب

      // إذا لم يكن المركز موجودًا في الإحصائيات الشهرية، نقوم بإنشائه
      if (!monthlyStats[center]) {
        monthlyStats[center] = {};
      }

      // إذا لم يكن الشهر موجودًا للمركز، نقوم بإنشائه
      if (!monthlyStats[center][month]) {
        monthlyStats[center][month] = {
          pulpotomyPermanent: 0,
          pulpectomyPermanent: 0,
          pulpotomyPrimary: 0,
          temporaryFilling: 0,
          extractionPermanent: 0,
          extractionPrimary: 0,
          traumaManagement: 0,
          medication: 0,
          suturing: 0,
          sutureRemoval: 0,
          refuseTreatment: 0,
          nonEmergency: 0,
          xRay: 0,
          otherProcedure: 0,
          referral: 0,
          ptKW: 0,
          ptNK: 0,
          ptTotal: 0,
          doctors: [], // قائمة الأطباء الذين أدخلوا الإحصائيات
        };
      }

      // جمع القيم لكل نوع علاج
      Object.keys(stat).forEach((key) => {
        if (key !== "date" && key !== "center" && key !== "enteredBy") {
          monthlyStats[center][month][key] += parseInt(stat[key], 10);
        }
      });

      // إضافة اسم الطبيب إلى قائمة الأطباء إذا لم يكن موجودًا
      if (!monthlyStats[center][month].doctors.includes(enteredBy)) {
        monthlyStats[center][month].doctors.push(enteredBy);
      }
    });

    // عرض الإحصائيات الشهرية حسب المركز والشهر
    const monthlyStatsDiv = document.getElementById("monthlyStats");
    monthlyStatsDiv.innerHTML = ""; // تفريغ المحتوى القديم

    // إنشاء العناصر الخاصة بكل مركز وشهر
    Object.keys(monthlyStats).forEach((center) => {
      const centerSection = document.createElement("div");
      centerSection.classList.add("center-section");
      centerSection.innerHTML = `<h2>المركز: ${center}</h2>`;

      Object.keys(monthlyStats[center]).forEach((month) => {
        const stats = monthlyStats[center][month];

        const monthSection = document.createElement("div");
        monthSection.classList.add("month-section");
        monthSection.innerHTML = `
          <h3>إحصائيات شهر ${month}</h3>
          <p><strong>الأطباء المشاركون:</strong> ${stats.doctors.join(", ")}</p>
          <ul>
            ${Object.keys(stats)
              .map((key) => {
                if (key !== "doctors") {
                  return `<li><strong>${key}:</strong> ${stats[key]}</li>`;
                }
                return "";
              })
              .join("")}
          </ul>
        `;

        // إضافة إحصائيات الشهر إلى قسم المركز
        centerSection.appendChild(monthSection);
      });

      // إضافة قسم المركز إلى العرض الرئيسي
      monthlyStatsDiv.appendChild(centerSection);
    });
  });
