# Jobby App 💼

A fully functional job search portal built with **React JS**, implementing features like authentication, job listing with filters, job details view, and responsive design.

![Jobby App](https://assets.ccbp.in/frontend/content/react-js/jobby-app-home-lg-output.png)

## 🔗 Live Demo

👉 [Visit Live App](https://jobshunt.ccbp.tech/)

## 📂 GitHub Repository

👉 [View Source Code](https://github.com/Kalyanpandaga/JOBBYAPP)

---

## 🚀 Features

- 🔐 **User Authentication** (Login with JWT)
- 🏠 **Home Page** with "Find Jobs" button
- 💼 **Jobs Listing Page** with:

  - Filters for Employment Type and Salary Range
  - Search functionality
  - Profile section (with failure handling)
  - Jobs API failure and empty results views

- 📄 **Job Item Details Page**:

  - Job description and company details
  - Required skills
  - Life at company section
  - Similar jobs

- ❌ **Not Found Route** for invalid URLs
- ↻ Loader and Retry for all asynchronous operations
- ✅ Route protection based on authentication
- 📱 Fully responsive across devices

---

## 🖼️ Screenshots

### ✅ Jobs Success View

![Jobs Success](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-success-lg-output-v0.png)

### ❌ Failure View

![Failure View](https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-output-v0.png)

### 📄 Job Details View

![Job Details](https://assets.ccbp.in/frontend/content/react-js/jobby-app-job-details-success-lg-output-v0.png)

---

## 🛠 Tech Stack

- **React JS** (with functional components)
- **React Router v6**
- **JWT Authentication**
- **CSS3**
- **Loader Spinner (react-loader-spinner)**
- **REST APIs** from [CCBP API Services](https://apis.ccbp.in)

---

## 📦 Setup Instructions

1. Clone the repo:

   ```bash
   git clone https://github.com/Kalyanpandaga/JOBBYAPP.git
   cd JOBBYAPP
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. Open in browser:

   ```
   http://localhost:3000/
   ```

---

## 🔑 Login Credentials

Use the following credentials to log in:

```
username: rahul
password: rahul@2021
```

---

## 📌 Important Notes

- Only authenticated users can access `/`, `/jobs`, and `/jobs/:id`.
- Unauthenticated users are redirected to the login route.
- Authenticated users are redirected from `/login` to `/`.
- Protected routes use cookies to manage JWT tokens.
- Responsive design implemented as per screen size breakpoints.

---

## 📧 Contact

If you have any questions or feedback, feel free to reach out via [GitHub](https://github.com/Kalyanpandaga).

---

## ⭐ Acknowledgements

- [CCBP - NxtWave](https://nxtwave.tech/) for API services and design resources
- All job listing and details fetched from \[[https://apis.ccbp.in](https://apis.ccbp.in)]
