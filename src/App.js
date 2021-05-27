import './App.css';
import {Route} from 'react-router-dom';
import TwostepForm from './components/TwostepForm';


function App() {
  return (
    <div>
      <Route path='/' component={TwostepForm} />
    </div>
  );
}

export default App;
