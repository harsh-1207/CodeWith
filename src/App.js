import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

function App() {
  return (
      <>
      {/* importing and adding toaster in the main page :*/}
        <div>
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        theme: {
                            primary: '#4aed88',
                        },
                    },
                }}
            >
            </Toaster>
        </div>
        <BrowserRouter>
        {/* Use routes to list the routes names */}

            <Routes>
                {/* Route Props : (path) (Element to be rendered) */}
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/editor/:roomId"
                    element={<EditorPage />}
                ></Route>
            {/*since room id is dynamic so we use :roomId*/}
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
