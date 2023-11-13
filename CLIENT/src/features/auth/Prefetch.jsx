import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice.js";
import { usersApiSlice } from "../users/usersApiSlice.js";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;
