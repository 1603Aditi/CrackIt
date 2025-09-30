import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Advise = () => {
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvices = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.COMMUNITY.GET_MY_ADVICE);
        console.log(res.data); 
        setAdvices(res.data || []);
      } catch (err) {
        console.error("Error fetching advices:", err);
        setAdvices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvices();
  }, []);

  return (
    <DashboardLayout activeMenu="My Advises">
      <div className="my-5 mx-auto max-w-4xl p-4">
        <h2 className="text-2xl font-bold mb-4">My Advices</h2>
        {loading ? (
          <p>Loading...</p>
        ) : advices.length === 0 ? (
          <p className="text-gray-500">You haven't given any advices yet.</p>
        ) : (
          advices.map((ad) => (
            <div key={ad.adviceId || ad._id} className=" rounded-lg p-4 mb-4 shadow-md bg-violet-100">
              <h3 className="font-semibold mb-2">Topic: {ad.topic}</h3>
              <p className="mb-2">{ad.body}</p>
              <p className="text-sm text-gray-500">{new Date(ad.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Advise;
