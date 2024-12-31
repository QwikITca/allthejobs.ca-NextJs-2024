'use client';
import React, {use, useEffect, useState} from 'react';
import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import {useSelector} from 'react-redux';
import Spinner from '@/components/Sppiner/Spinner';
import {zodResolver} from '@hookform/resolvers/zod';
import {educationValidationSchema} from '@/schemas/education.schema';
import {
	useGetConsultantQuery,
	useUpdateConsultantMutation,
} from '@/features/consultant/consultant.management.api';

const EducationDetails = () => {
	//get user
	const user = useSelector((state) => state.user);

	//get consultant profile
	const {data: consultantData, isFetching} = useGetConsultantQuery(user.user_id);
	//update education details
	const [updateConsultant, {data, isLoading}] = useUpdateConsultantMutation();
	const [showForm, setShowForm] = useState(false); // State to control form visibility

	const handelProfileData = (data, e) => {
		const payload = {
			id: consultantData.education_details.length + 1,
			degreeName: data.degreeName,
			institutionName: data.institutionName,
			duration: data.duration,
			description: data.description,
		};
		const newData = {
			education_details:
				consultantData.education_details.length > 0
					? [...consultantData.education_details, payload]
					: [payload],
			user_id: consultantData.user_id,
			headline: consultantData.headline,
		};

		updateConsultant({consultantId: consultantData.consultant_id, data: newData});

		e.target.reset(); // Reset the form
	};

	//handle close form
	useEffect(() => {
		if (data?.consultant_id) {
			setShowForm(false);
		}
	}, [data]);

	const handleAddNewEducation = () => {
		// Show the form when button is clicked
		isLoading ? null : setShowForm(true);
	};

	return (
		<div>
			{/* //add new education details */}
			<div className="widget-content">
				{showForm ? (
					<button className="theme-btn btn-style-one mb-4" onClick={() => setShowForm(false)}>
						Cancel
					</button>
				) : (
					<button
						disabled={!consultantData?.consultant_id || isFetching || isLoading}
						className="theme-btn btn-style-one mb-4"
						onClick={handleAddNewEducation}
					>
						Add New Education
					</button>
				)}
				{showForm && ( // Conditionally render the form
					<ATJForm
						// defaultValues={defaultValues}
						resolver={zodResolver(educationValidationSchema)}
						onSubmit={handelProfileData}
					>
						<div className="default-form">
							<div className="row">
								<div className="form-group col-lg-6 col-md-12">
									<label>Degree Name</label>
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="Bachelors in Fine Arts"
										name="degreeName"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Institute Name</label>
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="Modern College"
										name="institutionName"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Duration</label>
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="2012 - 2014"
										name="duration"
									/>
								</div>
								<div className="form-group col-lg-6 col-md-12">
									<label>Description</label>
									<ATJInput
										disabled={isFetching}
										type={'text'}
										label="Tell us about your degree"
										name="description"
									/>
								</div>

								{/* //button */}
								<div className="form-group col-lg-6 col-md-12">
									<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
										{isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
									</button>
								</div>
							</div>
						</div>
					</ATJForm>
				)}
				{/* Display saved education details */}
				<div className={`resume-outer`}>
					{/* <!-- Start Resume BLock --> */}
					{consultantData?.education_details?.map((item, i) => (
						<div className="resume-block" key={i}>
							<div className="inner">
								<span className="name">{item.institutionName.slice(0, 1)}</span>
								<div className="title-box">
									<div className="info-box">
										<h3>{item.degreeName}</h3>
										<span>{item.institutionName}</span>
									</div>
									<div className="edit-box">
										<span className="year">{item.duration}</span>
									</div>
								</div>
								<div className="text">{item.description}</div>
							</div>
						</div>
					))}

					{/* <!-- End Resume BLock --> */}
				</div>
			</div>
		</div>
	);
};

export default EducationDetails;
