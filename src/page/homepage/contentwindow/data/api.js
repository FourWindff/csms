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

    saveRegistration: `${baseUrl}/Registration/saveRegistration`,
    getRegistrationAll: `${baseUrl}/registration/getAllRegistration`,
    updateRegistration: `${baseUrl}/Registration/updateRegistration`,
};
const login = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return fetch(API_ENDPOINTS.login, {
        method: 'POST',
        body: formData
    })
}
const register = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return fetch(API_ENDPOINTS.register, {
        method: 'POST',
        body: formData
    })
}


const getStudent = (value) => {
    return fetch(`${API_ENDPOINTS.getStudent}/${value}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    })
}
const updateStudent = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return fetch(API_ENDPOINTS.updateStudent, {
        method: "PUT",
        body: formData
    });
}
const getRegistration=(studentId)=>{
    return fetch(`${API_ENDPOINTS.getRegistration}/${studentId}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    })
}


const getTeacher = (teacherId) => {
    return fetch(`${API_ENDPOINTS.getTeacher}/${teacherId}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    })
}
const updateTeacher = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return fetch(API_ENDPOINTS.updateTeacher, {
        method: "PUT",
        body: formData
    });
}


const setMatches = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return fetch(API_ENDPOINTS.saveCompetition, {
        method: 'POST',
        body: formData
    })
}
const getMatches = () => {
    return fetch(API_ENDPOINTS.getCompetitionAll, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
};
const deleteMatches = (id) => {
    return fetch(`${API_ENDPOINTS.deleteCompetition}/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    });
}
const updateMatches = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return fetch(`${API_ENDPOINTS.updateCompetition}`, {
        method: 'PUT',
        body: formData
    })
}


const saveRegistration = (registration) => {
    const formData = new FormData();
    Object.entries(registration).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return fetch(API_ENDPOINTS.saveRegistration, {
        method: 'POST',
        body: formData,
    });
}
const getRegistrationAll = (status) => {
    const formData=new FormData();
    formData.append("status",status);
    return fetch(API_ENDPOINTS.getRegistrationAll, {
        method: 'POST',
        body:formData
    });
}
const updateRegistration = (registration) => {
    const formData = new FormData();
    Object.entries(registration).forEach(([key, value]) => {
        formData.append(key, value);
    })
    return fetch(API_ENDPOINTS.updateRegistration, {
        method: 'PUT',
        body: formData,
    });
}

const REQUEST = {
    login: login,
    register: register,

    saveMatches: setMatches,
    getMatches: getMatches,
    deleteMatches: deleteMatches,
    updateMatches: updateMatches,

    getStudent: getStudent,
    updateStudent: updateStudent,
    getRegistration:getRegistration,

    getTeacher: getTeacher,
    updateTeacher: updateTeacher,

    saveRegistration:saveRegistration,
    getRegistrationAll:getRegistrationAll,
    updateRegistration: updateRegistration,
}


