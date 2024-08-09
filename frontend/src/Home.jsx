import { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import './App.css';
import { BsCheckCircleFill, BsCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';

function Home() {
  const [todos, settodos] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        console.log('Response:', res.data);
        settodos(res.data.message.todos); 
      })
      .catch(err => {
        console.error('Error fetching todos:', err);
        setError(err);
      });
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/${id}`)
      .then(res => {
        console.log(res);
        settodos(todos.map(todo => 
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/${id}`)
      .then(res => {
        console.log('Task deleted:', res);
        settodos(todos.filter(todo => id !== todo._id));
      })
      .catch(err => console.log(err));
  }

  const handleTaskAdded = (newTask) => {
    settodos([...todos, newTask]);
  }

  const handleText = (id) => {
    setEditId(id);
    const todo = todos.find(todo => todo._id === id);
    if (todo) {
      setEditText(todo.task);
    }
  }

  const handleTextChange = (e) => {
    setEditText(e.target.value);
  }

  const handleTextSave = (id) => {
    axios.put(`http://localhost:3001/update/${id}`, { task: editText })
      .then(res => {
        console.log('Task updated:', res);
        settodos(todos.map(todo =>
          todo._id === id ? { ...todo, task: editText } : todo
        ));
        setEditId(null);
        setEditText('');
      })
      .catch(err => console.log(err));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='home'>
      <h2>TODO LIST</h2>
      <Create onTaskAdded={handleTaskAdded} />
      <br/>
      {
        todos.length === 0
          ? <div><h2>No Record</h2></div>
          : todos.map(todo => (
              <div 
                key={todo._id} 
                className={`task ${editId === todo._id ? 'editing' : ''}`}
              >
                <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                  {todo.done ? 
                    <BsCheckCircleFill className='icon' />
                    :
                    <BsCircleFill className='icon' />
                  }
                  {editId === todo._id ? (
                    <input 
                      type="text" 
                      value={editText} 
                      onChange={handleTextChange} 
                      onBlur={() => handleTextSave(todo._id)} 
                      autoFocus 
                    />
                  ) : (
                    <p className={todo.done ? "line-th" : ""}>{todo.task}</p>
                  )}
                </div>
                
                <div className='icon'>
                  <span onClick={() => handleText(todo._id)}><BsPencil className='icon'/></span>
                  <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill /></span>
                </div>
              </div> 
            ))
      }
    </div>
  );
}

export default Home;
