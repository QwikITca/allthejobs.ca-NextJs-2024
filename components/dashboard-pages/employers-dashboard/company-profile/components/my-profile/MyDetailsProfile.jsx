'use client';

import ATJForm from '@/components/form/ATJForm';
import ATJInput from '@/components/form/ATJInput';
import ATJSelect from '@/components/form/ATJSelect';
import Spinner from '@/components/Sppiner/Spinner';
import {useSelector} from 'react-redux';
import {GetCountries} from 'react-country-state-city';
import {useEffect, useState} from 'react';
import ATJMultiSelect from '@/components/form/ATJMultiSelect';
import {ageOptions, consultantServices, hiringManagerDesignations} from '@/data/formSelectData';
const MyDetailsProfile = () => {
	const user = useSelector((state) => state.user);

	const [countries, setCountries] = useState([]);
	const isLoading = false;
	const isFetching = false;
	// default values
	// const defaultValues = {
	// 	headline: consultantData?.headline,

	// 	education_level: {
	// 		label: consultantData?.education_level,
	// 		value: consultantData?.education_level,
	// 	},
	// 	experience: {label: consultantData?.experience, value: consultantData?.experience},
	// 	services: consultantData?.services.map((service) => ({label: service, value: service})),
	// 	website: consultantData?.website,
	// 	country: consultantData?.country,
	// 	city: consultantData?.city,
	// 	area: consultantData?.area,
	// 	gender: consultantData?.gender,
	// 	dob: consultantData?.dob,
	// 	age: {label: consultantData?.age, value: consultantData?.age},
	// 	hourly_rate: consultantData?.hourly_rate,
	// };

	const handelProfileData = (data) => {
		const age = data.age?.value;
		const designation = data?.designation?.value;
		// const language = data?.language.value;
		const payload = {
			...data,
			age,
			designation,
			user_id: user.user_id,
		};
		console.log(payload);
		// updateConsultant({consultantId: consultantData?.consultant_id, data: payload});
	};

	//get country list
	useEffect(() => {
		const fetchCountries = async () => {
			const countries = await GetCountries();
			setCountries(countries);
		};

		fetchCountries();
	}, []);

	const countryOptions = countries.map((country) => country.name);
	return (
		<div className="widget-content">
			<ATJForm
				// defaultValues={consultantData?.consultant_id ? defaultValues : {}}
				// resolver={zodResolver(userProfileValidation)}
				onSubmit={handelProfileData}
			>
				<div className="default-form">
					<div className="row">
						<div className="form-group col-lg-6 col-md-12">
							<label>Company Name</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="SPS Software"
								name="company_name"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Company Website</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="https://spssoftware.com"
								name="company_website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Designation</label>
							<ATJMultiSelect
								isDisabled={isFetching}
								isMulti={false}
								label="Executive Recruiter"
								name="designation"
								options={hiringManagerDesignations}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Department</label>
							<ATJInput disabled={isFetching} type={'text'} label="HR" name="department" />
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Portfolio</label>
							<ATJInput
								disabled={isFetching}
								type={'text'}
								label="https://dev-rabbani.web.app/"
								name="website"
							/>
						</div>

						<div className="form-group col-lg-6 col-md-12">
							<label>Country</label>

							<ATJSelect
								disabled={isFetching || countries.length === 0}
								options={countryOptions}
								name="country"
								label="Select Your Country"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>City</label>
							<ATJInput disabled={isFetching} type={'text'} label="Saint John" name="city" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Area</label>
							<ATJInput disabled={isFetching} type={'text'} label="26 Near" name="area" />
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Gender</label>
							<ATJSelect
								disabled={isFetching}
								options={['Male', 'Female', 'Other']}
								name="gender"
								label="Select Your Gender"
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Age</label>

							<ATJMultiSelect
								isMulti={false}
								isDisabled={isFetching}
								label="Age"
								name="age"
								options={ageOptions}
							/>
						</div>
						<div className="form-group col-lg-6 col-md-12">
							<label>Date Of Birth</label>
							<ATJInput disabled={isFetching} type={'text'} label="19-06-1990" name="dob" />
						</div>
					</div>
					{/* //button */}
					<div className="form-group col-lg-6 col-md-12">
						<button disabled={isLoading} type="submit" className="theme-btn btn-style-one">
							{isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
						</button>
					</div>
				</div>
			</ATJForm>
		</div>
	);
};

export default MyDetailsProfile;
