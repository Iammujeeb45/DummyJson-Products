import Header from "./Components/Header";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import store from "./Store/Store";
export default function App() {
  return (
    <>
     <Provider store={store}>
     <Header />
     <Body />
     </Provider>
    </>
  );
}
