# Portfolio Website

A modern, responsive portfolio website for an engineering student built with React, Vite, Tailwind CSS, Framer Motion, and shadcn/ui components.

## 🚀 Features

- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI**: Clean, professional design with shadcn/ui components
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **Interactive Sections**: 
  - Hero/About section with animated profile image
  - Certifications showcase with external links
  - Skills & Experience with tabbed interface
  - Contact form with validation
  - Footer with important links
- **Performance Optimized**: Built with Vite for fast development and production builds

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: JavaScript (no TypeScript)

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   └── textarea.jsx
│   ├── Navbar.jsx          # Navigation component with dark mode toggle
│   ├── Hero.jsx            # Hero/About section
│   ├── Projects.jsx        # Featured projects showcase
│   ├── Skills.jsx          # Technical skills with unique design
│   ├── Certifications.jsx  # Certifications showcase
│   ├── Contact.jsx         # Contact form
│   └── Footer.jsx          # Footer with links
├── contexts/
│   └── ThemeContext.jsx    # Dark mode context provider
├── data/
│   └── portfolioData.js    # Centralized portfolio data
├── utils/
│   └── dataHelpers.js      # Data utility functions
├── lib/
│   └── utils.js           # Utility functions
├── App.jsx                # Main app component
├── main.jsx              # App entry point
└── index.css             # Global styles with dark mode support
```

## 🎨 Sections

### 1. Navigation Bar
- Fixed navigation with smooth scrolling
- Responsive mobile menu
- Dark mode toggle (desktop and mobile)
- Contact information display
- Scroll-based background changes

### 2. Hero/About Section
- Animated introduction with profile image
- Social media links
- Call-to-action buttons
- Floating animated elements

### 3. Featured Projects
- Dedicated projects showcase section
- Category filtering (All, Web Apps, Mobile Apps, AI/ML)
- Featured projects with detailed descriptions
- Project status indicators and technology tags
- GitHub and demo links for each project
- Interactive project cards with hover effects

### 4. Technical Skills
- Unique design with floating skill cards
- Animated skill progress bars with proficiency levels
- Category-based organization (Programming, Frameworks, Tools)
- Interactive skill cards with hover animations
- Skills statistics and overview
- Responsive design for mobile and desktop

### 5. Certifications
- Grid layout of certification cards
- External links to verify credentials
- Statistics section
- Hover animations

### 6. Contact Section
- Interactive contact form
- Contact information cards
- Social media links
- Form validation and submission feedback

### 7. Footer
- Quick navigation links
- Contact information
- Social media links
- Back-to-top button

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Customization

### Personal Information
All portfolio data is centralized in `src/data/portfolioData.js`. Update this single file to customize:

- **Personal Information**: Name, title, bio, location, graduation year, contact details
- **Social Media Links**: GitHub, LinkedIn, Twitter, email
- **Certifications**: Add/remove certifications with details
- **Skills**: Programming languages, frameworks, tools with proficiency levels
- **Experience**: Work history, internships, research positions
- **Projects**: Portfolio projects with descriptions and links
- **Contact Information**: Email, phone, location, response time
- **Navigation & Footer**: Links and legal information

### Dark Mode
The portfolio includes a built-in dark mode toggle:
- **Toggle Location**: Navigation bar (desktop and mobile)
- **Persistence**: Theme preference is saved in localStorage
- **System Preference**: Automatically detects user's system theme preference
- **Smooth Transitions**: All color changes are animated for better UX

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for theme customization
- CSS variables are defined in the `:root` selector for easy theming

### Images
- Replace the profile image URL in `src/components/Hero.jsx`
- Add your own project images in `src/components/SkillsExperience.jsx`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Scheme

The website uses a modern color palette with CSS custom properties:
- Primary: Blue (#3b82f6)
- Secondary: Light gray (#f1f5f9)
- Background: White (#ffffff)
- Text: Dark gray (#1e293b)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

If you have any questions or need help, feel free to reach out through the contact form on the website.

---

Made with ❤️ and React
