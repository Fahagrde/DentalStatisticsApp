document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = localStorage.getItem("loggedInUser"); // اسم المستخدم المسجل
    const center = document.getElementById("center").value; // اسم المركز المختار

    // جمع القيم من النموذج
    const stats = {
      date: new Date().toISOString().split("T")[0], // تاريخ اليوم
      center: center, // اسم المركز
      enteredBy: username, // اسم الطبيب الذي أدخل الإحصائية
      pulpotomyPermanent: document.getElementById("pulpotomyPermanent").value,
      pulpectomyPermanent: document.getElementById("pulpectomyPermanent").value,
      pulpotomyPrimary: document.getElementById("pulpotomyPrimary").value,
      temporaryFilling: document.getElementById("temporaryFilling").value,
      extractionPermanent: document.getElementById("extractionPermanent").value,
      extractionPrimary: document.getElementById("extractionPrimary").value,
      traumaManagement: document.getElementById("traumaManagement").value,
      medication: document.getElementById("medication").value,
      suturing: document.getElementById("suturing").value,
      sutureRemoval: document.getElementById("sutureRemoval").value,
      refuseTreatment: document.getElementById("refuseTreatment").value,
      nonEmergency: document.getElementById("nonEmergency").value,
      xRay: document.getElementById("xRay").value,
      otherProcedure: document.getElementById("otherProcedure").value,
      referral: document.getElementById("referral").value,
      ptKW: document.getElementById("ptKW").value,
      ptNK: document.getElementById("ptNK").value,
      ptTotal: document.getElementById("ptTotal").value,
    };

    // تخزين الإحصائيات اليومية في localStorage حسب المركز
    const dailyStats = JSON.parse(localStorage.getItem("dailyStats")) || [];
    dailyStats.push(stats);
    localStorage.setItem("dailyStats", JSON.stringify(dailyStats));

    console.log("تم حفظ الإحصائية اليومية بنجاح!", stats);

    // إعادة تعيين النموذج بعد الإرسال
    form.reset();
  });
});
