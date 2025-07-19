# Pathological Lab Application

A modern, responsive Next.js application for a pathological laboratory with comprehensive features including:

## Features

- 🔍 **Advanced Search** - Smart search functionality with autocomplete
- 📅 **Booking System** - Multi-step appointment booking modal
- 🌙 **Dark Mode** - Complete dark/light theme support
- 📱 **Mobile Responsive** - Optimized for all device sizes
- ⚡ **Fast Loading** - Skeleton loaders and optimized performance
- 🎨 **Smooth Animations** - Scroll-triggered animations and transitions

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Next Themes** - Dark mode support

## Project Structure

\`\`\`
├── app/                 # Next.js App Router
├── components/          # Reusable components
├── lib/                 # Utility functions
├── public/              # Static assets
└── ...config files
\`\`\`

## Components

- **Navigation** - Responsive navigation with mobile menu
- **Hero Section** - Landing section with animated counters
- **Search** - Advanced search with autocomplete
- **Booking Modal** - Multi-step appointment booking
- **Testimonials** - Customer feedback section
- **FAQ** - Expandable questions and answers
- **Contact Form** - Contact form with validation
- **Footer** - Complete footer with links

## Customization

The application is fully customizable. You can:

- Modify colors in `tailwind.config.ts`
- Update content in component files
- Add new sections by creating components
- Customize the booking flow in `booking-modal.tsx`

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## License

This project is open source and available under the [MIT License](LICENSE).
