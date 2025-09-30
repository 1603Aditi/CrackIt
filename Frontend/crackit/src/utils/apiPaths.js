export const BASE_URL="https://crackit-p29s.onrender.com";

export const API_PATHS={
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser",
    },
    DASHBOARD:{
        GET_USER_DATA:"/api/v1/dashboard"
    },
    COMMUNITY:{
        GET_ALL_POSTS: "/api/v1/community/get",
        ADD_POST:"/api/v1/community/add",
        ADD_ANSWER: (postId) => `/api/v1/community/${postId}/answer`,
        GET_MY_ADVICE:"/api/v1/community/my-advices",
        UPDATE_POST:(postId)=>`/api/v1/community/${postId}/update`,
        DELETE_POST:(postId)=>`api/v1/community/${postId}/delete`,
    },
    COMPANY:{
        GET_ALL_ADVISE:"/api/v1/company/get",
    },
    EXPERIENCE:{
        ADD_EXPERIENCE:"/api/v1/experiences/add",
        GET_ALL_EXPERIENCE:"/api/v1/experiences/get",
        DELETE_EXPERIENCE:(experience_id)=>`/api/v1/experiences/${experience_id}`,
        UPDATE_EXPERIENCE:(experience_id)=>`/api/v1/experiences/${experience_id}`,
        GET_EXPERIENCE:(experience_id)=>`/api/v1/experiences/${experience_id}`,
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image",
    },
    PRACTICE: {
        GET_ALL_QUESTIONS: "/api/v1/queBank/get",
    },
    USER:{
        UPDATE_PROFILE:"/api/v1/user/update",
    }

};
