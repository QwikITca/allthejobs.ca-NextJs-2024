const {z} = require('zod');
const selectSchema = z.object({
	label: z.string().min(1, 'Label is required'),
	value: z.string().min(1, 'Value is required'),
});
export const postJobsSchema = z.object({
	application_instruction: z.string().min(1, 'Application instruction is required'),
	benefits: z.array(selectSchema).min(1, 'At least one benefit is required'),
	description: z.string().min(1, 'Description is required'),
	education_requirements: z.string().min(1, 'Education requirements are required'),
	experience_level: z.string().min(1, 'Experience level is required'),
	industries: z.array(z.string()).min(1, 'At least one industry is required'),
	job_type: z.string().min(1, 'Job type is required'),
	language_requirements: z.string().min(1, 'Language requirements are required'),
	location_type: z.string().min(1, 'Location type is required'),
	responsibilities: z.string().min(1, 'Responsibilities are required'),
	salary_range: z.string().min(1, 'Salary range is required'),
	skills_required: z.array(z.string()).min(1, 'At least one skill is required'),
	tags: z.array(z.string()).min(1, 'At least one tag is required'),
	title: z.string().min(1, 'Title is required'),
	vacancy_count: z.string().min(1, 'Vacancy is required'),
});
