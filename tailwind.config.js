/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				skyblue: {
					50: '#f3f8fb',
					100: '#e5eef4',
					200: '#d0e2ed',
					300: '#b0cfe0',
					400: '#86b3ce',
					500: '#6e9dc3',
					600: '#5b87b5',
					700: '#5075a5',
					800: '#466187',
					900: '#3c506c',
					950: '#283343'
				},
				millbrook: {
					50: '#f8f8ee',
					100: '#efefd2',
					200: '#e1dda7',
					300: '#cfc675',
					400: '#c0af4f',
					500: '#b19c41',
					600: '#987e36',
					700: '#7a5f2e',
					800: '#674e2c',
					900: '#5d462c',
					950: '#332415'
				}
			}
		}
	},

	plugins: []
};
