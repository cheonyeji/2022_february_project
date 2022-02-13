import { BrowserRouter, Route, Switch } from "react-router-dom";
import { clickedTabState } from "./atoms";
import Diary from "./routes/Diary";
import Home from "./routes/Home";
import ProjectToDo from "./routes/ProjectToDo";
import ToDos from "./routes/ToDos";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/diary">
          <Diary />
        </Route>
        <Route path="/status/:status">
          <ToDos />
        </Route>
        <Route path="/projectId/:projectId">
          <ProjectToDo />
        </Route>
        <Route path="/">{clickedTabState ? <ToDos /> : <Home />}</Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
