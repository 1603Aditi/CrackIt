import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from "moment";

const RecentExperiences = ({ experiences, onSeeMore, userId }) => {
  // Filter experiences for the current logged-in user
  const userExperiences = experiences.filter(exp => exp.userId?._id === userId);

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h5 className='text-xl font-semibold text-gray-800'>Recent Experiences</h5>
        <button 
          className='text-violet-500 flex items-center gap-1 font-medium hover:text-violet-600 transition-colors hover:cursor-pointer'
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-lg "/>
        </button>
      </div>

      <div className='space-y-5'>
        {userExperiences.length > 0 ? (
          userExperiences.slice(0, 5).map((item) => (
            <div 
              key={item._id} 
              className='p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 bg-violet-100'
            >
              <h6 className='font-semibold text-lg text-gray-900 mb-1'>
                {item.position} in <span className='text-gray-800'>
                  {item.companyId?.name.toUpperCase() || "Unknown"}
                </span>
              </h6>

              {item.content && (
                <p className='text-md text-gray-700 mb-2'>{item.content}</p>
              )}

              {item.questions?.length > 0 && (
                <div className='text-sm text-gray-500 mb-1'>
                  <span className='font-medium'>Questions:</span>
                  <ol className='list-decimal list-inside mt-1'>
                    {item.questions.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ol>
                </div>
              )}

              {item.tags?.length > 0 && (
                <p className='text-xs text-gray-500 mb-1'>
                  <span className='font-medium text-violet-700'>Tags:</span> {item.tags.join(", ")}
                </p>
              )}

              <p className='text-xs text-gray-400 mt-2'>
                Interviewed on: {moment(item.eventDate).format("Do MMM YYYY")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent experiences available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentExperiences;
