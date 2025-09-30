import React, { useState } from "react";
import { FaTrash, FaEdit, FaComment, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const CommunityOverview = ({ posts, currentUser, fetchPosts }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [answerInputs, setAnswerInputs] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosInstance.delete(API_PATHS.COMMUNITY.DELETE_POST(postId));
      toast.success("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
  };

  const saveEdit = async (postId) => {
    try {
      await axiosInstance.put(API_PATHS.COMMUNITY.UPDATE_POST(postId), { content: editContent });
      toast.success("Post updated successfully!");
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update post");
    }
  };

  const toggleShowAnswers = (postId) => {
    setShowAnswers((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAnswerChange = (postId, value) => {
    setAnswerInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddAnswer = async (postId) => {
    const ans = answerInputs[postId];
    if (!ans || ans.trim() === "") {
      toast.error("Answer cannot be empty");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.COMMUNITY.ADD_ANSWER(postId), { body: ans });
      toast.success("Answer added!");
      setAnswerInputs((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add answer");
    }
  };

  return (
    <div className="space-y-4">
      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => {
        const isOwner = currentUser && post.userId._id === currentUser._id;

        return (
          <div key={post._id} className="p-4 bg-violet-50 rounded shadow-md">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{post.topic}</h3>

                {editingPostId === post._id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border rounded p-2 mt-2 bg-white"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="px-2 py-1 bg-violet-500 text-white rounded hover:cursor-pointer hover:bg-violet-800"
                        onClick={() => saveEdit(post._id)}
                      >
                        Save
                      </button>
                      <button
                        className="px-2 py-1 bg-gray-400 text-white rounded hover:cursor-pointer hover:bg-gray-600"
                        onClick={() => setEditingPostId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2">{post.content}</p>
                )}

                <p className="text-sm text-gray-500 mt-1">
                  Posted by: {post.userId.fullName || post.userId.name}
                </p>

                <div className="flex gap-2 mt-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-violet-200 text-violet-700 px-2 py-1 rounded-2xl text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 ml-2">
                {isOwner && editingPostId !== post._id && (
                  <>
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-gray-500 ml-2 hover:text-black cursor-pointer"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-300 ml-2 hover:text-red-500 cursor-pointer"
                    >
                      <FaTrash size={18} />
                    </button>
                  </>
                )}

                <button
                  onClick={() => toggleShowAnswers(post._id)}
                  className="text-violet-500 ml-2 hover:text-violet-700 cursor-pointer flex items-center gap-1"
                >
                  <FaComment size={18} />
                  {showAnswers[post._id] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
            </div>

            {/* Answers dropdown */}
            {showAnswers[post._id] && (
              <div className="mt-4 border-t pt-2 space-y-3">
                {post.advices && post.advices.length > 0 ? (
                  post.advices.map((ans) => (
                    <div key={ans._id} className="p-2 rounded bg-white shadow-sm">
                      <p>{ans.body}</p>
                      <p className="text-sm text-gray-500">By: {ans.userId.fullName}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 shadow-sm bg-white"></p>
                )}

                {/* Answer form */}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={answerInputs[post._id] || ""}
                    onChange={(e) => handleAnswerChange(post._id, e.target.value)}
                    placeholder="Write your answer..."
                    className="flex-1 shadow-sm bg-white rounded px-2 py-1"
                  />
                  <button
                    onClick={() => handleAddAnswer(post._id)}
                    className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommunityOverview;
