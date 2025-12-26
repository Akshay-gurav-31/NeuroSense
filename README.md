# 🧠 NeuroSense — Clinical Neuro-Recovery Protocol

<div align="center">
  <img src="./public/Images/logo.png" width="180" height="auto" alt="NeuroSense Logo" />
  
  <h3>Empowering Recovery through Bio-Telemetry & AI</h3>

  <p align="center">
    <img src="https://img.shields.io/badge/Imagine--Cup--2026-Project-0078d4?style=for-the-badge&logo=microsoft&logoColor=white" alt="Imagine Cup" />
    <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-19-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.8-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Supabase-Database-%233ecf8e.svg?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Tailwind--CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>
</div>

---

## 🏆 Microsoft Imagine Cup 2026
This project is developed for **Microsoft Imagine Cup 2026**. NeuroSense is a clinical-grade AI platform built to revolutionize neurological rehabilitation by bridging the gap between clinical data and patient recovery through real-time bio-telemetry.

---

## 🏗 System Architecture
<div align="center">

```mermaid
graph TD
    subgraph "Client Layer"
        P[Patient Portal]
        D[Doctor Portal]
    end
    
    subgraph "Processing Layer"
        S[Supabase Real-time Sync]
        AI[AI Recovery Prediction]
    end
    
    subgraph "Storage Layer"
        DB[(PostgreSQL Database)]
    end

    P <-->|Bio-Metrics| S
    D <-->|Oversight| S
    S <--> AI
    AI <--> DB
```

</div>

---

## 🧬 Specialized Modules

### 1. Neuro-Pathways (Patient)
Interactive recovery protocols designed to stimulate neural plasticity.

```mermaid
pie title Recovery Focus Distribution
    "Body Therapy (Motor Skills)" : 40
    "Brain Games (Cognitive)" : 35
    "Speech Therapy (Linguistic)" : 25
```

### 2. Clinical Analytics (Doctor)
High-precision monitoring tools for medical professionals.

---

## 🛠 Tech Stack & Tools

<div align="center">

| Layer | Technologies |
| :--- | :--- |
| **Logic** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Design** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) |
| **Backend** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) |
| **Viz** | ![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js&logoColor=white) ![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=flat-square) |

</div>

---

## 👥 Meet the Team

<div align="center">
  <table style="border-collapse: collapse; border: none;">
    <tr>
      <!-- Akshay Gurav -->
      <td align="center" style="padding: 20px; vertical-align: top;">
        <div style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 12px; padding: 24px; width: 280px; min-height: 480px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <img src="./public/Images/Team/Akshay-Gurav.png" width="120" style="border-radius: 50%; border: 3px solid #58a6ff; margin-bottom: 16px;" alt="Akshay Gurav" />
          <h3 style="margin: 0; color: #f0f6fc;">Akshay Gurav</h3>
          <p style="color: #58a6ff; font-size: 0.9em; margin: 4px 0 16px 0; font-weight: 600;">Team Leader & Full-Stack Developer</p>
          <p style="color: #8b949e; font-size: 0.85em; line-height: 1.6; text-align: center;">
            Led the Team (Leadership) || Executed End-to-End Frontend and Backend Development || Deployed the Web Application || Oversaw Research, Team Coordination, and UI/UX Design || Produced the Project Demonstration Video.
          </p>
          <div style="margin-top: 20px;">
            <a href="https://www.linkedin.com/in/akshay---gurav/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
          </div>
        </div>
      </td>
      <!-- Shreyash Kumar -->
      <td align="center" style="padding: 20px; vertical-align: top;">
        <div style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 12px; padding: 24px; width: 280px; min-height: 480px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <img src="./public/Images/Team/Shreyash-Kumar.png" width="120" style="border-radius: 50%; border: 3px solid #58a6ff; margin-bottom: 16px;" alt="Shreyash Kumar" />
          <h3 style="margin: 0; color: #f0f6fc;">Shreyash Kumar</h3>
          <p style="color: #58a6ff; font-size: 0.9em; margin: 4px 0 16px 0; font-weight: 600;">Project Operations Lead</p>
          <p style="color: #8b949e; font-size: 0.85em; line-height: 1.6; text-align: center;">
            Idea Selection || Project Management || Visual Suggestions || Final Devofolio Submission || Info Compilation & Updates || Including basic works.
          </p>
          <div style="margin-top: 20px;">
            <a href="https://www.linkedin.com/in/shreyash-kumar-9774b622a/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <!-- Mudit Vij -->
      <td align="center" style="padding: 20px; vertical-align: top;">
        <div style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 12px; padding: 24px; width: 280px; min-height: 400px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <img src="./public/Images/Team/Mudit-Vij.png" width="120" style="border-radius: 50%; border: 3px solid #30363d; margin-bottom: 16px;" alt="Mudit Vij" />
          <h3 style="margin: 0; color: #f0f6fc;">Mudit Vij</h3>
          <p style="color: #58a6ff; font-size: 0.9em; margin: 4px 0 16px 0; font-weight: 600;">Developer</p>
          <p style="color: #8b949e; font-size: 0.85em; line-height: 1.6; text-align: center;">
            [Description to be added]
          </p>
          <div style="margin-top: 20px;">
            <a href="https://www.linkedin.com/in/muditvij/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
          </div>
        </div>
      </td>
      <!-- Shreyansh Jain -->
      <td align="center" style="padding: 20px; vertical-align: top;">
        <div style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 12px; padding: 24px; width: 280px; min-height: 400px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <img src="./public/Images/Team/Shreyansh-Jain.png" width="120" style="border-radius: 50%; border: 3px solid #30363d; margin-bottom: 16px;" alt="Shreyansh Jain" />
          <h3 style="margin: 0; color: #f0f6fc;">Shreyansh Jain</h3>
          <p style="color: #58a6ff; font-size: 0.9em; margin: 4px 0 16px 0; font-weight: 600;">Developer</p>
          <p style="color: #8b949e; font-size: 0.85em; line-height: 1.6; text-align: center;">
            [Description to be added]
          </p>
          <div style="margin-top: 20px;">
            <a href="https://www.linkedin.com/in/shreyansh-jain-7511a232a/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
          </div>
        </div>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/[Your-Username]/neurosense.git
cd neurosense
npm install
```

### 2. Environment Configuration
Create a `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Launch
```bash
npm run dev
```

---

<div align="center">
  <sub>Built with ❤️ for <strong>Microsoft Imagine Cup 2026</strong></sub>
</div>
