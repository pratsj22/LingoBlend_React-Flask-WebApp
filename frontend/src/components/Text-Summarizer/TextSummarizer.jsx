import React, { useState } from 'react'
import './TextSummarizer.scss'
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
const TextSummarizer = () => {
    const[data,setData]=useState("")
    const[msg,setMsg]=useState("")
    const[len,setLen]=useState(5)
    const submit=()=>{
        fetch('http://127.0.0.1:5000/api',{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({msg,len})
        })
        .then(update)
        .catch(error=>{
            console.log(error);
            toast.error("PLEASE Enter Proper Text!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose:1500,
              });
        })
    }
    const update=()=>{
        fetch('http://127.0.0.1:5000/api')
        .then(res=>res.json())
        .then(res=> {
            setData(res)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const copyToClipboard=()=>{
        if(data===""){
            toast.error("Nothing to copy",{
                position: toast.POSITION.TOP_CENTER
            })
        }
        else{
            navigator.clipboard.writeText(data);
            toast.success("Copied to Clipboard")
        }
    }
  return (
    <div className='summarizer' style={{backgroundImage:'url(/image.png)'}}>
            <div className='heading'>
            <span>Text Summarizer</span>
            <div>-Reduce your reading time-</div>
            </div>
        <div className="container">
            <div className="left">
                <h1>Input Text</h1>
                <form action="POST">
                    <textarea name="message" id="input" placeholder='Enter your text here.......' cols="50" rows="22" onChange={(e)=>setMsg(e.target.value)}></textarea>
                </form>
                <div className='bottom'>
                <button type='submit' onClick={submit}>Summarize</button>
                <div className='sumlen'>
                <input type="range" min="0" max="100" value={len} id='range'onChange={(e)=> setLen(e.target.value)}/>
                <div >Summary Length</div>
                </div>
                </div>
            </div>
            <div className="right">
                <h1>Summarized Text</h1>
                <textarea readOnly name="summary" id="summary" cols="50" rows="22" value={data}></textarea>
                <button onClick={copyToClipboard}><FaCopy/></button>
            </div>
        </div>
    </div>
  )
}

export default TextSummarizer