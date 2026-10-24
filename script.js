// クイズ問題データ（answer は正解の選択肢のインデックス）
const questions = [
  {
    question: "うるう年ではない通常の1年は何日でしょう？",
    choices: ["360日", "364日", "365日", "366日"],
    answer: 2,
  },
  {
    question: "日本で一番高い山はどれでしょう？",
    choices: ["北岳", "富士山", "槍ヶ岳", "阿蘇山"],
    answer: 1,
  },
  {
    question: "1気圧のもとで、水が沸騰する温度は約何℃でしょう？",
    choices: ["50℃", "80℃", "100℃", "120℃"],
    answer: 2,
  },
  {
    question: "太陽が昇ってくる方角はどれでしょう？",
    choices: ["東", "西", "南", "北"],
    answer: 0,
  },
  {
    question: "1時間は何秒でしょう？",
    choices: ["600秒", "1800秒", "3600秒", "6000秒"],
    answer: 2,
  },
  {
    question: "鉛筆などを数えるときの「1ダース」は何本でしょう？",
    choices: ["10本", "12本", "15本", "20本"],
    answer: 1,
  },
  {
    question: "地球のまわりを回っている衛星はどれでしょう？",
    choices: ["火星", "金星", "太陽", "月"],
    answer: 3,
  },
  {
    question: "日本で、1年のうち昼の時間が最も長い日を何と呼ぶでしょう？",
    choices: ["春分", "夏至", "秋分", "冬至"],
    answer: 1,
  },
  {
    question: "日本では、虹は一般的に何色といわれているでしょう？",
    choices: ["5色", "6色", "7色", "8色"],
    answer: 2,
  },
  {
    question: "日本の国旗は何と呼ばれているでしょう？",
    choices: ["星条旗", "三色旗", "ユニオンジャック", "日章旗"],
    answer: 3,
  },
];

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const progressText = document.getElementById("progress");
const questionText = document.getElementById("question");
const choicesArea = document.getElementById("choices");
const feedbackText = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const scoreText = document.getElementById("score");
const messageText = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

let currentIndex = 0;
let score = 0;

// クイズを最初から始める
function startQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  quizScreen.hidden = false;
  showQuestion();
}

// 現在の問題と選択肢を表示する
function showQuestion() {
  const current = questions[currentIndex];

  progressText.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionText.textContent = current.question;
  feedbackText.textContent = "";
  feedbackText.className = "feedback";
  nextButton.hidden = true;
  choicesArea.innerHTML = "";

  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    choicesArea.appendChild(button);
  });
}

// 選択肢が選ばれたときに正誤を判定してフィードバックを表示する
function selectAnswer(selectedIndex) {
  const current = questions[currentIndex];
  const buttons = choicesArea.querySelectorAll(".choice-button");

  // 回答後は選択肢を押せないようにし、正解を緑で示す
  buttons.forEach((button) => {
    button.disabled = true;
  });
  buttons[current.answer].classList.add("correct");

  if (selectedIndex === current.answer) {
    score++;
    feedbackText.textContent = "⭕ 正解！";
    feedbackText.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("wrong");
    feedbackText.textContent = `❌ 不正解… 正解は「${current.choices[current.answer]}」です`;
    feedbackText.classList.add("wrong");
  }

  // 最終問題なら結果を見るボタンにする
  nextButton.textContent = currentIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextButton.hidden = false;
}

// 次の問題へ進む、または結果画面を表示する
function goNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 合計スコアを表示する
function showResult() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;
  scoreText.textContent = `${questions.length}問中${score}問正解`;
  messageText.textContent = getMessage(score / questions.length);
}

// 正解率に応じた応援コメントを返す
function getMessage(rate) {
  if (rate === 1) {
    return "全問正解！すばらしい！一般常識はバッチリです！";
  } else if (rate >= 0.7) {
    return "よくできました！あと少しで全問正解です。この調子でいきましょう！";
  } else if (rate >= 0.4) {
    return "なかなかの成績です！間違えた問題を覚えて、もう一度挑戦してみましょう！";
  } else {
    return "ここからが伸びしろです！くり返し挑戦すれば、きっと正解が増えますよ！";
  }
}

nextButton.addEventListener("click", goNext);
restartButton.addEventListener("click", startQuiz);

startQuiz();
