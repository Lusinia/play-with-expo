import { createStackNavigator } from "react-navigation";
import Login from "../screens/Login";

const AuthNavigator = createStackNavigator(
  {
    Login: Login
  },
  {
    headerMode: "none",
    initialRouteName: "Login"
  }
);

export default AuthNavigator;
