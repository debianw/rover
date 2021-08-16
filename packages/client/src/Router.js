import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SlideShowScreen from "./screens/SlideShowScreen";
import DetailScreen from "./screens/DetailScreen";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/:imageIndex">
          <DetailScreen />
        </Route>
        <Route path="/">
          <SlideShowScreen />
        </Route>
      </Switch>
    </Router>
  );
}
