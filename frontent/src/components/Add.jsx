import React, {useState}  from 'react';
import axios from 'axios';

function Add(){
    const [formData, setFormData] = useState({
        name: '',
        Phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]:value}) 
         
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/add', formData);
            console.log(response);

            alert(response.data.msg);
            
        }catch(err){
            alert("Error in adding data");

}
    }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Enter Name' onChange={handleChange} value={formData.name} />
        <input type="text" name='Phone' placeholder='Enter Number' onChange={handleChange} value={formData.Phone} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}


export default Add;
