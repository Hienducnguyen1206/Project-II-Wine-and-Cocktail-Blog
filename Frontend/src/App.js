
import './App.scss';
import Navigation from './components/Nav/Navigation';
import {ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from './routes/AppRouters';
import BaseLayout from './layout/baselayout';


function App() {
  return (
    
    <div id="App" >
    <BaseLayout>
      <Router>    
        <div className='app-header'>
          <Navigation/>
        </div>
        <div className="app-container">
          <AppRoutes />
        </div>  
     
      </Router>
      <Footer/>
      </BaseLayout>
     
       
      

       <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick
          pauseOnFocusLoss
          draggable ={false}
          pauseOnHover={false}
          theme="light"
        />
      
    </div>
    
  );
}

export default App;
