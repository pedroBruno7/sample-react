

import React, { createContext } from "react";
import useSetState from "../../utils/useSetState";


export const UserContext = createContext();

const UserProvider = (props) => {

   const [state, setState] = useSetState(null);

   return (
      <UserContext.Provider
         value={{ userGlobalState: state, setUserGlobalState: setState }}
      >
         {props.children}
      </UserContext.Provider>
   );
};

export default UserProvider;
