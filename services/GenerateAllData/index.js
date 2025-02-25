import axios from 'axios';
import {GetToken} from '../GenerateToken';
import { getToken } from 'next-auth/jwt';

// fetch jobs,talent,consultants data
export const fetchData = async () => {
	const {token} = await GetToken();
	try {
		const jobsResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/jobs/`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const talentsResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/talents/`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		const consultantsResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/consultants/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return {
			jobs: jobsResponse.data,
			talents: talentsResponse.data,
			consultants: consultantsResponse.data,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

// fetch user information
export const fetchUserInformation = async (email) => {
	const {token} = await GetToken();
	try {
		const userResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/users/${email}`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return userResponse.data;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error;
	}
};

//fetch Talent data
export const fetchTalentData = async (id) => {
	const {token} = await GetToken();
	try {
		const talentResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/talents/user/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return talentResponse.data;
	} catch (error) {
		console.error('Error fetching talent data:', error);
		throw error;
	}
};

//fetch Consultant data
export const fetchConsultantData = async (id) => {
	const {token} = await GetToken();
	try {
		const consultantResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/consultants/user/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return consultantResponse.data;
	} catch (error) {
		console.error('Error fetching consultant data:', error);
		throw error;
	}
};

// fetch Employer data
export const fetchEmployerData = async (id) => {
	const {token} = await GetToken();
	try {
		const employerResponse = await axios.get(
			`https://allthejobsca.pythonanywhere.com/employers/user/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			},
		);
		return employerResponse.data;
	} catch (error) {
		console.error('Error fetching employer data:', error);
		throw error;
	}
};

//fetch all packages
export const fetchPackages = async () => {
	const {token} = await GetToken();
	try {
		const packagesResponse = await axios.get(`https://allthejobsca.pythonanywhere.com/packages/`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return packagesResponse.data;
	} catch (error) {
		console.error('Error fetching packages:', error);
		throw error;
	}
};

// fetch slots
export const fetchAvailableSlots = async (consultant_id,formattedDate,status="all") => {
	const {token} = await GetToken();
	try {
		const availableSlots = await axios.get(`https://allthejobsca.pythonanywhere.com/availability-slots/${consultant_id}/${formattedDate}/?status=${status}`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return availableSlots.data;
	} catch (error) {
		console.error('Error fetching Available Slots:', error);
		throw error;
	}
};

// create slots
export const createAvailableSlots = async (slotsData) => {
	const {token} = await GetToken();
	try {
		const createSlotResponse = await axios.post(`https://allthejobsca.pythonanywhere.com/availability-slots/`,{slots:slotsData}, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		console.log(createSlotResponse);
		return createSlotResponse.data;
	} catch (error) {
		console.error('Error Creating Available Slots:', error);
		throw error;
	}
};
// update slot info 
export const updateAvailableSlots = async (consultant_id,formattedDate,selectedDate,status) => {
	const hours = String(selectedDate.getHours()).padStart(2, '0');
  const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
  const body={
    "consultant_id":consultant_id,
    "time": `${hours}:${minutes}`,
    "status": status
  }
	const {token} = await GetToken();
	try {
		const updateSlotResponse = await axios.patch(`https://allthejobsca.pythonanywhere.com/availability-slots/update/${consultant_id}/${formattedDate}/`,body, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return updateSlotResponse.data;
	} catch (error) {
		console.error('Error Updating Available Slots:', error);
		throw error;
	}
};

export	const talentCVDownloaderByUserId = async (userId) => {
		const {token} = await GetToken();
		try {
			const response = await axios.get(`https://allthejobsca.pythonanywhere.com/talents/downloadCV/${userId}/`, {
				responseType: 'blob',
				headers: {
					Authorization: `Token ${token}`,
				},
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'cv.pdf'); 
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			return { success: true, message: 'Download completed' };
		} catch (error) {
			console.error('Error downloading CV:', error);
			return { success: false, message: 'Download failed', error };
		}
	};


// admin panel 
// fetch all users: todo paginated request

export const fetchAllUsers = async () => {
	const {token} = await GetToken();
	try {
		const users = await axios.get(`https://allthejobsca.pythonanywhere.com/users`, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return users.data;
	} catch (error) {
		console.error('Error fetching User:', error);
		throw error;
	}
};

// update user
export const updateUserByEmail=async(email,updatedUserInfo)=>{
	const {token} = await GetToken();
	try {
		const updateUserResponse = await axios.patch(`https://allthejobsca.pythonanywhere.com/users/${email}/update/`,updatedUserInfo, {
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		return updateUserResponse;
	} catch (error) {
		console.error('Error Updating Available Slots:', error);
		throw error;
	}
}