// Lightweight Hebrew/English UI translations. Arithmetic values remain Hebrew internally.
const UI_TRANSLATIONS = {
  en: {
    "משחקי החשבון":"Math Games",
    instructions:"Choose the operations and number of digits, tap Generate, enter your answer, then tap Check.\nShift - generate a new exercise\nEnter - check your answer\nFor one-digit numbers, you can lock the first number.",
    "רצף נוכחי: 0":"Current streak: 0","שיא: 0":"High score: 0",
    "פעולות":"Operations","חיבור":"Addition","חיסור":"Subtraction","כפל":"Multiplication","חילוק":"Division","חזקה":"Power",
    "ספרות":"Digits","מספרים":"Numbers","עד 10":"Up to 10","לאפשר מינוס":"Allow negative results",
    "הגרל":"Generate","תוצאה":"Answer","בדיקה":"Check",
    "תשובה 1":"Answer 1","תשובה 2":"Answer 2","תשובה 3":"Answer 3","תשובה 4":"Answer 4",
    "אמריקאי":"Multiple choice","רגיל":"Normal","מבדק":"Test","סיים מבדק":"End test",
    "מספר שאלות":"Number of questions","נכונות: 0":"Correct: 0",
    "הורד תוצאות":"Download results","נקה מבדק":"Clear test","צור מבחן להדפסה":"Create printable test",
    "הציון שלך: 0/100":"Your score: 0/100",
    chooseOperation:"Choose an operation",
    streak:n=>"Current streak: "+n, highScore:n=>"High score: "+n,
    correctCount:n=>"Correct: "+n, answerSummary:(answer,user)=>answer+" | Your answer: "+user,
    score:s=>"Your score: "+s,
    printableTitle:n=>"Math test ("+n+" questions)", name:"Name:", date:"Date:", print:"Print"
  },
  he: {\n    chooseOperation:"בחר פעולה",\n    streak:n=>"רצף נוכחי: "+n, highScore:n=>"שיא: "+n,\n    correctCount:n=>"נכונות: "+n, answerSummary:(answer,user)=>answer+" | תשובתך: "+user,\n    score:s=>"הציון שלך: "+s\n  }
};
function uiLanguage(){ return document.documentElement.lang === "en" ? "en" : "he"; }
function uiText(key, ...args) {
  const entry = UI_TRANSLATIONS[uiLanguage()][key];
  if (typeof entry === "function") return entry(...args);
  if (entry !== undefined) return entry;
  return key;
}
function toggleLanguage() {
  const next = uiLanguage() === "he" ? "en" : "he";
  document.documentElement.lang = next;
  document.documentElement.dir = next === "en" ? "ltr" : "rtl";
  document.body.dir = next === "en" ? "ltr" : "rtl";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    if (!el.hasAttribute("data-hebrew-html")) el.setAttribute("data-hebrew-html", el.innerHTML);
    const key = el.getAttribute("data-i18n");
    if (next === "he") el.innerHTML = el.getAttribute("data-hebrew-html");
    else if (UI_TRANSLATIONS.en[key] !== undefined) el.textContent = UI_TRANSLATIONS.en[key];
  });
  const toggle = document.getElementById("languageToggle");
  if (toggle) toggle.textContent = next === "en" ? "עברית" : "English";
  document.title = next === "en" ? "Math Games" : "משחקי החשבון";
  const streak = document.getElementById("streak");
  const high = document.getElementById("highScore");
  if (streak) streak.textContent = uiText("streak", (streak.textContent.match(/\\d+/g)||["0"]).pop());
  if (high) high.textContent = uiText("highScore", (high.textContent.match(/\\d+/g)||["0"]).pop());
  const correct = document.getElementById("testCorrect");
  if (correct) correct.textContent = uiText("correctCount", (correct.textContent.match(/\\d+/g)||["0"]).pop());
  const modal = document.getElementById("testModalBody");
  if (modal && modal.textContent) {
    const m = modal.textContent.match(/(\\d+\\/\\d+)/);
    if (m) modal.textContent = uiText("score", m[1]);
  }
  document.querySelectorAll(".test-summary .test-item").forEach(item => {
    if (next === "he") item.textContent = item.dataset.hebrew || item.textContent;
    else if (!item.dataset.hebrew) {
      item.dataset.hebrew = item.textContent;
      item.textContent = item.textContent.replace(" | תשובתך: ", " | Your answer: ");
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("languageToggle");
  if (btn) btn.textContent = "English";
});
