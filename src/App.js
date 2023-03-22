import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import MainRouter from "./MainRouter";
import {
  //onAuthStateChangedListener,
  //createUserDocumentFromAuth,
  //getCurrentUser
} from "./utils/firebase/firebase.utils";
//import { setCurrentUser } from "./store/user/user.action";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /*const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      dispatch(setCurrentUser(user));
    })

    return unsubscribe*/
    dispatch(checkUserSession());
  }, [dispatch])

  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
