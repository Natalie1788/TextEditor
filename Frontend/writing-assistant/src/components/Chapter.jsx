import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export default function AddChapter() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [improvingIndex, setImprovingIndex] = useState(null); // Track the index of the sentence to improve
  const [textInput, setTextInput] = useState(''); // Local state for chapter content
  const navigate = useNavigate();

  // Handle chapter content change and track when to show the "Improve" button
  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInput(value); // Update local text input state
    setValue('content', value); // Update content in react-hook-form

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

  // Handle text improvement
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
      const newContent = sentences.join(' ');
      setTextInput(newContent); // Update the textarea with improved text
      setValue('content', newContent); // Update the content field in react-hook-form
      setImprovingIndex(null); // Hide the button after improvement
    } else {
      console.error('Error fetching response:', res.statusText);
    }
  };

  // Submit chapter and save to localStorage
  const onSubmit = (data) => {
    const existingChapters = JSON.parse(localStorage.getItem('chapters')) || [];
    const newChapters = [...existingChapters, data];
    localStorage.setItem('chapters', JSON.stringify(newChapters));
    navigate("/");
  };

  return (
    <div>
      <h1>Add new chapter</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Chapter title</label>
          <input {...register('title', { required: true })} />
          {errors.title && <span>Required field</span>}
        </div>

        <div>
          <label>Chapter content</label>
          <textarea
            style={{ width: "800px", height: "300px", marginTop: "20px", padding: "10px" }}
            {...register('content', { required: true })}
            value={textInput} // Bind textarea to local state
            onChange={handleTextInputChange} // Track changes
            placeholder="Write your chapter content here..."
          />
          {errors.content && <span>Required field</span>}
        </div>

        {/* Button to improve the last sentence if it's ready */}
        {improvingIndex !== null && (
          <button type="button" onClick={handleCheck}>
            Improve Last Sentence
          </button>
        )}

        <button type="submit" style={{ marginTop: "20px" }}>Save</button>
        <Link to="/"><button type="button">Back</button></Link>
      </form>
    </div>
  );
}
