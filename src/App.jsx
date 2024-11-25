import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import {
  Home,
  EditQuestion,
  Exam,
  Results,
  Result,
  Correction,
  Sounds
} from "./pages/index.js"
export default function App() {
  return (
    <Router basename="/a">
      <Routes>
        <Route index element={<Home />} />
        <Route path={"/exam/:id"} element={<Exam />} />
        <Route path={"/exam/:id/correction"} element={ <Correction />} />
        <Route path={"/question/:id/edit"} element={<EditQuestion />} />
        <Route path={"/results/:id/"} element={<Results />} />
        <Route path={"/results/:examid/:userid"} element={<Result />} />
        <Route path={"/sounds"} element={<Sounds />} />
      </Routes>
    </Router>
  )
}
