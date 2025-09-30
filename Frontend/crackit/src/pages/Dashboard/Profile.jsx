import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import Modal from "../../components/layouts/Modal";
import ProfileForm from "../../components/Profile/ProfileForm";
import CharAvtar from "../../components/Cards/CharAvtar";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  if (!user) {
    return (
      <DashboardLayout activeMenu="Profile">
        <p className="text-center mt-10">No user data available.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto max-w-xl bg-white rounded-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

        <div className="flex flex-col items-center gap-2 mb-2">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-25 h-25 rounded-full"
            />
          ) : (
            <CharAvtar
              fullName={user.fullName}
              width="w-20"
              height="h-20"
              style="text-2xl"
              
            />
          )}
        </div>

        <div className="space-y-2 text-gray-800">
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Company:</strong> {user.company || "-"}</p>
          <p><strong>Education:</strong> {user.education || "-"}</p>
          <p><strong>Bio:</strong> {user.bio || "-"}</p>
          <p><strong>Skills:</strong> {user.skills?.join(", ") || "-"}</p>
          <p><strong>LinkedIn:</strong> {user.linkedinUrl || "-"}</p>
          <p><strong>GitHub:</strong> {user.githubUrl || "-"}</p>
        </div>

        <button
          className="px-4 py-2 bg-purple-600 text-white rounded mt-6 hover:bg-purple-800 hover:cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          Edit Profile
        </button>

        <Modal
          title="Edit Profile"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ProfileForm closeModal={() => setOpenModal(false)} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
