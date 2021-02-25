
import React, { useContext, useEffect, useRef } from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import useSetState from "../../../utils/useSetState";
import { UserContext } from "../../UserContext/UserContext";
import validate_session from "../../../utils/validate_session";
import styles from "./DashboardLayout.module.css";
import does_user_exist from "../../../utils/does_user_exist";
import Feedback from "../../../components/Feedback/Feedback";

const DashboardLayout = ({ children, location }) => {

  const [state, setState] = useSetState({
    feedback: {
      isActive: false,
      message: '',
      goto_route_prompt: ''
    },
    sidebarOpen: false,
  });

  const { userGlobalState, setUserGlobalState } = useContext(UserContext);

  useEffect(() => {

    if (!does_user_exist({ user_wrap_obj: userGlobalState })) {

      validate_session().then((sessions_obj) => {

        if (sessions_obj.error) {
          setState({
            feedback: {
              isActive: true,
              message: 'You have no active session, please login',
              goto_route_prompt: '/login'
            }
          })
        }

        else {

          if(!does_user_exist({ user_wrap_obj: sessions_obj })) {
            setState({
              feedback: {
                isActive: true,
                message: 'You have no active session, please login',
                goto_route_prompt: '/login'
              }
            })
          }
    
          else if(!is_allowed_dashboard({ user_wrap_obj: sessions_obj })) {
            setState({
              feedback: {
                isActive: true,
                message: 'Please, finish your onboarding',
                goto_route_prompt: '/onboarding'
              }
            })
          }

          setUserGlobalState({...sessions_obj});
          
        }
      })
    }

    else if (!is_allowed_dashboard({ user_wrap_obj: userGlobalState })) {
      setState({
        feedback: {
          isActive: true,
          message: 'Please, finish your onboarding',
          goto_route_prompt: '/onboarding'
        }
      })
    }

  }, []);

  const wrapper = useRef(null);

  const toggleSidebar = () => {
    const { sidebarOpen } = state;
    setState({ sidebarOpen: !sidebarOpen });
  };

  return (
    <div>
      {userGlobalState && !state.feedback.isActive ? (
        <div>
          <div className={styles["contentWrapper"]} ref={wrapper}>
            <DashboardSideBar
              location={location}
              sidebarOpen={state.sidebarOpen}
              toggleSidebar={toggleSidebar}
            />
            <div className={styles["contentPage"]}>
              <DashboardNavbar toggleSidebar={toggleSidebar} />
              <div className={styles["children"]}>{children}</div>
            </div>
          </div>
        </div>
      ) : null}
      {state.feedback.isActive || state.feedback.isLoading ? 
        <Feedback
          message={state.feedback.message}
          button_url={state.feedback.goto_route_prompt}
          button_text='Redirect'
          isLoading={state.feedback.isLoading}
        /> 
      : null }
    </div>
  );
};

export default DashboardLayout;



const is_allowed_dashboard = ({ user_wrap_obj }) => {

  const user = user_wrap_obj.user;

  if(user.user_type == 'family_owner' && !user.finished_onboarding) {
    return false;
  } 

  else {
    return true;
  }
}