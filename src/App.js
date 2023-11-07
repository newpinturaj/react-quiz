import Header from "./components/Header";
import Main from "./components/Main";
import Starter from "./components/Starter";
import Progress from "./components/Progress";
import Questions from "./components/Questions";
import Footer from "./components/Footer";
import Result from "./components/Result";
import Loader from "./components/Loader";
import OptionList from "./components/OptionList";
import { useQuiz } from "./contexts/QuizProvider";
import Error from "./components/Error";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "questionsLoaded" && <Starter />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <OptionList />
            <Footer />
          </>
        )}
        {status === "finish" && <Result />}
      </Main>
    </div>
  );
}

export default App;
