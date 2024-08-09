import { useState } from 'react';
import './App.css';
import axios from 'axios';

function Create() {
  const [task, settask] = useState('');
  const handleclick = async()=>{
    try{
      const res = await axios.post("http://localhost:3001/add",{task})
      console.log(res.data);
      settask(prev=>[...prev,res.data])
      settask('')
      location.reload()
    }catch(e){
      console.log();
      alert("Oops!! Not Added")
    }
    
  }


  return (
    <div>
      <div className="create_form">
        <input
          type="text"
          placeholder='Write Your Task'
          className='todo'
          value={task} 
          onChange={(e) => settask(e.target.value)}
        />
        <button type="button" onClick={handleclick}>Add</button>
      </div>
    </div>
  );
}

export default Create;
