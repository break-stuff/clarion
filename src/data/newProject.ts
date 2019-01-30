export interface INewProjectInfo {
	projectName: string;
	projectType: string;
	styleFormat: string;
	pipeline: string;
}

export var questions = [
	{
		type: "input",
		name: "projectName",
		message: "Project Name:",
		validate: value => value.length > 0 || "Project Name is required."
	},
	{
		type: "list",
		name: "projectType",
		message: "What can we get you started with?",
		choices: ["Starter Project", "Styles Only", "Architecture Only"]
	},
	{
		type: "list",
		name: "styleFormat",
		message: "What style format would you like to use?",
		choices: ["SCSS", "SASS", "LESS"]
	},
	{
		type: "list",
		name: "pipeline",
		message: "What bundler or task-runner would you like to use?",
		choices: ["Webpack", "Parcel", "Gulp", "Grunt"]
	}
];


export var newProject = {
	options: {
		projectType: {
			starter: "Starter Project",
			stylesOnly: "Styles Only",
			architectureOnly: "Architecture Only"
		},
		styleFormat: {
			scss: "SCSS",
			sass: "SASS",
			less: "LESS"
		},
		pipeline: {
			webpack: "Webpack",
			parcel: "Parcel",
			gulp: "Gulp",
			grunt: "Grunt"
		}
	},
	questions: [
		{
			type: "input",
			name: "projectName",
			message: "Project Name:",
			validate: value => value.length > 0 || "Project Name is required."
		},
		{
			type: "list",
			name: "projectType",
			message: "What can we get you started with?",
			choices: ["Starter Project", "Styles Only", "Architecture Only"]
		},
		{
			type: "list",
			name: "styleFormat",
			message: "What style format would you like to use?",
			choices: ["SCSS", "SASS", "LESS"]
		},
		{
			type: "list",
			name: "pipeline",
			message: "What bundler or task-runner would you like to use?",
			choices: ["Webpack", "Parcel", "Gulp", "Grunt"]
		}
	]
};