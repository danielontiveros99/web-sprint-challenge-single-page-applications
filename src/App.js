import React from "react";
import Navigation from "./Components/Navigation";
import {Switch, Route} from 'react-router-dom'
import PizzaForm from "./Components/PizzaForm";
import Home from "./Components/Home";


const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/pizza-form" render={() => <PizzaForm />} />
        <Route path="/" render={() => <Home />} />
      </Switch>
    </>
  );
};
export default App;
