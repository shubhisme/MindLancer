const axios = require('axios');

async function filterSpamJobs(jobListings) {
    try {
        const response = await axios.post('http://127.0.0.1:5001/filter_spam', jobListings, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;  // Cleaned job listings
    } catch (error) {
        console.error('Error filtering spam:', error.response?.data || error.message);
        return jobListings;  // Return original data if API fails
    }
}

// Example usage
const jobListings = [
    {
        "title": "Software Engineer",
        "company_profile": "Great place to work",
        "description": "Looking for an engineer...",
        "requirements": "Python, Node.js",
        "benefits": "Great salary"
    },
    {
        "title": "Software Engineer",
        "company_profile": "Amazing company",
        "description": "Looking for an engineer...",
        "requirements": "Python, Node.js",
        "benefits": "Great salary"
    }
];

filterSpamJobs(jobListings).then(cleanedJobs => {
    console.log("Filtered Jobs:", cleanedJobs);
});
