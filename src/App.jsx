
import { useState } from 'react'
import './App.css'
import { URL } from './constans';
import Answer from './components/Answer';

function App() {

  const [question , setQuestion] = useState('');
  const [result , setResult] = useState(undefined)

  const payload = {

    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]

  }

  const askQuestion = async ()=>{

    let respons = await fetch(URL,{
      method:"POST",
       body:JSON.stringify(payload)
       
    })

    respons = await respons.json() ;

    let dataString = respons.candidates[0].content.parts[0].text;
     dataString = dataString.split("* ")
     dataString = dataString.map((item)=>item.trim()) 

    
    console.log(dataString);
    setResult(dataString)
    
    
  }

  return (
    <>

    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">

      </div>
      <div className="col-span-4">
        <div className="container h-140 overflow-x-hidden ">

          <div className='text-white p-5 m-5'>

            {/* {result} */}
            <ul>
            {
             result && result.map((item, index)=>(
              <li className='text-left p-1 ml-9'>  <Answer answer = {item} key={index}  /> </li> 
             ))
            }
            </ul>

            
            </div>
          

        </div>
        <div className="bg-zinc-800 w-1/2 text-white m-auto rounded-2xl" style={{height:'60px', border:'1px solid grey', display:'flex', borderRadius:'35px', justifyContent:'center' , alignItems:'center' }}>
          <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)} className='w-full h-full outline-none p-4' placeholder='Ask me Anything' />
          <button className='p-2 mr-8 w-' style={{cursor:'pointer'}} onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
