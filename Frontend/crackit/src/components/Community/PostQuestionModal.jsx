import React, { useState } from "react";
import Input from "../Inputs/Input";
import { LuTrash2 } from "react-icons/lu";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const PostQuestionModal = ({ onClose, fetchQuestions }) => {
  const [questionData, setQuestionData] = useState({
    topic: "",
    content: "",
    tags: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const arr = [...questionData[field]];
    arr[index] = e.target.value;
    setQuestionData({ ...questionData, [field]: arr });
  };

  const addField = (field) => {
    setQuestionData({ ...questionData, [field]: [...questionData[field], ""] });
  };

  const removeField = (field, index) => {
    const arr = [...questionData[field]];
    arr.splice(index, 1);
    setQuestionData({ ...questionData, [field]: arr });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...questionData,
        tags: questionData.tags.filter((t) => t.trim() !== ""),
      };
      await axiosInstance.post(API_PATHS.COMMUNITY.ADD_POST, payload);
      fetchQuestions();
      onClose();
      setQuestionData({ topic: "", content: "", tags: [""] });
    } catch (err) {
      console.error("Error posting question:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-violet-100 bg-opacity-10">
      <div className="bg-white p-6 rounded-lg shadow-[0_4px_20px_rgba(139,92,246,0.5)] max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Post a Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="topic"
            placeholder="Topic"
            value={questionData.topic}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <Input
            name="content"
            placeholder="Content"
            value={questionData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <div>
            <h6 className="mb-2 font-medium">Tags</h6>
            {questionData.tags.map((t, index) => (
              <div key={index} className="flex gap-2 mb-2 items-start">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Tag ${index + 1}`}
                    value={t}
                    onChange={(e) => handleArrayChange(e, index, "tags")}
                  />
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 rounded h-10 mt-4 hover:bg-amber-950 cursor-pointer"
                  onClick={() => removeField("tags", index)}
                  disabled={questionData.tags.length === 1}
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-violet-500 hover:cursor-pointer"
              onClick={() => addField("tags")}
            >
              + Add Tag
            </button>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 border rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 cursor-pointer"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostQuestionModal;
