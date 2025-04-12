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
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.user.user);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        {user ? (
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/message" element={<Message />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        ) : (
          <Route
            path="*"
            element={
              <div className="p-10 text-xl font-semibold text-center text-blue">
                Loading user...
              </div>
            }
          />
        )}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
