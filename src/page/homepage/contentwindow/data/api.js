import {Toast} from "@douyinfe/semi-ui";

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

    saveWork:`${baseUrl}/work/upload`,
    updateWork:`${baseUrl}/work/update`,
    getWorkByUserId:`${baseUrl}/work/team`,
    getWorkAll:`${baseUrl}/work/all`,
    getFile:`${baseUrl}/work/file`,
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
const POST_REQUEST_WITH_JSON = (url, value, onSuccess, onError) => {
    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
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
    POST_REQUEST_WITH_JSON: POST_REQUEST_WITH_JSON,
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
    {value: "REJECTED", label: "审核驳回"},
    {value: "NOT_SUBMIT", label: "未提交"},
];
const registrationDTOType = [
    {value: "studentName", label: "学生姓名"},
    {value: "studentPhone", label: "学生电话"},
    {value: "teacherName", label: "教师姓名"},
    {value: "teacherPhone", label: "教师电话"},
    {value: "matchName", label: "竞赛名称"}
]
const memberVOLabel = [
    {value: "userId", label: "用户ID"},
    {value: "username", label: "用户名"},
    {value: "phone", label: "电话"},
    {value: "role", label: "角色"}
];

const matchLabel = [
    {value: "id", label: "ID"},
    {value: "type", label: "竞赛类型"},
    {value: "name", label: "竞赛名称"},
    {value: "place", label: "举办地点"},
    {value: "competitionStartTime", label: "竞赛开始时间"},
    {value: "competitionEndTime", label: "竞赛结束时间"},
    {value: "registrationStartTime", label: "报名开始时间"},
    {value: "registrationEndTime", label: "报名结束时间"},
    {value: "description", label: "描述"}
];

const genderType = [
    {value: "female", label: "女"},
    {value: "male", label: "男"}
]

const getStatusColor = (status) => {
    switch (status) {
        case 'PENDING':
            return 'green'; // PENDING 状态使用绿色
        case 'APPROVED':
            return 'blue'; // APPROVED 状态使用蓝色
        case 'REJECTED':
            return 'red'; // REJECTED 状态使用红色
        default:
            return 'gray'; // 默认颜色
    }
};
const parseReviewType = (status) => {
    const type = reviewType.find(item => item.value === status);
    return type.label || '未知状态';
}
const parseMatchLabel = (key) => {
    const item = matchLabel.find(item => item.value === key);
    return item.label;
}
const parseMemberVOLabel = (key) => {
    const item = memberVOLabel.find(item => item.value === key);
    return item.label ;
}

const getOriginalFileName = (fileNameWithUUID) => {
    // 使用下划线拆分文件名
    const parts = fileNameWithUUID.split('_');

    // 如果拆分结果的长度为2，说明是UUID和文件名
    if (parts.length === 2) {
        return parts[1];
    } else {
        throw new Error('文件名格式不正确');
    }
}

const convertTimeFormat=(timeString)=> {
    // 去掉纳秒部分，JavaScript只支持毫秒级时间
    const dateString = timeString.split('.')[0];

    // 创建 Date 对象
    const date = new Date(dateString);

    // 获取年份、月份、日期、小时、分钟和秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1并格式化
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 格式化并返回最终时间
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export {
    matchType, reviewType, gradeType, genderType, REQUEST, registrationDTOType, matchLabel, memberVOLabel,
}
export {getStatusColor, parseMatchLabel, parseMemberVOLabel, parseReviewType, getFormData,getOriginalFileName,convertTimeFormat}
export default API_ENDPOINTS;
