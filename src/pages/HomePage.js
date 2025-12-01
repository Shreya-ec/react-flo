import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "routes";
// pages
import Presentation from "pages/Presentation";
// components
import Topbar from "components/Topbar";
import ChatBot from "./chatBot/ChatBot";
import ChatBotFlowScreen from "chatBOTflow/mainScreen";

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <main className="content">
              <Topbar />
              <Component {...props} />
            </main>
          </>
        );
      }}
    />
  );
};

export default () => (
  <Switch>
    <Route exact path={Routes.Presentation.path} component={Presentation} />

    {/* PAGES */}
    <RouteWithSidebar exact path={Routes.ChatBot.path} component={ChatBot} />
    <RouteWithSidebar
      exact
      path={Routes.ChatFlowScreen.path}
      component={ChatBotFlowScreen}
    />


    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
