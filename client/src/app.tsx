import NavigationComponent from "@components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className={"flex flex-row"}>
        <NavigationComponent />
        <Routes>
          <Route path={"/"} element={<div>afd</div>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
