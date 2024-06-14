
import './Content.css'
import './signin.css'
import Content from './Content.jsx'
import Signin from './signin.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


function App() {
  

  return (
    
    <BrowserRouter>
      <Routes>
        {/* assigning path to each Components */}
        <Route path='/' Component={Signin}></Route>
        <Route path='/home' Component={Content}></Route>
      </Routes>
    
    </BrowserRouter>
    
 
  )
}

export default App
