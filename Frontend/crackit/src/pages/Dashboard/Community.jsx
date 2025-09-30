import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import CommunityOverview from "../../components/Community/CommunityOverview";
import PostQuestionModal from "../../components/Community/PostQuestionModal";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const { user } = useContext(UserContext); 

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.COMMUNITY.GET_ALL_POSTS);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <DashboardLayout activeMenu="Community">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Community</h2>
          <button
            className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
            onClick={() => setOpenPostModal(true)}
          >
            Post a Question
          </button>
        </div>

        {loading ? <p>Loading...</p> : <CommunityOverview posts={posts} currentUser={user} fetchPosts={fetchPosts} />}

        {openPostModal && (
          <PostQuestionModal
            onClose={() => setOpenPostModal(false)}
            fetchQuestions={fetchPosts}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Community;
