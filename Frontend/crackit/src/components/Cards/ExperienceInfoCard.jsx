// ExperienceInfoCard.jsx
import React from "react";
import { LuTrash2 } from "react-icons/lu";

const ExperienceInfoCard = ({ 
  title, 
  company, 
  content, 
  date, 
  questions = [], 
  tags = [], 
  onDelete 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div>
            <h6 className="font-semibold text-gray-900 text-lg">{title}</h6>
            <span className="text-gray-500 text-xs">{company.toUpperCase()}</span>
          </div>
        </div>

        
      </div>

      {content && <p className="text-gray-700 text-sm mb-1">{content}</p>}

      {questions.length > 0 && (
        <div className="mb-2">
          <span className="font-medium text-gray-800 text-md">Questions:</span>
          <ol className="list-decimal list-inside text-gray-700 text-sm mt-1">
            {questions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ol>
        </div>
      )}

      {tags.length > 0 && (
        <div className=" gap-1 mb-1">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-gray-400 text-xs">{date}</div>
      {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-400  hover:text-white p-1 hover:bg-red-800 rounded-2xl hover:cursor-pointer"
          >
            <LuTrash2 size={16} />
          </button>
        )}
    </div>
  );
};

export default ExperienceInfoCard;
