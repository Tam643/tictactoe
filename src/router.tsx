import {
    createBrowserRouter
} from "react-router-dom";
import WelcomePage from "@/pages/WelcomePage";
import ErrorPage from "@/pages/NotFoundPage";
import FriendPage from "@/pages/FriendPage";
import App from "./features/app/App";

const router = createBrowserRouter([
   {
       path: "/",
       element: <App />,
       children: [
        {
            path: "/",
            element: <WelcomePage />,
        },
        {
            path: "/friend",
            element: <FriendPage />,
        },
        {
            path: "/noobbot",
            element: <FriendPage />,
        },
        {
            path: "*",
            element: <ErrorPage />,
        },
       ]
   }
]);

export default router;