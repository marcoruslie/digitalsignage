/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'Primary':"#006780",
        'OnPrimary':"#ffffff",
        'PrimaryContainer': "#b8eaff",
        'OnPrimaryContainer': "#001f28"
      }
    },
  },
  plugins: [],
}

