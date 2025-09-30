import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdPaper, IoMdChatbubbles } from "react-icons/io";
import RecentExperiences from '../../components/Dashboard/RecentExperiences';

const Home = () => {

  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);

  const [recentExperiences, setRecentExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardSummary = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/dashboard/get"); 
      setDashboardData(response.data);
    } catch (err) {
      console.error("Error fetching dashboard summary:", err);
    }
  };

  const fetchRecentExperiences = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPERIENCE.GET_ALL_EXPERIENCE);
      setRecentExperiences(response.data);
    } catch (err) {
      console.error("Error fetching recent experiences:", err);
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      fetchDashboardSummary();
      fetchRecentExperiences();
      setLoading(false);
    }
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <InfoCard
            icon={<IoMdPaper />}
            label="Experiences Shared"
            value={dashboardData?.totalExperiences || 0}
            color="bg-blue-500"
          />

          <InfoCard
            icon={<IoMdChatbubbles />}
            label="Advices Given"
            value={dashboardData?.totalAdvices || 0}
            color="bg-purple-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentExperiences
            experiences={recentExperiences || []}
            onSeeMore={() => navigate("/experiences")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
