import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { FirstStepForm } from './pages/first-step-form';
import { SecondStepForm } from './pages/second-step-form';
import { ThirdStepForm } from './pages/third-step-form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/step2" Component={SecondStepForm} />
        <Route path="/step3" Component={ThirdStepForm} />
        <Route path="/" Component={FirstStepForm} />
      </Routes>
    </Router>
  );
}

export default App;
