// src/components/QuizRoom.jsx
import React, { useEffect, useState } from "react";
// import socket from "../utils/socket";
import socket from "../scoket";

const QuizRoom = () => {
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [eliminated, setEliminated] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const groupId = localStorage.getItem("groupId");
    const userId = localStorage.getItem("userId");

    socket.on("question", (data) => {
      if (eliminated) return;

      setQuestion(data);
      setAnswer("");
      setTimeLeft(10);

      const countdown = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });

    socket.on("groupScore", (data) => {
      if (data.result === "fail") {
        setEliminated(true);
        alert("🚫 Your team has been eliminated.");
      }
    });

    return () => {
      socket.off("question");
      socket.off("groupScore");
    };
  }, [eliminated]);

  const submitAnswer = () => {
    if (!question || eliminated || timeLeft === 0 || !answer) return;

    socket.emit("answer", {
      groupId: localStorage.getItem("groupId"),
      userId: localStorage.getItem("userId"),
      questionId: question.questionId,
      answer,
    });

    setAnswer("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {eliminated ? (
        <h2 className="text-red-600 text-xl font-bold">
          You have been eliminated.
        </h2>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">Question</h2>
          <p className="mb-2">{question?.text || "Waiting for next question..."}</p>

          {question && (
            <>
              <div className="text-blue-500 font-semibold mb-2">
                ⏱ Time left: {timeLeft}s
              </div>
              <input
                className="border p-2 w-full mb-2"
                placeholder="Your Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={timeLeft === 0}
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={submitAnswer}
                disabled={timeLeft === 0}
              >
                Submit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuizRoom;
