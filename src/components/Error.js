import { useQuiz } from "../contexts/QuizProvider";

function Error() {
  const { error } = useQuiz();
  return (
    <p className="error">
      <span>💥</span> {error.message}
    </p>
  );
}

export default Error;
