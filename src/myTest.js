
import {useEffect, useState} from 'react';

export default function MyTest() {

    const [data, setData] = useState([
        {name: 'leng leng', age: 22},
        {name: 'eii', age: 20}
    ]);
    
  const [inputs, setInputs] = useState([
    {
        name: null, 
        age: null
    },
  ]);

  const handleInputs = (e)=>{

   return setInputs({...inputs, [e.target.name]: e.target.value})
  }
  
  const handleAddMore = async()=>{

     data.push({
        name: inputs.name,
        age: inputs.age
     })
  }

  useEffect(()=>{
    console.log(inputs)
    
  }, [inputs, data]);

  return (
    <div className="App">
    <div>
        <p>Add more</p>
        <input value={inputs.name} onChange={handleInputs} name="name"/><br />
        <input value={inputs.age} onChange={handleInputs} name="age"/><br />
        <button onClick={handleAddMore}>add more</button>
    </div><hr />
    {data.map((input, index)=>(
        <form key={index}>
            <input value={inputs.name == null?input.name : inputs.name} onChange={handleInputs} name="name"/><br />
            <input value={inputs.age == null?input.age : inputs.age} onChange={handleInputs} name="age"/><br />
            <button >Submit</button>
        </form>
        ))
    }
    </div>
  );
}