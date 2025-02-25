'use client';
import Spinner from '@/components/Sppiner/Spinner';
import {useUpdateTalentMutation} from '@/features/candidate/talent.management.api';
import {setUserRoleBasedData} from '@/features/data/dataSlice';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useReactToPrint} from 'react-to-print';

const MaskedResume = ({aiGeneratedData, setAiData}) => {
	const {userRoleBasedData, loading} = useSelector((state) => state.data);
	const dispatch = useDispatch();
	//update talent resume
	const [updateTalentResume, {data, isLoading}] = useUpdateTalentMutation();
	//saved resume
	const handleSaveResume = () => {
		const resumeData = {
			user_id: userRoleBasedData.user_id,
			talent_id: userRoleBasedData.talent_id,
			unmasked_resume: aiGeneratedData,
			masked_resume: aiGeneratedData,
		};
		const payload = {
			talentId: userRoleBasedData.talent_id,
			data: resumeData,
		};
		updateTalentResume(payload);
	};

	//delete resume
	const handleDeleteResume = () => {
		const resumeData = {
			user_id: userRoleBasedData.user_id,
			talent_id: userRoleBasedData.talent_id,
			unmasked_resume: {},
			masked_resume: {},
		};
		const payload = {
			talentId: userRoleBasedData.talent_id,
			data: resumeData,
		};
		updateTalentResume(payload);
	};

	useEffect(() => {
		if (data?.talent_id) {
			dispatch(setUserRoleBasedData(data));
			setAiData([]);
		}
	}, [data]);
	if (loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<Spinner />
			</div>
		);
	}

	return (
		<>
			{/* <button
				// onClick={handleDownloadPDF}
				disabled={!canPrint}
				className={`mb-4 px-4 py-2 ${
					canPrint ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
				} text-white font-semibold rounded shadow`}
			>
				{canPrint ? 'Download PDF' : 'Loading...'}
			</button> */}

			{userRoleBasedData?.masked_resume?.experience_details ? (
				<button onClick={() => handleDeleteResume()} className="btn btn-style-one mb-5">
					{isLoading ? <Spinner color="white" /> : 'Delete Resume'}
				</button>
			) : (
				<button onClick={() => handleSaveResume()} className="btn btn-style-one mb-5">
					{isLoading ? <Spinner color="white" /> : 'Save Resume'}
				</button>
			)}

			<div className="flex justify-center items-center min-h-screen bg-gray-200">
				<div className="bg-white shadow-md border p-8 w-[210mm] h-[297mm] overflow-hidden">
					{/* Full Name & Contact */}
					<div className="text-center border-b pb-1">
						<h1 className="text-2xl font-bold">{userRoleBasedData?.user?.name || 'No Name'}</h1>
						{/* <div className="flex justify-center items-center text-gray-600">
							{userRoleBasedData?.user?.email && (
								<div className="flex items-center justify-center mx-2">
									<span className="la la-envelope mr-[2px]"></span>
									<span>{userRoleBasedData.user.email}</span>
								</div>
							)}
							{userRoleBasedData?.user?.phone && (
								<div className="flex items-center justify-center mx-2">
									<span className="la la-phone mr-[2px]"></span>
									<span>{userRoleBasedData.user.phone}</span>
								</div>
							)}
							{userRoleBasedData?.city && (
								<div className="flex items-center justify-center mx-2">
									<span className="la la-map-marker mr-[2px]"></span>
									<span>
										{userRoleBasedData.city}, {userRoleBasedData.province},{' '}
										{userRoleBasedData.country}
									</span>
								</div>
							)}
						</div> */}
					</div>

					{/* Professional Summary */}
					<div className="mt-2 border-b pb-1">
						<h2 className="text-2xl font-semibold text-gray-800">Professional Summary</h2>
						<p className="text-gray-700 mt-2 text-justify">
							{aiGeneratedData?.professional_summary || 'N/A'}
						</p>
					</div>

					{/* Experience */}
					<div className="mt-2">
						<h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
						{aiGeneratedData?.experience_details?.length > 0 ? (
							aiGeneratedData.experience_details.map((exp, i) => (
								<div className="mt-2" key={i}>
									<h3 className="text-lg font-medium text-gray-900">{exp.role}</h3>
									<p className="text-sm text-gray-600 italic">
										{exp.companyName} - {exp.duration}
									</p>
									<ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
										<li className="text-justify">{exp.description}</li>
									</ul>
								</div>
							))
						) : (
							<p className="text-gray-600">No work experience added.</p>
						)}
					</div>

					{/* Skills */}
					<div className="mt-2 border-b pb-1">
						<h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
						<div className="flex flex-wrap mt-2">
							{userRoleBasedData?.skills?.length > 0 ? (
								userRoleBasedData.skills.map((skill, i) => (
									<span key={i} className="text-gray-700 uppercase mx-1 font-medium">
										{skill}
										{i !== userRoleBasedData.skills.length - 1 && ' |'}
									</span>
								))
							) : (
								<p className="text-gray-600">No skills listed.</p>
							)}
						</div>
					</div>

					{/* Education */}
					<h2 className="mt-2 text-2xl font-semibold text-gray-800">Education</h2>
					{userRoleBasedData?.education_details?.length > 0 ? (
						userRoleBasedData.education_details.map((edu, i) => (
							<div className="mt-[2px] border-b pb-1" key={i}>
								<div className="flex justify-between">
									<p className="text-gray-700">
										{edu.degreeName}, <i>{edu.institutionName}</i>
									</p>
									<p className="text-gray-600 italic">{edu.duration}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-600">No education details available.</p>
					)}

					{/* Awards */}
					<h2 className="mt-2 text-2xl font-semibold text-gray-800">Awards</h2>
					{userRoleBasedData?.awards?.length > 0 ? (
						userRoleBasedData.awards.map((award, i) => (
							<div className="mt-[2px] border-b pb-1" key={i}>
								<div className="flex justify-between">
									<p className="text-gray-700">
										{award.title}, <i>{award.category}</i>
									</p>
									<p className="text-gray-600 italic">{award.duration}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-600">No awards listed.</p>
					)}

					{/* Languages */}
					<h2 className="mt-2 text-2xl font-semibold text-gray-800">Languages</h2>
					{userRoleBasedData?.language?.length > 0 ? (
						userRoleBasedData.language.map((ln, i) => (
							<div className="mt-[2px] border-b pb-1" key={i}>
								<p className="text-gray-700">✔️ {ln}</p>
							</div>
						))
					) : (
						<p className="text-gray-600">No languages specified.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default MaskedResume;
