import React, { useState } from "react";
import Input from "../Inputs/Input";
import { LuTrash2 } from "react-icons/lu";

const AddExperienceForm = ({ onAddExperience }) => {
  const [experience, setExperience] = useState({
    companyName: "",
    position: "",
    content: "",
    eventDate: "",
    questions: [""],
    tags: [""],
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const handleArrayChange = (e, index, field) => {
    const arr = [...experience[field]];
    arr[index] = e.target.value;
    setExperience({ ...experience, [field]: arr });
  };

  const addField = (field) => {
    setExperience({ ...experience, [field]: [...experience[field], ""] });
  };

  const removeField = (field, index) => {
    const arr = [...experience[field]];
    arr.splice(index, 1);
    setExperience({ ...experience, [field]: arr });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     const today = new Date();
      const selectedDate = new Date(experience.eventDate);
      
      if (selectedDate > today) {
        alert("Event date cannot be in the future!");
        return;
      }
    const filteredExperience = {
      ...experience,
      questions: experience.questions.filter((q) => q.trim() !== ""),
      tags: experience.tags.filter((t) => t.trim() !== ""),
    };

    onAddExperience(filteredExperience);

    setExperience({
      companyName: "",
      position: "",
      content: "",
      eventDate: "",
      questions: [""],
      tags: [""],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={experience.companyName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <Input
        type="text"
        name="position"
        placeholder="Position"
        value={experience.position}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <Input
        name="content"
        placeholder="Content / Experience Details"
        value={experience.content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <Input
        type="date"
        name="eventDate"
        value={experience.eventDate}
        onChange={handleChange}
        className="w-full p-2 border rounded "
        required
      />


      <div>
        <h6 className="mb-2 font-medium">Questions</h6>
        {experience.questions.map((q, index) => (
          <div key={index} className="flex gap-2 mb-2 items-start">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={q}
                onChange={(e) => handleArrayChange(e, index, "questions")}
              />
            </div>
            <button
              type="button"
              className="bg-red-500 text-white px-2 rounded h-10 mt-5 hover:cursor-pointer hover:bg-amber-950 "
              onClick={() => removeField("questions", index)}
              disabled={experience.questions.length === 1}
            >
            <LuTrash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 hover:cursor-pointer"
          onClick={() => addField("questions")}
        >
          + Add Question
          </button>
        </div>


      <div>
        <h6 className="mb-2 font-medium">Tags</h6>
        {experience.tags.map((t, index) => (
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
              className="bg-red-500 text-white px-2 rounded h-10 mt-5 hover:cursor-pointer hover:bg-amber-950"
              onClick={() => removeField("tags", index)}
              disabled={experience.tags.length === 1}
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 hover:cursor-pointer"
          onClick={() => addField("tags")}
        >
          + Add Tag
        </button>
      </div>


      <button
        type="submit"
        className="bg-violet-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-violet-800"
      >
        Add Experience
      </button>
    </form>
  );
};

export default AddExperienceForm;
