import axios from "axios";

// Authorizations Control
export async function apiMe() {
  const response = await axios.get("http://localhost:8080/api/me", {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
  return response;
}

// Login Control
export async function loginAPI(data) {
  const response = await axios.post("http://localhost:8080/login", {
    email: data.email,
    password: data.password,
  });

  if (response.status === 200)
    localStorage.setItem("Token", response.data.token);
  return response;
}

// Logout
export async function LogoutAPI() {
  localStorage.removeItem("Token");
  const response = await axios.post("http://localhost:8080/api/logout", {
    headers: {
      Authorization: "",
    },
  });

  return response;
}

// Get User Informations
export async function getUser(user_id) {
  const response = await axios.get(
    `http://localhost:8080/api/user/${user_id}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

// Gets Members of the Gym
export async function getMembers(gym_id) {
  const response = await axios.get(
    `http://localhost:8080/api/users/members/${gym_id}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}
// Gets PTs of the Gym
export async function getTrainers(gym_id) {
  const response = await axios.get(
    `http://localhost:8080/api/users/pts/${gym_id}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

// Adds member to the Gym
export async function createUser(user) {
  const response = await axios.post(
    "http://localhost:8080/api/user",
    {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phone_number: user.phone_number,
      address: user.address,
      gym_id: user.gym_id,
      gender: user.gender,
      // trainer_id: user.trainer.ID,
      //membership: user.membership.code,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );

  assignPT(user.trainer.ID, response.data.ID);

  return response;
}

// Gets Members of the Gym
export async function assignPT(trainerID, memberID) {
  const response = await axios.post(
    `http://localhost:8080/api/pt/${trainerID}/assign-member`,
    {
      user_id: memberID,
    },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

//Removes member from the Gym
export async function deleteMember(memberID) {
  const response = await axios.delete(
    `http://localhost:8080/api/user/${memberID}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

// Get Daily Attedance
export async function getDailyAttendance(gymId) {
  console.log(gymId);
  const response = await axios.get(
    `http://localhost:8080/api/gym/${gymId}/attendance/day`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

// Get Daily Attedance
export async function getOnlines(gymId) {
  const response = await axios.get(
    `http://localhost:8080/api/gym/${gymId}/online`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

// Get Daily Attedance
export async function contactUs(contact) {
  const response = await axios.post("http://localhost:8080/contact", contact);
  return response;
}

export async function getTrainerOf(memberID) {
  const response = await axios.get(
    `http://localhost:8080/api/member/get-trainer-of/${memberID}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

export async function getExercises() {
  const response = await axios.get("http://localhost:8080/api/exercises", {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
  return response;
}

export async function getExercise(exerciseID) {
  const response = await axios.get(
    `http://localhost:8080/api/exercise/${exerciseID}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

export async function getMemberProgram(memberID) {
  const response = await axios.get(
    `http://localhost:8080/api/member/programs/${memberID}`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

export async function getMemberOfPT(memberID) {
  const response = await axios.get(
    `http://localhost:8080/api/pt/${memberID}/members`,
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
  return response;
}

export async function assignProgram(memberID, program) {
  console.log(program);
  const response = await axios.post(
    `http://localhost:8080/api/member/assign-programs/${memberID}`,
    program
  );
  return response;
}
