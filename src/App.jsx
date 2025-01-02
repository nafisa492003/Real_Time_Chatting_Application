import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import firebaseConfig from "./Component/firebase.config";
import Register from "./Component/Register";
import LogIn from "./Component/LogIn";
import Home from "./Pages/Home";
import RootLayout from "./Component/RootLayout";
import Message from "./Pages/Message";
import Notification from "./Pages/Notification";
import Setting from "./Pages/Setting";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/message" element={<Message />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
