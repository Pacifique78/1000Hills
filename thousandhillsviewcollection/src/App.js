import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./containers/Home";
import Places from "./containers/Places";
import Videos from "./containers/Videos";
import Contact from "./containers/Contact";
import Gallery from "./containers/Gallery";
import { useState } from "react";
import Adminpage from "./containers/Adminpage";

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  return (
    <div className="App">
      <Switch>
        <Route
          path="/places"
          render={(props) => (
            <Places
              isAuthenticated={isAuthenticated}
              setisAuthenticated={setisAuthenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/videos"
          render={(props) => (
            <Videos
              isAuthenticated={isAuthenticated}
              setisAuthenticated={setisAuthenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/contact"
          render={(props) => (
            <Contact
              isAuthenticated={isAuthenticated}
              setisAuthenticated={setisAuthenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/gallery/:name"
          render={(props) => (
            <Gallery
              isAuthenticated={isAuthenticated}
              setisAuthenticated={setisAuthenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/admin"
          render={(props) => (
            <Adminpage
              isAuthenticated={isAuthenticated}
              setisAuthenticated={setisAuthenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <Home
              isAuthenticated={isAuthenticated}
              setisAuthenticated={setisAuthenticated}
              {...props}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
