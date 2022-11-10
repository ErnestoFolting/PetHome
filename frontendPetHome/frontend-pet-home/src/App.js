import './Styles/App.css';
import { BrowserRouter} from "react-router-dom";
import { MyNavBar } from './NavBar/MyNavBar';
import { AppRouter } from './Components/AppRouter';

export default function App() {
  return (
    <BrowserRouter>
      <MyNavBar />
      <AppRouter/>
    </BrowserRouter>
  );
}
