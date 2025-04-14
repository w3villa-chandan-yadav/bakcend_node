import React, { useEffect, useState } from 'react';
import socket from '../scoket';

function GameRoom({ user }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [groupStatus, setGroupStatus] = useState('');

  useEffect(() => {
    socket.on('question', (data) => {
      setQuestion(data);
      setFeedback('');
      setGroupStatus('');
      setAnswer('');
    });

    socket.on('answerFeedback', (data) => {
      setFeedback(data.correct ? '✅ Correct' : '❌ Wrong');
    });

    socket.on('groupScore', (data) => {
      setGroupStatus(data.result === 'pass'
        ? `✅ Group Passed! Mean Score: ${data.meanScore}`
        : `❌ Group Eliminated! Mean Score: ${data.meanScore}`);
    });

    return () => {
      socket.off('question');
      socket.off('answerFeedback');
      socket.off('groupScore');
    };
  }, []);

  const handleAnswer = () => {
    if (!answer || !question) return;

    socket.emit('answer', {
      groupId: user.groupId,
      userId: user.userId,
      questionId: question.questionId,
      answer
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Game In Progress</h2>
      {question && (
        <>
          <h3 className="text-lg mb-2">{question.text}</h3>
          <input
            className="border p-2 m-2"
            placeholder="Your Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswer} className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </>
      )}
      <p className="mt-4">{feedback}</p>
      <p className="mt-2 font-bold">{groupStatus}</p>
    </div>
  );
}

export default GameRoom;
