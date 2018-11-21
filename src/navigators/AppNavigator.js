import { createStackNavigator } from "react-navigation";
import Home from "../screens/Home";
import Result from "../screens/Result";

const AppNavigator = createStackNavigator(
    {
      Home: Home,
      Result: Result
    }
);

export default AppNavigator;
