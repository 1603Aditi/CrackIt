import React, { useContext } from "react";
import { IoMdPaper } from "react-icons/io";
import ExperienceInfoCard from "../Cards/ExperienceInfoCard";
import { UserContext } from "../../context/UserContext";

const ExperienceOverview = ({ experiences, onAddExperience, onDeleteExperience }) => {
  const { user } = useContext(UserContext);

  // Filter only experiences belonging to current user
  const userExperiences = experiences.filter(exp => exp.userId === user._id || exp.userId?._id === user._id);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 ">Your Experiences</h2>
        <button
          onClick={onAddExperience}
          className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded shadow hover:cursor-pointer"
        >
          + Add Experience
        </button>
      </div>

      {userExperiences.length === 0 ? (
        <p className="text-gray-500">No experiences found. Add one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userExperiences.map((exp) => (
            <ExperienceInfoCard
              key={exp._id}
              title={exp.position}
              company={exp.companyId?.name || "Unknown"}
              content={exp.content}
              date={new Date(exp.eventDate).toLocaleDateString()}
              questions={exp.questions}
              tags={exp.tags}
              icon={<IoMdPaper />}
              onDelete={() => onDeleteExperience(exp._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceOverview;
