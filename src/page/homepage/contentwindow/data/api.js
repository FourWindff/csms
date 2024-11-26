import {Notification, Toast} from "@douyinfe/semi-ui";

const baseUrl = 'http://localhost:8080'; // 确保以http或https开头

const API_ENDPOINTS = {
    login: `${baseUrl}/user/login`,
    register: `${baseUrl}/user/register`,

    saveCompetition: `${baseUrl}/Competition/saveCompetition`,
    getCompetitionAll: `${baseUrl}/Competition/getAll`,
    updateCompetition: `${baseUrl}/Competition/updateMatch`,
    deleteCompetition: `${baseUrl}/Competition/deleteMatch`,

    getStudent: `${baseUrl}/user/getStudent`,
    updateStudent: `${baseUrl}/user/updateStudent`,
    getRegistration: `${baseUrl}/registration/student`,

    getTeacher: `${baseUrl}/user/getTeacher`,
    updateTeacher: `${baseUrl}/user/updateTeacher`,

    saveRegistration: `${baseUrl}/registration/saveRegistration`,
    getRegistrationAll: `${baseUrl}/registration/getAllRegistration`,
    updateRegistration: `${baseUrl}/registration/updateRegistration`,
};

const GET_REQUEST = (url, value, onSuccess, onError) => {
    let requestUrl = url;
    if (value) {
        requestUrl = `${url}/${value}`;
    }
    fetch(requestUrl, {
        method: "GET", headers: {'Content-Type': 'application/json'},
    })
        .then(response => {
            if (!response.ok) {
                Toast.error("请求失败");
                return Promise.reject();
            } else {
                return response.json();
            }
        })
        .then(result => {
            if (!result) return;
            const code = result?.code;
            const message = result?.msg;
            const data = result?.data;
            if (code === 1) {
                onSuccess(message, data);
            } else {
                onError(message);
            }
        })
        .catch(error => {
            Toast.error(`错误！${error}`);
        })
}
const POST_REQUEST = (url, value, onSuccess, onError) => {
    fetch(url, {
        method: "POST",
        body: value,
    })
        .then(response => {
            if (!response.ok) {
                Toast.error("请求失败");
                return Promise.reject();
            } else {
                return response.json();
            }
        })
        .then(result => {
            if (!result) return;
            const code = result?.code;
            const message = result?.msg;
            const data = result?.data;
            if (code === 1) {
                onSuccess(message, data);
            } else {
                onError(message);
            }
        })
        .catch(error => {
            Toast.error(`错误！${error}`);
        })
}
const PUT_REQUEST = (url, value, onSuccess, onError) => {
    fetch(url, {
        method: "PUT", body: value,
    })
        .then(response => {
            if (!response.ok) {
                Toast.error("请求失败");
                return Promise.reject();
            } else {
                return response.json();
            }
        })
        .then(result => {
            if (!result) return;
            const code = result?.code;
            const message = result?.msg;
            const data = result?.data;
            if (code === 1) {
                onSuccess(message, data);
            } else {
                onError(message);
            }
        })
        .catch(error => {
            Toast.error(`错误！${error}`);
        })
}
const DELETE_REQUEST = (url, value, onSuccess, onError) => {
    let requestUrl = url;
    if (value) {
        requestUrl = `${url}/${value}`;
    }
    fetch(requestUrl, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
    })
        .then(response => {
            if (!response.ok) {
                Toast.error("请求失败");
                return Promise.reject();
            } else {
                return response.json();
            }
        })
        .then(result => {
            if (!result) return;
            const code = result?.code;
            const message = result?.msg;
            const data = result?.data;
            if (code === 1) {
                onSuccess(message, data);
            } else {
                onError(message);
            }
        })
        .catch(error => {
            Toast.error(`错误！${error}`);
        })
}

const getFormData = (obj) => {
    const formData = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return formData;
}

const REQUEST = {

    GET_REQUEST: GET_REQUEST,
    POST_REQUEST: POST_REQUEST,
    PUT_REQUEST: PUT_REQUEST,
    DELETE_REQUEST: DELETE_REQUEST
}


const matchType = [
    {value: "math", label: "数学"},
    {value: "chemistry", label: "化学"},
    {value: "biology", label: "生物"},
    {value: "physics", label: "物理"},
    {value: "science", label: "科学"},
    {value: "trackField", label: "田径"},
    {value: "computer", label: "计算机"},
    {value: "calligraphy", label: "书法"},
    {value: "poetry", label: "诗歌"},
    {value: "ball", label: "球类"},
    {value: "dance", label: "舞蹈"}
];
const gradeType = [
    {value: "2021", label: "2021级"},
    {value: "2022", label: "2022级"},
    {value: "2023", label: "2023级"},
    {value: "2024", label: "2024级"}
]
const reviewType = [
    {value: "PENDING", label: "审核中"},
    {value: "APPROVED", label: "审核通过"},
    {value: "REJECTED", label: "审核驳回"}
];
const registrationDTOType = [
    {value: "studentName", label: "学生姓名"},
    {value:"studentPhone",label:"学生电话"},
    {value:"teacherName",label:"教师姓名"},
    {value:"teacherPhone",label:"教师电话"},
    {value: "matchName",label: "竞赛名称"}
]
const genderType = [
    {value: "female", label: "女"},
    {value: "male", label: "男"}
]


export {
    matchType, reviewType, gradeType, genderType, REQUEST,registrationDTOType, getFormData
}
export default API_ENDPOINTS;
