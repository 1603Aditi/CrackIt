import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExperienceOverview from '../../components/Experience/ExperienceOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/layouts/Modal';
import AddExperienceForm from '../../components/Experience/AddExperienceForm';
import toast from 'react-hot-toast';

const Share = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExperienceModal, setOpenAddExperienceModal] = useState(false);

  const fetchExperienceDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPERIENCE.GET_ALL_EXPERIENCE);
      console.log("Fetch response:", response.data); 
      if (response.data) {
        setExperienceData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.log("Something went wrong", error);
      toast.error("Failed to fetch experiences");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = async (experience) => {
    const { companyName, position, content, eventDate, questions, tags } = experience;

    if (!companyName || !position || !content || !eventDate) {
      toast.error("Company, position, content and eventDate are required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPERIENCE.ADD_EXPERIENCE, {
        companyName,
        position,
        content,
        eventDate,
        questions,
        tags,
        
      });

      toast.success("Experience added successfully!");
      setOpenAddExperienceModal(false);

      fetchExperienceDetails();
    } catch (err) {
      console.error("Error in adding experience:", err);
      toast.error("Failed to add experience");
    }
  };

  const handleDeleteExperience = async (id) => {
     console.log("Deleting experience with id:", id);
  if (!window.confirm("Are you sure you want to delete this experience?")) return;

  try {
    
    const res=await axiosInstance.delete(API_PATHS.EXPERIENCE.DELETE_EXPERIENCE(id));
    console.log("Delete response:", res.data);
    toast.success("Experience deleted successfully!");
    setExperienceData(prev => prev.filter(exp => exp._id !== id));
  } catch (err) {
    console.error("Error deleting experience:", err.response?.data || err.message);
    toast.error("Failed to delete experience");
  }
};


  useEffect(() => {
    fetchExperienceDetails();
  }, []);
  

  return (
  <DashboardLayout activeMenu="Experiences">
    <div className="my-5 mx-auto">
      <ExperienceOverview
        experiences={experienceData}
        onDeleteExperience={handleDeleteExperience}
        onAddExperience={() => setOpenAddExperienceModal(true)}
      />
        <Modal
          isOpen={openAddExperienceModal}
          onClose={() => setOpenAddExperienceModal(false)}
          title="Add Experience"
        >
          <AddExperienceForm onAddExperience={handleAddExperience} />
        </Modal>
      </div> 
    </DashboardLayout>
  );
};
 
export default Share;
