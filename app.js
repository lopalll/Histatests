
const { useState, useEffect } = React;


const rawQuestions = [
  {
    question: "Клітини лабораторної тварини піддали надмірному рентгенівському опроміненню. Який органоїд клітини візьме участь в утилізації білкових фрагментів у цитоплазмі?",
    answers: ["Лізосоми", "Комплекс Гольджі", "Рибосоми", "Ендоплазматичний ретикулум", "Клітинний центр"]
  },
  {
    question: "У культурі тканин ядерним опроміненням пошкоджено ядерця ядер. Відновлення яких органел у цитоплазмі клітин стає проблематичним?",
    answers: ["Рибосом", "Ендоплазматичної сітки", "Комплексу Гольджі", "Лізосом", "Мікротрубочок"]
  },
  {
    question: "У крові хворого виявлено низький рівень альбумінів та фібриногену. Зниження активності яких органел гепатоцитів, найбільш вірогідно, обумовлює це явище?",
    answers: ["Гранулярна ендоплазматична сітка", "Комплекс Гольджі", "Агранулярна ендоплазматична сітка", "Мітохондрії", "Лізосоми"]
  },
  {
    question: "У студента 18-ти років виявлено збільшення щитоподібної залози. Які органели клітин щитоподібної залози найбільш відповідні за секрецію і виділення гормонів?",
    answers: ["Комплекс Гольджі", "Центросоми", "Лізосоми", "Рибосоми", "Мітохондрії"]
  },
  {
    question: "Для вивчення локалізації біосинтезу білка в клітинах, миші ввели мічені амінокислоти. Біля яких органел буде спостерігатися накопичення мічених амінокислот?",
    answers: ["Рибосом", "Апарату Гольджі", "Клітинного центру", "Лізосом", "Гладкої ЕПС"]
  }
  // ... додаткові запитання (весь масив вставляється сюди)
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function TestApp() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shuffled, setShuffled] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = rawQuestions[step];

  useEffect(() => {
    const shuffledAnswers = shuffleArray(currentQuestion.answers.map((text, i) => ({
      text,
      isCorrect: i === 0
    })));
    setShuffled(shuffledAnswers);
    setSelected(null);
    setShowAnswer(false);
  }, [step]);

  const handleSelect = (answer, index) => {
    if (selected !== null) return;
    setSelected(index);
    setShowAnswer(true);
    if (answer.isCorrect) setScore(score + 1);
  };

  const next = () => {
    if (step + 1 >= rawQuestions.length) {
      setCompleted(true);
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
    setCompleted(false);
  };

  if (completed) {
    return React.createElement('div', null, 
      React.createElement('h2', null, 'Результати тесту'),
      React.createElement('p', null, `Правильних відповідей: ${score} з ${rawQuestions.length}`),
      React.createElement('button', { onClick: restart }, 'Спробувати ще раз')
    );
  }

  return React.createElement('div', null,
    React.createElement('h2', null, `Питання ${step + 1} з ${rawQuestions.length}`),
    React.createElement('p', null, currentQuestion.question),
    ...shuffled.map((answer, index) =>
      React.createElement('button', {
        key: index,
        onClick: () => handleSelect(answer, index),
        style: selected === index ? {
          backgroundColor: answer.isCorrect ? 'lightgreen' : 'salmon'
        } : {}
      }, answer.text)
    ),
    showAnswer && React.createElement('div', null,
      React.createElement('p', null,
        shuffled[selected]?.isCorrect
          ? 'Правильно!'
          : `Неправильно. Правильна відповідь: ${shuffled.find(a => a.isCorrect)?.text}`
      ),
      React.createElement('button', { onClick: next }, 'Далі')
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(TestApp));
