# Twitter Clone 🐦

A modern, fully functional Twitter-like web application built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Tweet Feed**: Display tweets with real-time interactions
- **Compose Tweets**: Create and post new tweets with character limit
- **Interactive Elements**: Like, retweet, reply, and bookmark functionality
- **Trending Topics**: Discover what's happening around the world
- **Who to Follow**: Suggestions for new connections
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Framer Motion powered interactions

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Fonts**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd twitter-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
twitter-clone/
├── app/                    # Next.js 14 app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── Sidebar.tsx        # Left navigation sidebar
│   ├── Feed.tsx           # Main tweet feed
│   ├── TweetCard.tsx      # Individual tweet component
│   ├── Trending.tsx       # Right sidebar with trends
│   └── ComposeTweet.tsx   # Tweet composition modal
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🎨 Design System

The application uses a custom design system built on top of Tailwind CSS:

- **Colors**: Twitter-inspired color palette with custom grays
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent spacing scale using Tailwind's spacing utilities
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Reusable component classes for buttons, inputs, and cards

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Key Components

### Sidebar
- Navigation menu with icons
- Profile section
- Compose tweet button

### Feed
- Sticky header with tabs
- Tweet list with animations
- Responsive layout

### TweetCard
- User information display
- Interactive action buttons
- Like, retweet, reply functionality

### Trending
- Search functionality
- Trending topics
- Who to follow suggestions

### ComposeTweet
- Modal-based tweet composition
- Character counter with visual feedback
- Media attachment options

## 🚀 Deployment

The application can be easily deployed to various platforms:

- **Vercel**: Zero-config deployment
- **Netlify**: Simple drag-and-drop deployment
- **AWS Amplify**: Full-stack deployment
- **Railway**: Easy container deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Twitter's design and functionality
- Built with modern web technologies
- Special thanks to the open-source community

---

**Happy coding! 🚀**
