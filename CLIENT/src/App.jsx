import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle.js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Layout />,
    children: [
      // public routes
      {
        index: true,
        element: <Public />,
      },
      {
        path: "login",
        element: <Login />,
      },
      // protected routes
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[...Object.values(ROLES)]} />,
            children: [
              {
                element: <Prefetch />,
                children: [
                  {
                    path: "dash",
                    element: <DashLayout />,
                    children: [
                      {
                        index: true,
                        element: <Welcome />,
                      },
                      {
                        path: "notes",
                        children: [
                          {
                            index: true,
                            element: <NotesList />,
                          },
                          {
                            path: ":id",
                            element: <EditNote />,
                          },
                          {
                            path: "new",
                            element: <NewNote />,
                          },
                        ],
                      },
                      {
                        element: (
                          <RequireAuth
                            allowedRoles={[ROLES.Manager, ROLES.Admin]}
                          />
                        ),
                        children: [
                          {
                            path: "users",
                            children: [
                              {
                                index: true,
                                element: <UsersList />,
                              },
                              {
                                path: ":id",
                                element: <EditUser />,
                              },
                              {
                                path: "new",
                                element: <NewUserForm />,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  } /* End Dash path */,
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  useTitle("Dan D. Repairs");

  return <RouterProvider router={router} />;
};

export default App;
