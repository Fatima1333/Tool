# Blood Pressure Tracker 💚

A modern, premium blood pressure tracking web application with beautiful UI/UX inspired by Apple Health and Google Fit.

![Blood Pressure Tracker](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.3-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8)

## ✨ Features

### Core Functionality
- 📊 **Add Daily BP Readings** - Record systolic, diastolic, pulse (optional), and date
- 💾 **LocalStorage** - All data stored locally in your browser (no backend required)
- 🎨 **Premium UI/UX** - Glassmorphism cards, smooth animations, gradients
- 🌓 **Dark/Light Mode** - Toggle between themes with persistent preferences
- 📈 **Interactive Charts** - Weekly line charts and monthly bar charts using Recharts
- ✅ **Color-Coded Status** - Visual indicators for Normal, Elevated, High BP Stage 1 & 2
- ✏️ **Edit & Delete** - Full CRUD operations for readings
- 🔔 **Toast Notifications** - Success messages for user actions
- 📱 **Responsive Design** - Mobile-first, works perfectly on all devices

### UI/UX Highlights
- Soft gradients and glassmorphism effects
- Smooth hover animations and transitions
- Animated heart pulse icon on latest reading
- Beautiful empty states
- Weekly trend summary messages
- Accessible color-blind friendly charts
- Large tap targets for mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Fatima1333/Tool.git
cd Tool
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **React 19.2** - UI library
- **Vite 7.3** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Recharts 3.6** - Chart library
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── AddReadingModal.jsx    # Add/Edit reading form modal
│   ├── BPCard.jsx             # Main BP display card
│   ├── WeeklyChart.jsx        # Weekly trend line chart
│   └── MonthlyChart.jsx       # Monthly averages bar chart
├── pages/
│   └── Dashboard.jsx          # Main dashboard page
├── utils/
│   ├── bpStatusCalculator.js  # BP status logic
│   └── storage.js             # LocalStorage utilities
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
└── index.css                  # Global styles & Tailwind
```

## 🎨 Design Principles

- **Minimal & Calm** - Medical-friendly color palette (blues, teals, greens)
- **Premium Feel** - Glassmorphism, subtle shadows, rounded corners
- **Accessible** - Color-blind friendly, clear typography hierarchy
- **Responsive** - Mobile-first approach, works on all screen sizes

## 📊 Blood Pressure Categories

- **Normal**: Systolic < 120 and Diastolic < 80 (Green)
- **Elevated**: Systolic 120-129 and Diastolic < 80 (Yellow)
- **High BP Stage 1**: Systolic 130-139 or Diastolic 80-89 (Orange)
- **High BP Stage 2**: Systolic ≥ 140 or Diastolic ≥ 90 (Red)

## ⚠️ Disclaimer

This tool is for informational purposes only and is not a medical diagnosis. Please consult with a healthcare professional for medical advice.

## 📝 License

ISC

## 🙏 Acknowledgments

Inspired by Apple Health and Google Fit design patterns.

---

Made with ❤️ for better health tracking
