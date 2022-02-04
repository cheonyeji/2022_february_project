import { BrowserRouter, Route } from "react-router-dom";
import Todo from "./routes/Todo";

function Router() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Todo />
      </Route>
    </BrowserRouter>
  );
}
export default Router;
