import * as React from "react";
import Provider from "app/Provider";
import Router from "routes/Router";
import Layout from "layout/Layout";
import "app.css";

function App() {
  return (
    <Provider>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  );
}

export default App;
