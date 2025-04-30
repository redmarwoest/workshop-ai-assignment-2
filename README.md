# Assignment 2 - AI Workshop Solution Submission App

## 📋 Description

For an upcoming workshop on **June 5th**, hosted by our Front-End colleagues, we’ll be guiding a group of **40 industry experts** through a hands-on session on working with AI tools. Participants will be divided into teams of five, each tasked with solving a business case and creating a solution together.

To facilitate the **judging process**, you’ll be building an application that allows each team to upload their solution — which they will have documented on paper. The app should collect these submissions and feed them into a **large language model (LLM)**, which will then generate a script that highlights each team's idea and explains why the winning team was chosen.

A Figma file with the design is already available:  
[Design File on Figma](https://www.figma.com/design/P4OaJ7FpxZuTL1AedeehUs/Untitled?node-id=1-5&m=dev&t=Iie4IddpEgtDLai9-1)

---

## 🛠️ Recommended Tools

- **Cursor** – AI-powered code editor  
- **Next.js** – Fullstack React framework  
- **Vercel** – Deployment platform for frontend and serverless functions  
- **Microsoft 365 CoPilot API** – [API Docs](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/overview-api-plugins)

> 🔧 **Note**: To enable API access, you may need to **disable Zscaler**:
```bash
sudo launchctl unload /Library/LaunchDaemons/com.zscaler.service.plist
sudo launchctl unload /Library/LaunchDaemons/com.zscaler.tunnel.plist
```

## ✅ Functional Requirements

The application should include the following features:

1. **Form-based Data Collection**:
   - Allow each team to upload their solution in a documented format (e.g., text or image).
   - Ensure that all required fields are filled out before submitting the solution.

2. **Input Validation**:
   - Validate that each team’s solution is uploaded correctly (e.g., correct file type or document format).
   - Include clear error messages when validation fails (e.g., missing or incorrect file format).

3. **Integration with Large Language Model (LLM)**:
   - The collected solution files should be sent to a large language model (LLM) for analysis.
   - The LLM will generate a script that summarizes each team's idea and explains why the winning team was chosen.

4. **Script Generation**:
   - After submission, generate a script that highlights each team's idea and explains why the winning team was selected based on the LLM's analysis.
   - Display the generated script to the user or save it for future reference.

5. **Persistent Storage**:
   - Store the submissions temporarily until all responses are collected, enabling a smooth judging process.
   - Consider using a database or in-memory storage to manage the team submissions.

---

## 💡 Tips for Success

Here are some best practices and ideas to help you complete the project:

1. **Automate Figma-to-Code Workflows**:
   - Use tools that can help automate the process of translating Figma designs into code. This can speed up UI development and reduce errors.

2. **Libraries for Faster Development**:
   - Consider using libraries like **React Hook Form** for efficient form handling, **Axios** for API requests, and **Zustand** or **Redux** for state management.
   - Use **Tailwind CSS** or **MUI** for quicker styling and responsiveness.

3. **Asynchronous Handling**:
   - Handle asynchronous operations (e.g., uploading the solution file, sending it to the LLM, retrieving the generated script) properly to ensure a smooth user experience.
   - Consider using **React Query** or **SWL** for data fetching and caching to minimize unnecessary API calls.

4. **User Experience**:
   - Provide feedback to users during the file upload process (e.g., loading indicators, success/failure messages).
   - Make sure the generated script is clearly displayed and easy to understand, with key points highlighted.

---

## 🚀 Getting Started

To get up and running with the project:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/redmarwoest/workshop-ai-assignment-2.git
    ```

2. **Install dependencies**:
    Navigate to the project directory and install the required dependencies:
    ```bash
    cd assignment-2
    npm install
    ```

3. **Set up Environment Variables**:
    - Create a `.env.local` file in the root of the project and add your API keys and necessary configurations for the CoPilot API, LLM, and other integrations.

4. **Run the Development Server**:
    Start the development server with:
    ```bash
    npm run dev
    ```

5. **Connect to the Microsoft 365 CoPilot API**:
    - Set up authentication and integrate the CoPilot API to send team submissions for script generation.
    - Follow the API documentation to connect and handle responses.

6. **Deploy to Vercel**:
    - Deploy the application to Vercel for public access: https://upload-picture-app.vercel.app/ 

---
