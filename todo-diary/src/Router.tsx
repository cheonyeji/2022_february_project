import { BrowserRouter, Route, Switch } from "react-router-dom";
import Diary from "./routes/Diary";
import ToDos from "./routes/ToDos";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/diary">
          <Diary />
        </Route>
        <Route path="/">
          <ToDos />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
