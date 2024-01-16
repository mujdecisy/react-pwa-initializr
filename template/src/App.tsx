import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import About from './pages/about';
import MuLayout from './components/mulayout';
import MuImportExport from './components/muimportexport';
import { ROUTE_PREFIX } from './utils/constants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${ROUTE_PREFIX}/`} element={<MuLayout />}>
          <Route index element={<Main />} />
          <Route path="importexport" element={<MuImportExport />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
