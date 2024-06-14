import './Content.css'
import profile from "../src/assets/profile.png"
import notes from "../src/assets/notes.png"
import trash from "../src/assets/trash.png"
import update from "../src/assets/update.png"
import Lottie from 'lottie-react'
import animationHome from "../src/assets/animationHome.json"
import pandaanimation from "../src/assets/pandaanimation.json"
import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { auth , db , provider} from './firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'



function Content(){

    const [Tasks,setTasks] = useState([])
    const [Newtask,setNewtask] = useState('')
    const [Edittask,setEdittask] = useState(null)
    const navigate = useNavigate()
    const [name , setName] = useState()
    const [dp , setDp] =useState()

    useEffect(()=> //updating profile picture and name from user's account
    {
        const displayData = auth.onAuthStateChanged(user =>{
           if (user){
            setName(user.displayName)
            setDp(user.photoURL)
           }
           else{
            navigate("/")
           }
        } )
        return()=> displayData()
    },[navigate]
    )
    // CRUD Functions
    const taskref = collection(db,'taskscollection')
    useEffect(()=> {
        const gettasks = async()=>{
           const data =await getDocs(taskref)
           const filterddata = data.docs.map(doc =>({...doc.data(),id:doc.id}))
           setTasks(filterddata)
        }
        gettasks()
    },[]);

    const Inputchange = (e)=>{
        setNewtask(e.target.value)
    }
    
    const Onsubmit = async()=>{ 
        setNewtask('')
        if (Edittask) {
            const updateref = doc(db,'taskscollection',Edittask.id)
            await updateDoc(updateref,{text:Newtask})
            setEdittask(null)
        }
        else{
            await addDoc(taskref,{text: Newtask,completed:false})
        }
    }

    const deletetask = async(task) =>{
        const docref = doc(db,'taskscollection',task.id)
        await deleteDoc(docref)
    }

    const updatetask= async(task) =>{
        setNewtask(task.text)
        setEdittask(task)
    }

    const complete = async(task)=>{
        const radioref = doc(db,'taskscollection',task.id)
        await updateDoc(radioref,{completed:true})
    }

    return(

        <div className="homePage">
            <div className='interior'>
                {/* left content starts here */}
                <div className="leftContent">                  
                    <div className='profpicbox'>
                        <img src={dp} alt= '' className='profile'/>
                        <div className='username'>
                            <>Hi {name}</>
                        </div>
                    </div>
                    <div className='animationHome'>
                        <Lottie animationData={animationHome} loop={true}/>
                    </div>
                    <div className='appnamehome'>
                        <div className='pandaLottiehome'>
                            <Lottie animationData={pandaanimation} loop={true}/>
                        </div>
                        <div className='pandastodohome'>                                        
                        <h2 >Panda's To-Do</h2>
                        </div>
                    </div>                            
                </div>
                {/* right content starts here */}
                <div className='rightContent'>
                    <div className='mytasknotesdiv'>                    
                        <div className='myTask'>
                            <h1>My Tasks</h1>
                        </div>
                        <div className='notesdiv'>
                            <img src={notes} alt="" className='notes'/>
                        </div>
                    </div>                   
                    <div className='listsBox'>
                        <div className='inputcontentdiv'> 
                            <div className='inputcontent'>
                                <input type="text" placeholder='Add a Task' value={Newtask} onChange={Inputchange}/>
                            </div>
                            <div className='addbutton'>
                                <button onClick={Onsubmit}> + </button>
                            </div>
                        </div>                    
                        <div className='listoftasks'>
                            <div className='taskcontent'>
                                <ul className='alltasks'>  
                                {
                                Tasks.map(task =>
                                <li key={task.id}>
                                <div className='createdTasksdiv'>

                                    <div className='createdTasks'>

                                        <input type="radio" name="" id="" onClick={()=> complete(task)} checked = {task.completed} />
                                        <span className={`${task.completed? 'completed' : "notcompleted"}`}>{task.text}</span>
                                    
                                    </div>
                                    <div className='updatebuttondiv'>
                                        <button className='updatebutton' onClick={()=> updatetask(task)}>                                                   
                                            <img src={update} alt="" className='updatebuttonimg'/>
                                        </button>
                                    </div>
                                    <div className='deletebuttondiv'>
                                        <button className='deletebutton' onClick={()=> deletetask(task)}>
                                            <img src={trash} alt="" className='deletebuttonimg'/>
                                        </button>
                                    </div>
                                </div>
                                </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Content
