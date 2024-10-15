

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function BookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [chapters, setChapters] = useState([]);


  useEffect(() => {
    const savedChapters = JSON.parse(localStorage.getItem('chapters')) || [];
    setChapters(savedChapters);
  }, []);

  const handleDeleteChapter = (indexToDelete) => {
    const updatedChapters = chapters.filter((_, index) => index !== indexToDelete);
    setChapters(updatedChapters);
    localStorage.setItem('chapters', JSON.stringify(updatedChapters)); // Обновляем localStorage
  };

  const onSubmit = (data) => {
    console.log('Book:', data);
  };

  return (
    <div className='bookform-container'>
        <div>
         <h1>New book</h1>
         <p>Here can you create your first book with a new possibilities!</p> 
         <p>You are welcome use our writing assistant to make your text better!</p>
         </div>

        <div>
      <form className='bookform' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register('title', { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>
        <div>
          <label>Annotation</label>
          <textarea {...register('description', { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <label>Genre</label>
          <select {...register('genre', { required: true })}>
            <option value="Adventure">Adventure</option>
            <option value="Drama">Drama</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="History">History</option>
            <option value="Thriller">Thriller</option>
          </select>
          {errors.genre && <span>Choose genre</span>}
        </div>
        <button type="submit">Create a book</button>
      </form>
      </div>

        <div className='chapters-container'>
      <h2>Chapters</h2>
      <ol>
        {chapters.length === 0 ? (
          <p>No chapters</p>
        ) : (
          chapters.map((chapter, index) => (
            <li key={index}>
              {chapter.title}
              {/* Кнопка для удаления главы */}
              <button 
                onClick={() => handleDeleteChapter(index)}
                style={{ marginLeft: '10px'}}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ol>
      <Link to="/chapter">
        <button>Add chapter</button>
        </Link>
        </div>
    </div>
  );
}
