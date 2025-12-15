# Pasakasa Creations Website

Official website for Pasakasa Creations - Building Games, Shaping Developers, Powering the Future.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Backend:** Supabase
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Marketing pages group
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── courses/       # Courses pages
│   │   ├── games/         # Games showcase
│   │   ├── careers/       # Careers page
│   │   └── contact/       # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   └── shared/            # Shared custom components
├── lib/
│   ├── supabase/          # Supabase client config
│   ├── constants/         # App constants
│   └── utils.ts           # Utility functions
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for backend features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pk-website-new
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 Pages

- **Home** (`/`) - Hero, about section, featured games and courses
- **Courses** (`/courses`) - Browse all courses
- **Course Detail** (`/courses/[slug]`) - Individual course details
- **Games** (`/games`) - Showcase of all games
- **Careers** (`/careers`) - Job openings and company culture
- **Contact** (`/contact`) - Contact form and information
- **About** (`/about`) - Company mission, vision, and values

## 🎨 Design System

The website uses a modern, premium design with:
- Dark theme by default
- Purple/blue gradient accents
- Smooth Framer Motion animations
- Responsive design (mobile-first)
- Glassmorphism effects
- Clean, spacious layouts

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Pages

1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Export metadata and default component
4. Add route to navigation if needed

### Supabase Setup

To enable backend features:

1. Create tables in Supabase:
   - `courses`
   - `products` (games)
   - `inquiries`
   - `enrollments`

2. Set up Row Level Security (RLS) policies
3. Update the mock data in pages with actual Supabase queries

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1440px+)

## ✨ Key Features

- ✅ SEO optimized with Next.js metadata
- ✅ Smooth page transitions and animations
- ✅ Fully responsive design
- ✅ Type-safe with TypeScript
- ✅ Component-based architecture
- ✅ Ready for Supabase integration
- ✅ Payment gateway ready (Stripe/Razorpay)

## 📝 Guidelines

See [claude.md](claude.md) for detailed development guidelines and architecture decisions.

## 🤝 Contributing

This is a private project for Pasakasa Creations. For any questions or suggestions, please contact the development team.

## 📄 License

© 2024 Pasakasa Creations. All rights reserved.
