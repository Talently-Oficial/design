export const ID_CANDIDATE_SENT: number = 2

export const ID_CANDIDATE_PLACED_ID: number = 3

export const ID_CANDIDATE_HIRE_ID: number = 3

export const ID_CANDIDATE_REJECTED: number = 4

export const ID_CANDIDATE_APPROVED: number = 9

export const ID_CANDIDATE_INITIAL_INTERVIEW: number = 10

export const ID_CANDIDATE_TECH_INTERVIEW: number = 12

export const ID_CANDIDATE_FINAL_STAGE: number = 13

export const ID_CANDIDATE_PRE_PLACED: number = 14

export const COLOR_CANDIDATE_STATUS: { [key: number]: string } = {
	[ID_CANDIDATE_SENT]: '#3c82f6',
	[ID_CANDIDATE_APPROVED]: '#f7d70d',
	[ID_CANDIDATE_INITIAL_INTERVIEW]: '#fe9af8',
	[ID_CANDIDATE_TECH_INTERVIEW]: '#3cccf6',
	[ID_CANDIDATE_FINAL_STAGE]: '#a573e8',
	[ID_CANDIDATE_PRE_PLACED]: '#6bda4d',
	[ID_CANDIDATE_REJECTED]: '#fc5555',
}
