/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				Primary: "#006780",
				OnPrimary: "#ffffff",
				PrimaryContainer: "#b8eaff",
				OnPrimaryContainer: "#001f28",
				SelectedBg: "#98c1d9",
				SelectedText: "#002f40",
				UnselectedBg: "#e0e0e0",
				UnselectedText: "#5a6f73",
			},
		},
	},
	plugins: [],
}
