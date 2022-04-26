import Form from "./pages/Form/Form";
import List from "./pages/List/List";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container">
      <Form />
      <List />
      <ToastContainer />

    </div>
  );
}

export default App;
