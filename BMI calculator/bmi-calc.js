(function () {
  var $ = function (id) { return document.getElementById(id); };

  function category(bmi) {
    if (bmi < 18.5) return { name: "Underweight", color: "var(--under)" };
    if (bmi < 25) return { name: "Normal weight", color: "var(--normal)" };
    if (bmi < 30) return { name: "Overweight", color: "var(--over)" };
    return { name: "Obese", color: "var(--obese)" };
  }

  function calculate() {
    var heightM = parseFloat($("height").value) / 100;
    var weightKg = parseFloat($("weight").value);

    if (!isFinite(heightM) || !isFinite(weightKg) || heightM <= 0 || weightKg <= 0) {
      $("error").textContent = "Please enter a valid height and weight.";
      $("result").classList.remove("show");
      return;
    }
    if (heightM < 0.5 || heightM > 2.8 || weightKg > 700) {
      $("error").textContent = "Those values look unrealistic. Please double-check them.";
      $("result").classList.remove("show");
      return;
    }
    $("error").textContent = "";

    var bmi = weightKg / (heightM * heightM);
    var cat = category(bmi);
    $("bmiValue").textContent = bmi.toFixed(1);
    var c = $("category");
    c.textContent = cat.name;
    c.style.background = cat.color;

    var pct = Math.max(0, Math.min(100, (bmi - 10) / 30 * 100));
    $("marker").style.left = pct + "%";

    var lo = 18.5 * heightM * heightM, hi = 24.9 * heightM * heightM;
    $("tip").textContent = "For your height, a weight of " + lo.toFixed(1) + " – " + hi.toFixed(1) +
      " kg falls in the normal BMI range (18.5 – 24.9).";
    $("result").classList.add("show");
  }

  function reset() {
    $("height").value = "";
    $("weight").value = "";
    $("error").textContent = "";
    $("result").classList.remove("show");
  }

  $("calc").addEventListener("click", calculate);
  $("reset").addEventListener("click", reset);
  document.addEventListener("keydown", function (e) { if (e.key === "Enter") calculate(); });
})();