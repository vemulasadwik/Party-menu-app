import './index.css'
import {Routes, Route} from 'react-router'
import Home from './components/Home'
import FoodItem from './components/FoodItem'
import FoodItemDetails from './components/FoodItemDetails'
import SavedRecipes from './components/SavedRecipes'
import { foodMenu } from './components/Home'
import LoginForm from './components/LoginForm'
import ProtectedRoute  from './ProtectedRoute'
import NotFound from './NotFound'
const App=()=>{
    return (
      <>
        <Routes>
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="/food-item/:id" element={<ProtectedRoute><FoodItemDetails foodMenu={foodMenu}/></ProtectedRoute>} />
            <Route path="/saved-recipes" element={<ProtectedRoute><SavedRecipes/></ProtectedRoute>} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </>
    )
}
export default App