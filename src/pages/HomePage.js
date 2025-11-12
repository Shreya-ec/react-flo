import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "routes";

// pages
import Presentation from "pages/Presentation";
import Kanban from "pages/Kanban";
import Messages from "pages/Messages";
import SingleMessage from "pages/SingleMessage";
import Transactions from "pages/Transactions";
import Tasks from "pages/Tasks";
import Settings from "pages/Settings";
import Pricing from "pages/examples/Pricing";
import Billing from "pages/examples/Billing";
import Invoice from "pages/examples/Invoice";

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

    <RouteWithSidebar exact path={Routes.Kanban.path} component={Kanban} />
    <RouteWithSidebar exact path={Routes.Messages.path} component={Messages} />
    <RouteWithSidebar
      exact
      path={Routes.SingleMessage.path}
      component={SingleMessage}
    />
    <RouteWithSidebar
      exact
      path={Routes.Transactions.path}
      component={Transactions}
    />
    <RouteWithSidebar exact path={Routes.Tasks.path} component={Tasks} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.Pricing.path} component={Pricing} />
    <RouteWithSidebar exact path={Routes.Billing2.path} component={Billing} />
    <RouteWithSidebar exact path={Routes.Invoice.path} component={Invoice} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
