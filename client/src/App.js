import './App.css';
import NewPost from './Pages/NewPost';
import ViewPost from './Pages/ViewPost';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<ViewPost />} />

          <Route path="/add-post" element={<NewPost />} />
        </Routes>
     </Router>
    </div>
    
  );
}

export default App;
