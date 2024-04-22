import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateCosmetic from './pages/CreateCosmetics';
import ShowCosmetic from './pages/ShowCosmetic';
import EditCosmetic from './pages/EditCosmetic';
import DeleteCosmetic from './pages/DeleteCosmetic';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cosmetics/create' element={<CreateCosmetic />} />
      <Route path='/cosmetics/details/:id' element={<ShowCosmetic />} />
      <Route path='/cosmetics/edit/:id' element={<EditCosmetic />} />
      <Route path='/cosmetics/delete/:id' element={<DeleteCosmetic />} />
        
    </Routes>
  )
}

export default App