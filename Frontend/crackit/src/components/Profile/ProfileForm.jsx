import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector";
import Input from "../Inputs/Input";

const ProfileForm = ({ closeModal }) => {
  const { user, updateUser } = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(user.profileImageUrl || null);
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    company: user.company || "",
    education: user.education || "",
    bio: user.bio || "",
    skills: user.skills?.join(", ") || "",
    linkedinUrl: user.linkedinUrl || "",
    githubUrl: user.githubUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      let profileImageUrl = profilePic;
      if (profilePic && profilePic !== user.profileImageUrl) {
        const imgRes = await uploadImage(profilePic);
        profileImageUrl = imgRes.imageUrl || "";
      }

      const updatedData = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        profileImageUrl,
      };

      const res = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, updatedData);
      updateUser(res.data);
      toast.success("Profile updated successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="space-y-4">
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        name="fullName"
      />
      <Input
        label="Company"
        value={formData.company}
        onChange={handleChange}
        name="company"
      />
      <Input
        label="Education"
        value={formData.education}
        onChange={handleChange}
        name="education"
      />
      <Input
        label="Bio"
        value={formData.bio}
        onChange={handleChange}
        name="bio"
      />
      <Input
        label="Skills (comma separated)"
        value={formData.skills}
        onChange={handleChange}
        name="skills"
      />
      <Input
        label="LinkedIn URL"
        value={formData.linkedinUrl}
        onChange={handleChange}
        name="linkedinUrl"
      />
      <Input
        label="GitHub URL"
        value={formData.githubUrl}
        onChange={handleChange}
        name="githubUrl"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-800 cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={closeModal}
          className="px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