const userMock = [
    {userId: "root000", role: "admin", password: 123},
    // 学生用户
    {userId: "s001", role: "student", password: 123},
    {userId: "s002", role: "student", password: 123},
    {userId: "s003", role: "student", password: 123},
    {userId: "s004", role: "student", password: 123},
    {userId: "s005", role: "student", password: 123},
    {userId: "s006", role: "student", password: 123},
    {userId: "s007", role: "student", password: 123},
    {userId: "s008", role: "student", password: 123},
    {userId: "s009", role: "student", password: 123},
    {userId: "s010", role: "student", password: 123},
    // 教师用户
    {userId: "t011", role: "teacher", password: 123},
    {userId: "t012", role: "teacher", password: 123},
    {userId: "t013", role: "teacher", password: 123},
    {userId: "t014", role: "teacher", password: 123},
    {userId: "t015", role: "teacher", password: 123},
    {userId: "t016", role: "teacher", password: 123},
    {userId: "t017", role: "teacher", password: 123},
    {userId: "t018", role: "teacher", password: 123},
    {userId: "t019", role: "teacher", password: 123},
    {userId: "t020", role: "teacher", password: 123},
];
const teacherMock = [
    {
        userId: "t006",
        username: "Teacher1",
        teachAge: "10 years",
        major: "Physics",
        department: "Science",
        profile: "Experienced teacher in Physics",
        phone: "9876543211",
        gender: "male",
        age: 40,
    },
    {
        userId: "t007",
        username: "Teacher2",
        teachAge: "12 years",
        major: "Mathematics",
        department: "Science",
        profile: "Expert in Calculus and Algebra",
        phone: "9876543212",
        gender: "female",
        age: 42,
    },
    {
        userId: "t008",
        username: "Teacher3",
        teachAge: "8 years",
        major: "Computer Science",
        department: "Engineering",
        profile: "Specialist in Software Engineering",
        phone: "9876543213",
        gender: "male",
        age: 35,
    },
    {
        userId: "t009",
        username: "Teacher4",
        teachAge: "15 years",
        major: "Chemistry",
        department: "Science",
        profile: "Experienced Chemistry professor",
        phone: "9876543214",
        gender: "female",
        age: 45,
    },
    {
        userId: "t010",
        username: "Teacher5",
        teachAge: "9 years",
        major: "Biology",
        department: "Science",
        profile: "Expert in Genetics and Molecular Biology",
        phone: "9876543215",
        gender: "male",
        age: 38,
    },
    {
        userId: "t011",
        username: "Teacher6",
        teachAge: "11 years",
        major: "Mathematics",
        department: "Science",
        profile: "Researcher in Applied Mathematics",
        phone: "9876543216",
        gender: "female",
        age: 43,
    },
    {
        userId: "t012",
        username: "Teacher7",
        teachAge: "7 years",
        major: "Physics",
        department: "Engineering",
        profile: "Physics expert in Mechanics",
        phone: "9876543217",
        gender: "male",
        age: 36,
    },
    {
        userId: "t013",
        username: "Teacher8",
        teachAge: "13 years",
        major: "Computer Science",
        department: "Engineering",
        profile: "AI and Machine Learning specialist",
        phone: "9876543218",
        gender: "female",
        age: 44,
    },
    {
        userId: "t014",
        username: "Teacher9",
        teachAge: "10 years",
        major: "Chemistry",
        department: "Science",
        profile: "Organic Chemistry expert",
        phone: "9876543219",
        gender: "male",
        age: 39,
    },
    {
        userId: "t015",
        username: "Teacher10",
        teachAge: "6 years",
        major: "Biology",
        department: "Science",
        profile: "Ecology and Environment Researcher",
        phone: "9876543220",
        gender: "female",
        age: 34,
    },
];
const studentMock = [
    {
        userId: "s001",
        username: "Student1",
        grade: "2021级",
        class: "Class 1",
        major: "Mathematics",
        department: "Science",
        profile: "Profile for Student1",
        identityNumber: "ID001",
        gender: "female",
        age: 18,
        phone: "1234567891",
    },
    {
        userId: "s002",
        username: "Student2",
        grade: "2021级",
        class: "Class 2",
        major: "Physics",
        department: "Engineering",
        profile: "Profile for Student2",
        identityNumber: "ID002",
        gender: "male",
        age: 19,
        phone: "1234567892",
    },
    {
        userId: "s003",
        username: "Student3",
        grade: "2022级",
        class: "Class 3",
        major: "Computer Science",
        department: "Science",
        profile: "Profile for Student3",
        identityNumber: "ID003",
        gender: "female",
        age: 20,
        phone: "1234567893",
    },
    {
        userId: "s004",
        username: "Student4",
        grade: "2022级",
        class: "Class 4",
        major: "Mathematics",
        department: "Engineering",
        profile: "Profile for Student4",
        identityNumber: "ID004",
        gender: "male",
        age: 21,
        phone: "1234567894",
    },
    {
        userId: "s005",
        username: "Student5",
        grade: "2022级",
        class: "Class 5",
        major: "Physics",
        department: "Science",
        profile: "Profile for Student5",
        identityNumber: "ID005",
        gender: "female",
        age: 18,
        phone: "1234567895",
    },
    {
        userId: "s006",
        username: "Student6",
        grade: "2023级",
        class: "Class 6",
        major: "Computer Science",
        department: "Engineering",
        profile: "Profile for Student6",
        identityNumber: "ID006",
        gender: "male",
        age: 19,
        phone: "1234567896",
    },
    {
        userId: "s007",
        username: "Student7",
        grade: "2023级",
        class: "Class 7",
        major: "Mathematics",
        department: "Science",
        profile: "Profile for Student7",
        identityNumber: "ID007",
        gender: "female",
        age: 20,
        phone: "1234567897",
    },
    {
        userId: "s008",
        username: "Student8",
        grade: "2023级",
        class: "Class 8",
        major: "Physics",
        department: "Engineering",
        profile: "Profile for Student8",
        identityNumber: "ID008",
        gender: "male",
        age: 21,
        phone: "1234567898",
    },
    {
        userId: "s009",
        username: "Student9",
        grade: "2024级",
        class: "Class 9",
        major: "Computer Science",
        department: "Science",
        profile: "Profile for Student9",
        identityNumber: "ID009",
        gender: "female",
        age: 18,
        phone: "1234567899",
    },
    {
        userId: "s010",
        username: "Student10",
        grade: "2024级",
        class: "Class 10",
        major: "Mathematics",
        department: "Engineering",
        profile: "Profile for Student10",
        identityNumber: "ID010",
        gender: "male",
        age: 19,
        phone: "1234567810",
    },
];
const matchesMock = [
    {
        matchId: "M001",
        name: "Math Contest",
        type: "math",
        description: "An exciting competition to showcase mathematical skills.",
        place: "Building A",
        registrationStartTime: "2024-11-01T08:00:00",
        registrationEndTime: "2024-11-10T18:00:00",
        competitionStartTime: "2024-12-01T10:00:00",
        competitionEndTime: "2024-12-01T12:00:00",
    },
    {
        matchId: "M002",
        name: "Chemistry Olympiad",
        type: "chemistry",
        description: "A challenge for budding chemists.",
        place: "Building B",
        registrationStartTime: "2024-11-02T09:00:00",
        registrationEndTime: "2024-11-12T18:00:00",
        competitionStartTime: "2024-12-02T13:00:00",
        competitionEndTime: "2024-12-02T15:00:00",
    },
    {
        matchId: "M003",
        name: "Biology Bee",
        type: "biology",
        description: "Explore the world of biology through competition.",
        place: "Building C",
        registrationStartTime: "2024-11-03T10:00:00",
        registrationEndTime: "2024-11-13T18:00:00",
        competitionStartTime: "2024-12-03T09:30:00",
        competitionEndTime: "2024-12-03T11:30:00",
    },
    {
        matchId: "M004",
        name: "Physics Challenge",
        type: "physics",
        description: "Push the boundaries of physics knowledge.",
        place: "Building D",
        registrationStartTime: "2024-11-04T08:30:00",
        registrationEndTime: "2024-11-14T18:00:00",
        competitionStartTime: "2024-12-04T14:00:00",
        competitionEndTime: "2024-12-04T17:00:00",
    },
    {
        matchId: "M005",
        name: "Science Fair",
        type: "science",
        description: "A fair for aspiring scientists to present their work.",
        place: "Building E",
        registrationStartTime: "2024-11-05T10:00:00",
        registrationEndTime: "2024-11-15T18:00:00",
        competitionStartTime: "2024-12-05T08:00:00",
        competitionEndTime: "2024-12-05T12:00:00",
    },
    {
        matchId: "M006",
        name: "Track and Field Championship",
        type: "trackField",
        description: "Showcase your athletic prowess in track and field events.",
        place: "Stadium A",
        registrationStartTime: "2024-11-06T09:00:00",
        registrationEndTime: "2024-11-16T18:00:00",
        competitionStartTime: "2024-12-06T15:00:00",
        competitionEndTime: "2024-12-06T18:00:00",
    },
    {
        matchId: "M007",
        name: "Computer Science Hackathon",
        type: "computer",
        description: "Innovate and build in this 24-hour coding hackathon.",
        place: "Tech Hub",
        registrationStartTime: "2024-11-07T08:30:00",
        registrationEndTime: "2024-11-17T18:00:00",
        competitionStartTime: "2024-12-07T08:00:00",
        competitionEndTime: "2024-12-07T20:00:00",
    },
    {
        matchId: "M008",
        name: "Calligraphy Exhibition",
        type: "calligraphy",
        description: "Show your artistic talent in this calligraphy exhibition.",
        place: "Art Room 1",
        registrationStartTime: "2024-11-08T10:00:00",
        registrationEndTime: "2024-11-18T18:00:00",
        competitionStartTime: "2024-12-08T14:00:00",
        competitionEndTime: "2024-12-08T17:00:00",
    },
    {
        matchId: "M009",
        name: "Poetry Slam",
        type: "poetry",
        description: "Express yourself through words in this poetry slam.",
        place: "Auditorium",
        registrationStartTime: "2024-11-09T08:00:00",
        registrationEndTime: "2024-11-19T18:00:00",
        competitionStartTime: "2024-12-09T18:00:00",
        competitionEndTime: "2024-12-09T20:00:00",
    },
    {
        matchId: "M010",
        name: "Basketball Tournament",
        type: "ball",
        description: "A thrilling basketball tournament for the champions.",
        place: "Sports Complex",
        registrationStartTime: "2024-11-10T09:00:00",
        registrationEndTime: "2024-11-20T18:00:00",
        competitionStartTime: "2024-12-10T16:00:00",
        competitionEndTime: "2024-12-10T19:00:00",
    },
    {
        matchId: "M011",
        name: "Dance Competition",
        type: "dance",
        description: "Show off your moves in this vibrant dance competition.",
        place: "Dance Hall",
        registrationStartTime: "2024-11-11T08:30:00",
        registrationEndTime: "2024-11-21T18:00:00",
        competitionStartTime: "2024-12-11T18:00:00",
        competitionEndTime: "2024-12-11T20:30:00",
    },
];
const registrationMock = [
    {
        id: "R001",
        studentId: "s001",
        matchId: "M001",
        teacherId: "t006",
        status: "PENDING",
    },
    {
        id: "R002",
        studentId: "s002",
        matchId: "M002",
        teacherId: "t007",
        status: "APPROVED",
    },
    {
        id: "R003",
        studentId: "s003",
        matchId: "M003",
        teacherId: "t008",
        status: "REJECTED",
    },
    {
        id: "R004",
        studentId: "s004",
        matchId: "M004",
        teacherId: "t009",
        status: "PENDING",
    },
    {
        id: "R005",
        studentId: "s005",
        matchId: "M005",
        teacherId: "t010",
        status: "APPROVED",
    },
    {
        id: "R006",
        studentId: "s006",
        matchId: "M006",
        teacherId: "t011",
        status: "REJECTED",
    },
    {
        id: "R007",
        studentId: "s007",
        matchId: "M007",
        teacherId: "t012",
        status: "PENDING",
    },
    {
        id: "R008",
        studentId: "s008",
        matchId: "M008",
        teacherId: "t013",
        status: "APPROVED",
    },
    {
        id: "R009",
        studentId: "s009",
        matchId: "M009",
        teacherId: "t014",
        status: "REJECTED",
    },
    {
        id: "R010",
        studentId: "s010",
        matchId: "M010",
        teacherId: "t015",
        status: "PENDING",
    },
    {
        id: "R011",
        studentId: "s001",
        matchId: "M011",
        teacherId: "t006",
        status: "APPROVED",
    },
    {
        id: "R012",
        studentId: "s002",
        matchId: "M002",
        teacherId: "t007",
        status: "PENDING",
    },
    {
        id: "R013",
        studentId: "s003",
        matchId: "M003",
        teacherId: "t008",
        status: "APPROVED",
    },
    {
        id: "R014",
        studentId: "s004",
        matchId: "M004",
        teacherId: "t009",
        status: "REJECTED",
    },
    {
        id: "R015",
        studentId: "s005",
        matchId: "M005",
        teacherId: "t010",
        status: "PENDING",
    },
];
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
    {value: "dance", label: "舞蹈"},
];
const gradeType = [
    {value: "2021", label: "2021级"},
    {value: "2022", label: "2022级"},
    {value: "2023", label: "2023级"},
    {value: "2024", label: "2024级"},
]
const reviewType = [
    {value: "PENDING", label: "审核中"},
    {value: "APPROVED", label: "审核通过"},
    {value: "REJECTED", label: "审核驳回"},
];
const genderType = [
    {value: "female", label: "女"},
    {value: "male", label: "男"}
]


export {
    studentMock,
    teacherMock,
    matchesMock,
    userMock,
    registrationMock,
    matchType,
    reviewType,
    gradeType,
    genderType,
    REQUEST
}
export default API_ENDPOINTS;
