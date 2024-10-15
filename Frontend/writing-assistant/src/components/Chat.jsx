
/*import { useState } from 'react';

export default function ChatComponent() {
  const [textInput, setTextInput] = useState('');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await fetch('http://localhost:5500/improve-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: textInput }), // Используем текст из textarea
    });

    if (res.ok) {
      const data = await res.json();
      setResponse(data);
    } else {
      console.error('Error fetching response:', res.statusText);
      setResponse({ error: 'Failed to get response from the server.' });
    }
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)} // Обновляем состояние при вводе
        placeholder="Write your text here..."
      />
      <button onClick={handleChat}>Improve Text</button>
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}*/

/*import { useState, useEffect } from 'react';

export default function ChatComponent() {
  const [textInput, setTextInput] = useState('');
  const [response, setResponse] = useState('');
  const [showButton, setShowButton] = useState(false);

  // Проверка, есть ли точка в тексте для отображения кнопки
  useEffect(() => {
    setShowButton(textInput.trim().endsWith('.')); // Показывать кнопку, если текст заканчивается на точку
  }, [textInput]);

  const handleChat = async () => {
    const res = await fetch('http://localhost:5500/improve-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: textInput }), // Используем текст из textarea
    });

    if (res.ok) {
      const data = await res.json();
      setResponse(data); // Получаем улучшенный текст
      setTextInput(data); // Обновляем текстовое поле
      setShowButton(false); // Скрываем кнопку после проверки
    } else {
      console.error('Error fetching response:', res.statusText);
      setResponse({ error: 'Failed to get response from the server.' });
    }
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)} // Обновляем состояние при вводе
        placeholder="Напишите свою главу здесь..."
      />
      {showButton && (
        <button onClick={handleChat}>Проверить</button> // Кнопка появляется только при наличии точки
      )}
      <div>
        <h3>Ответ:</h3>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}*/

import { useState } from 'react';

export default function ChatComponent() {
  const [textInput, setTextInput] = useState('');
  const [improvingIndex, setImprovingIndex] = useState(null); // Track the index of the sentence to improve
  const [improvedText, setImprovedText] = useState('');

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value);
    
    // Check if there's a period at the end of the text
    const sentences = value.split(/(?<=[.!?])\s+/);
    const lastSentence = sentences[sentences.length - 1];

    // If there's a period at the end of the last sentence, show the Improve button
    if (lastSentence && lastSentence.trim() !== '' && lastSentence.endsWith('.')) {
      setImprovingIndex(sentences.length - 1); // Set the index to improve
    } else {
      setImprovingIndex(null); // Hide the button if not at the end of a sentence
    }
  };

  const handleCheck = async () => {
    if (improvingIndex === null) return; // Do nothing if there's no sentence to improve

    const sentences = textInput.split(/(?<=[.!?])\s+/);
    const message = sentences[improvingIndex];

    const res = await fetch('http://localhost:5500/improve-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }), // Use only the current sentence
    });

    if (res.ok) {
      const data = await res.json();
      sentences[improvingIndex] = data; // Replace the original sentence with the improved one
      setTextInput(sentences.join(' ')); // Update the textarea with improved text
      setImprovingIndex(null); // Hide the button after improvement
    } else {
      console.error('Error fetching response:', res.statusText);
    }
  };

  return (
    <div>
      <textarea
        rows="10"
        cols="50"
        value={textInput}
        onChange={handleTextInputChange}
        placeholder="Write your text here..."
      />
      {improvingIndex !== null && (
        <button onClick={handleCheck}>Improve</button>
      )}
    </div>
  );
}
