import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';

const Practice = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.PRACTICE.GET_ALL_QUESTIONS); // assume tumhara route '/api/questions/all'
      console.log("All Questions:", res.data);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <DashboardLayout activeMenu="Practice Qs">
      <div className="my-5 mx-auto">
        <h2 className="text-2xl font-bold mb-4">All Questions</h2>
        {questions.length > 0 ? (
          <ul className="space-y-2">
            {questions.map((q) => (
              <li key={q._id} className="p-3 shadow-md rounded bg-violet-100">
                <p className="font-medium">{q.questionText}</p>
                <p className="text-sm text-gray-500">
                  Company: {q.company?.name.toUpperCase()} 
                </p>
                <p className="text-xs text-gray-400">
                  Added by: {q.userId?.fullName || q.userId?.email}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Practice;
