import React, { useState } from "react";
import axios from "axios";

const QuestionCard = ({ question, fetchQuestions }) => {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/v1/questions/${question._id}/answer`, { body: answer });
      setAnswer("");
      setShowAnswerForm(false);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="font-bold">{question.topic}</h3>
      <p className="mb-2">{question.content}</p>
      <button
        onClick={() => setShowAnswerForm(!showAnswerForm)}
        className="text-violet-500 hover:underline mb-2"
      >
        {showAnswerForm ? "Cancel" : "Answer"}
      </button>

      {showAnswerForm && (
        <form onSubmit={handleAnswerSubmit} className="mb-2">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-2 rounded mb-2"
            placeholder="Type your advice..."
            required
          />
          <button type="submit" className="bg-violet-500 text-white px-3 py-1 rounded hover:bg-violet-600">
            Submit Answer
          </button>
        </form>
      )}

   
      {question.answers && question.answers.length > 0 && (
        <div className="mt-2 border-t pt-2">
          {question.answers.map((ans) => (
            <div key={ans._id} className="mb-2">
              <p className="font-semibold">{ans.userId.name || "Anonymous"}:</p>
              <p>{ans.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
