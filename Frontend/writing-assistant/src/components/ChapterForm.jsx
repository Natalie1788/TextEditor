import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

export default function AddChapter() {
  const { register, handleSubmit, formState: { errors } } = useForm();
 const navigate = useNavigate();

  // Функция для сохранения новой главы в localStorage
  const onSubmit = (data) => {
    const existingChapters = JSON.parse(localStorage.getItem('chapters')) || [];
    const newChapters = [...existingChapters, data];
    localStorage.setItem('chapters', JSON.stringify(newChapters));
  navigate("/")
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
          <textarea style={{width: "800px", height: "300px", marginTop: "20px", padding: "10px"}} 
          {...register('content', { required: true })} />
          {errors.content && <span>Required field</span>}
        </div>
        <button type="submit">Save</button>
        <Link to="/"><button>Back</button></Link>
      </form>
    </div>
  );
}
