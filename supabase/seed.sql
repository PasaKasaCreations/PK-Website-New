-- =====================================================
-- Pasakasa Creations - Seed Data
-- =====================================================
-- This file contains data with all fields properly populated
-- =====================================================

-- =====================================================
-- SEED GAMES/PRODUCTS
-- =====================================================

INSERT INTO games (
  name,
  slug,
  tagline,
  description,
  long_description,
  genre,
  thumbnail_url,
  screenshots,
  platforms,
  category,
  status,
  play_store_url,
  app_store_url,
  web_url,
  is_published,
  featured,
  release_date,
  hero_background_image,
  hero_stats,
  accent_color
) VALUES
(
  'Teen Patti Friends',
  'teen-patti-friends',
  'Play with friends, win big!',
  'Experience the thrill of Teen Patti with your friends. Join tables, compete in tournaments, and enjoy the ultimate Indian card game experience with daily rewards and exciting gameplay.',
  'Teen Patti Friends is a multiplayer Indian card game where players can enjoy classic Teen Patti gameplay with friends and real players online. Featuring smooth gameplay, social interaction, and competitive tables, the game delivers an authentic casino-style experience on mobile.',
  'Card',
  '/games/teen-patti/TeenPattiFriendsLogo.png',
  ARRAY['/games/teen-patti/TeenPatti_Dashboard.png', '/games/teen-patti/TeenPatti_Gameplay.png', '/games/teen-patti/TeenPatti_FortuneWheel.png'],
  ARRAY['android', 'ios'],
  'game',
  'released',
  'https://play.google.com/store/apps/details?id=com.PasakasaCreations.TeenpattiFriends',
  'https://apps.apple.com/app/teen-patti-friends',
  NULL,
  TRUE,
  TRUE,
  '2023-11-01',
  '/games/teen-patti/TeenPatti_Gameplay.png',
  '{"players": "50K+", "rating": "4.5", "feature": "Live Tables"}'::jsonb,
  'orange'
),
(
  'CallBreak Friends',
  'callbreak-friends',
  'Master the tricks, win the game',
  'Play the classic Callbreak card game online with players worldwide. Strategic gameplay with stunning visuals, multiplayer lobbies, and competitive matches.',
  'CallBreak Friends brings the popular trick-taking card game to mobile with online multiplayer, private tables, smooth UI, and competitive gameplay. Play with friends or challenge real players anytime, anywhere.',
  'Card',
  '/games/callbreak/callbreaklogo.webp',
  ARRAY['/games/callbreak/CallbreakBanner.webp', '/games/callbreak/callbreakMainTable.webp', '/games/callbreak/callbreakMultiplayerLobby.webp'],
  ARRAY['android'],
  'game',
  'released',
  'https://play.google.com/store/search?q=Callbreak%20Friends&c=apps',
  NULL,
  NULL,
  TRUE,
  TRUE,
  '2023-10-01',
  '/games/callbreak/CallbreakBanner.webp',
  '{"players": "100K+", "rating": "4.6", "feature": "Tournaments"}'::jsonb,
  'blue'
),
(
  'Space Defender VR',
  'space-defender-vr',
  'Defend the galaxy in immersive virtual reality',
  'Next-generation VR space shooter with breathtaking graphics',
  'Coming soon! Space Defender VR will bring space combat to life like never before with immersive VR dogfights, realistic physics, and multiplayer combat.',
  'Action',
  '/games/teen-patti/TeenPattiFriendsLogo.png',
  ARRAY['/games/space-defender-1.jpg'],
  ARRAY['windows', 'mac'],
  'game',
  'coming_soon',
  NULL,
  NULL,
  NULL,
  TRUE,
  FALSE,
  '2025-06-01',
  NULL,
  '{"players": "0", "rating": "0", "feature": "Coming Soon"}'::jsonb,
  'purple'
);

-- =====================================================
-- SEED COURSES
-- =====================================================

INSERT INTO courses (
  title,
  slug,
  description,
  long_description,
  instructor,
  duration,
  skill_level,
  thumbnail_url,
  syllabus,
  learning_outcomes,
  prerequisites,
  is_published,
  featured,
  sessions_running,
  sessions_completed,
  next_batch_date,
  location,
  max_students,
  current_students,
  testimonials,
  price,
  currency
) VALUES

-- =====================================================
-- Next.js 15 & React
-- =====================================================
(
  'Next.js 15 & React - The Complete Guide',
  'nextjs-15-react-complete-guide',
  'Build fullstack React apps with Next.js 15 and modern React',
  'Master fullstack web development using Next.js 15, App Router, Server Components, Server Actions, and modern React.',
  'Ravi Neupane',
  '10 weeks',
  'intermediate',
  '/courses/NextJSCourse.jpg',
  '[
    { "module": 1, "title": "Course Introduction & Setup", "topics": ["Welcome to the Course","What is Next.js & Why Use It","Key Features & Benefits of Next.js","Creating Your First Next.js App","Next.js vs Plain React","Pages Router vs App Router","How to Get the Most Out of the Course","Learning Community & Resources","Course Setup & Code Snapshots"] },
    { "module": 2, "title": "React Fundamentals", "topics": ["What is React","Components & JSX","Props & Data Passing","Styling with CSS Modules"] },
    { "module": 3, "title": "State, Events & Communication", "topics": ["Event Handling","Working with State","Lifting State Up","Conditional Rendering"] },
    { "module": 4, "title": "Forms, Lists & Side Effects", "topics": ["Forms","Lists","useEffect","Loading & Errors"] },
    { "module": 5, "title": "Routing with React Router", "topics": ["Routes","Nested Routes","Dynamic Routes","Data Fetching"] },
    { "module": 7, "title": "Next.js App Router Fundamentals", "topics": ["File-based Routing","Layouts","Dynamic Routes","Navigation"] },
    { "module": 8, "title": "Main Project – Foodies App", "topics": ["Layouts","Server vs Client Components","Database","Error Handling"] },
    { "module": 9, "title": "Server Actions & Forms", "topics": ["Server Actions","Validation","Security","Cache Revalidation"] },
    { "module": 10, "title": "Advanced Routing", "topics": ["Parallel Routes","Route Groups","Error Pages"] },
    { "module": 11, "title": "Data Fetching Strategies", "topics": ["Client vs Server Fetching","Suspense","Streaming"] },
    { "module": 12, "title": "Caching & Performance", "topics": ["Next.js Caching","Revalidation","Optimization"] },
    { "module": 13, "title": "Images & Metadata", "topics": ["Next.js Image","SEO Metadata"] },
    { "module": 14, "title": "Authentication & Security", "topics": ["Sessions","Password Hashing","Route Protection"] },
    { "module": 15, "title": "APIs & Middleware", "topics": ["Route Handlers","Middleware","MongoDB"] },
    { "module": 16, "title": "Advanced Projects", "topics": ["Events App","Blog App","Contact Forms"] },
    { "module": 17, "title": "Deployment & Production", "topics": ["Vercel","Env Variables","Security"] },
    { "module": 18, "title": "Pages Router (Legacy)", "topics": ["getStaticProps","ISR","API Routes"] },
    { "module": 19, "title": "NextAuth (Pages Router)", "topics": ["next-auth","Credentials","Session Management"] }
  ]'::jsonb,
  ARRAY[
  'Learn how to build fullstack React apps with NextJS 15 & the App Router',
  'Build real projects and apply what you learned with hands-on projects and examples',
  'Learn about different ways of building NextJS app - App Router vs Pages Router',
  'Get started with React Server Components, Client Components, data fetching & more!',
  'Handle data submissions via Server Actions',
  'Learn all key NextJS features like pre-rendering, SSR, data fetching, file-based routing and authentication'
  ],
  ARRAY[
  'ReactJS knowledge is strongly recommended, but the course also includes a complete React refresher module',
  'No prior NextJS knowledge is required'
],
  TRUE,
  TRUE,
  1,
  2,
  '2025-02-15',
  'Online Live Classes',
  30,
  15,
  '[]'::jsonb,
  0,
  'NPR'
),

-- =====================================================
-- React Complete Guide 2025
-- =====================================================
(
  'React - The Complete Guide 2025 (incl. Next.js, Redux)',
  'react-complete-guide-2025',
  'Learn React from scratch to advanced level',
  'The most comprehensive React course covering Hooks, Redux, Router, Performance, and advanced patterns.',
  'Ravi Neupane',
  '6 weeks',
  'beginner',
  '/courses/ReactJsCourse.jpg',
  '[
  {"module":1,"title":"Course Introduction & Getting Started","topics":["Welcome to the Course","What is React & Why Use It","React vs Vanilla JavaScript","Course Outline & Learning Paths","How to Get the Most Out of the Course","Learning Community","Creating React Projects","Project Setup & Tooling"]},
  {"module":2,"title":"JavaScript Refresher for React","topics":["JavaScript in React Projects","Build Process & Imports/Exports","Variables, Operators & Functions","Arrow Functions","Objects, Arrays & Array Methods","Destructuring & Spread Operator","Control Structures","Reference vs Primitive Values","Modern JavaScript Summary"]},
  {"module":3,"title":"React Fundamentals – Components & JSX","topics":["What Are Components","JSX & React Components","Creating Custom Components","Component Tree & How React Works","Dynamic Values in JSX","HTML Attributes & Assets","Props & Component Reusability","Project Structure Best Practices","Children Prop & Composition"]},
  {"module":4,"title":"Events, State & UI Updates","topics":["Event Handling","Passing Functions as Props","Managing State with Hooks","Updating State Correctly","Derived & Computed State","Conditional Rendering","Dynamic Styling","Rendering Lists"]},
  {"module":5,"title":"Advanced Component Patterns","topics":["Fragments","Splitting Components","Forwarding Props","Multiple JSX Slots","Dynamic Component Types","Default Props","Reusable Components"]},
  {"module":6,"title":"State Management Deep Dive (Tic-Tac-Toe Project)","topics":["Component Isolation","Updating State Based on Previous State","Two-Way Binding","Working with Objects & Arrays","Lifting State Up","Derived State","Immutability","Project Polishing"]},
  {"module":7,"title":"Styling React Applications","topics":["Vanilla CSS","Inline Styles","Dynamic Styling","CSS Modules","Styled Components","Tailwind CSS","Styling Best Practices"]},
  {"module":8,"title":"Debugging & Developer Tools","topics":["Understanding Error Messages","Browser Debugging","React Strict Mode","React DevTools","Debugging Exercises"]},
  {"module":9,"title":"Refs, Portals & Imperative Code","topics":["Refs vs State","Accessing DOM Elements","useRef Hook","Forwarding Refs","useImperativeHandle","Portals","Modal Components"]},
  {"module":10,"title":"Practice Project – Project Management App","topics":["Layout & Sidebar","Reusable Inputs & Buttons","State Management","Input Validation","Modal Handling","Task Management"]},
  {"module":11,"title":"Context API & useReducer","topics":["Prop Drilling Problem","Context API Introduction","Creating & Providing Context","Consuming Context","useReducer Hook","Dispatching Actions"]},
  {"module":12,"title":"Side Effects & useEffect","topics":["What Are Side Effects","useEffect Basics","Dependency Arrays","Cleanup Functions","useCallback","Performance Optimizations"]},
  {"module":13,"title":"Advanced Project – Quiz App","topics":["Dynamic Rendering","Timers & Effects","Component Splitting","Complex State Management","Results Output"]},
  {"module":14,"title":"React Performance Optimization","topics":["Component Re-rendering","memo","useCallback","useMemo","Virtual DOM","Keys & State Resetting"]},
  {"module":15,"title":"Class-Based Components","topics":["Class Components Basics","State & Lifecycle Methods","Context in Class Components","Error Boundaries","Functional vs Class Components"]},
  {"module":16,"title":"HTTP Requests & Backend Communication","topics":["Fetching Data","Loading & Error Handling","Transforming Data","POST & DELETE Requests","Optimistic Updating"]},
  {"module":17,"title":"Custom Hooks","topics":["Rules of Hooks","Creating Custom Hooks","Reusable Logic","Flexible Hooks"]},
  {"module":18,"title":"Forms & User Input","topics":["Controlled vs Uncontrolled Inputs","Form Submission","Validation Strategies","Reusable Inputs","Custom useInput Hook"]},
  {"module":19,"title":"Redux Fundamentals","topics":["Redux vs Context","Redux Core Concepts","Redux Toolkit","Slices & Store","Connecting Redux"]},
  {"module":20,"title":"React Router","topics":["Routing Basics","Nested Routes","Dynamic Routes","Data Fetching","Error Handling"]},
  {"module":21,"title":"Authentication","topics":["How Authentication Works","Login & Logout","Token Management","Route Protection"]},
  {"module":22,"title":"Deployment & Production","topics":["Lazy Loading","Production Builds","Deployment Configuration"]},
  {"module":23,"title":"React with TypeScript","topics":["TypeScript Basics","React + TypeScript Setup","Typing Props & State","Context with TypeScript"]}
  ]'::jsonb,
  ARRAY[
  'Learn React from the ground up and finish the course as an advanced React developer',
  'Build multiple high-quality demo apps',
  'Follow along locally or in a cloud development environment',
  'Learn all about React Hooks and React Components',
  'Manage complex state efficiently with React''s Context API & React Redux',
  'Build standalone React apps & applications connected to a backend via HTTP',
  'Learn about routing & route-related data fetching with React Router',
  'Implement user authentication in React apps'
],
  ARRAY[
  'JavaScript + HTML + CSS fundamentals are absolutely required',
  'You DON''T need to be a JavaScript expert to succeed in this course!',
  'ES6+ JavaScript knowledge is beneficial but not a must-have',
  'NO prior React or any other JS framework experience is required!'
],
  TRUE,
  TRUE,
  3,
  8,
  '2025-01-20',
  'Hybrid',
  35,
  28,
  '[]'::jsonb,
  0,
  'NPR'
),

-- =====================================================
-- Unity 2D Game Development
-- =====================================================
(
  'Complete C# Unity 2D Game Development in Unity 6',
  'complete-csharp-unity-2d-game-dev',
  'Learn C# and Unity by building real 2D games',
  'Build 4 complete 2D games while mastering C# and Unity 6.',
  'Shreedesh Niroula',
  '6 weeks',
  'beginner',
  '/courses/unityCourse1.jpg',
  '[
  {"module":1,"title":"Course Introduction & Unity Setup","topics":["Welcome to the Course","Download & Install Unity Hub","Unity Security Update","Unity Interface Overview","Writing Your First C# Script","Community & Support"]},
  {"module":2,"title":"C# Basics for Unity","topics":["Methods & Functions","Variables & Data Types","SerializeField Usage","Keyboard Input","Conditional Statements","Time.deltaTime","Booleans"]},
  {"module":3,"title":"Unity Physics & Collision (2D)","topics":["Transform.Translate","Colliders & Rigidbody2D","OnCollisionEnter2D","OnTriggerEnter2D","Tags","Destroying Objects","GetComponent"]},
  {"module":4,"title":"Project 1 – Delivery Dash","topics":["Game Design Overview","Player Movement","Cinemachine Camera","Assets & Backgrounds","Level Creation","Boosts & Bumps","UI Text","Prefabs"]},
  {"module":5,"title":"Project 2 – Snow Surfer","topics":["Sprite Shapes","Surface Effector 2D","Unity Input System","Finish Line Logic","Crash Detection","Particle Systems","Powerups","UI Buttons"]},
  {"module":6,"title":"Unity UI Fundamentals","topics":["Text & Fonts","Anchors & Pivots","Layout Groups","Buttons","UI Timers"]},
  {"module":7,"title":"Project 3 – Tilevania","topics":["Tilemap System","Player Animations","Enemy AI","Shooting Mechanics","Coin Pickups","Game Session Controller","Scene Persistence"]},
  {"module":8,"title":"Project 4 – Star Blaster","topics":["Enemy Spawning","Player & Enemy Shooting","Scrolling Backgrounds","Score System","Audio Effects","Game Balancing"]},
  {"module":9,"title":"Core Programming Concepts in Games","topics":["Arrays & Lists","Loops","Namespaces","Script Organization","ScriptableObjects","Singleton Pattern"]},
  {"module":10,"title":"Game Architecture & Persistence","topics":["Game Session Controllers","Persistent Objects","Scene Management","Prefab Variants"]},
  {"module":11,"title":"Audio & Visual Effects","topics":["Particle Systems","Screen Shake","Sound Effects","Background Music"]},
  {"module":12,"title":"Input Systems","topics":["Legacy Input","New Input System","Axis Input","Player Control Abstraction"]},
  {"module":13,"title":"Polishing & Optimization","topics":["Gameplay Tuning","Physics Adjustments","Animation Improvements","UI Polish","Performance Awareness"]},
  {"module":14,"title":"Course Wrap-up & Legacy Content","topics":["Final Review","Next Steps","Unity 2021 Legacy Projects","Advanced UI Systems"]}
  ]'::jsonb,
  ARRAY[
  'Make 4 real 2D games in Unity and gain the confidence to build your own from scratch',
  'Learn C# programming from scratch — no prior coding experience required',
  'Build a solid foundation in game design and game development principles',
  'Understand how object-oriented programming works through hands-on practice',
  'Create fully playable 2D game projects to boost your portfolio or just for fun',
  'Develop transferable problem-solving and coding skills you can use anywhere',
  'Apply your knowledge beyond Unity — to .NET, other languages, or engines'
],
  ARRAY[
  'A PC or Mac capable of running Unity 6 or later',
  'Regular internet access for Q&A and community support',
  'No coding or Unity experience needed — we’ll teach you everything from scratch',
  'A passion and willingness to learn how to code.'
],
  TRUE,
  TRUE,
  2,
  4,
  '2025-02-10',
  'Online',
  30,
  22,
  '[]'::jsonb,
  0,
  'NPR'
);


-- =====================================================
-- SEED JOB POSTINGS
-- =====================================================

INSERT INTO job_postings (
  title,
  slug,
  department,
  location,
  employment_type,
  salary,
  visa_requirements,
  description,
  requirements,
  responsibilities,
  nice_to_have,
  benefits,
  company,
  contact,
  similar_jobs,
  is_published,
  posted_date,
  application_deadline
) VALUES
(
  'Unity Game Developer',
  'unity-game-developer',
  'Game Development',
  'Kathmandu, Nepal',
  'full_time',
  'NPR 60,000 - 120,000 per month',
  'Must be eligible to work in Nepal',
  'We''re looking for an experienced Unity developer to create engaging 2D and 3D games. You''ll work on exciting projects and collaborate with a passionate team to build games that inspire and entertain millions of players.',
  ARRAY[
    '3+ years of professional Unity game development experience',
    'Strong proficiency in C# programming',
    'Experience with 2D and 3D game development',
    'Portfolio of published games (mobile or PC)',
    'Understanding of game design principles',
    'Strong problem-solving and debugging skills',
    'Excellent communication and teamwork abilities'
  ],
  ARRAY[
    'Design and implement engaging 2D and 3D game mechanics',
    'Collaborate with designers and artists to bring game concepts to life',
    'Optimize game performance across multiple platforms',
    'Write clean, maintainable, and well-documented code',
    'Participate in code reviews and mentor junior developers',
    'Stay updated with latest Unity features and game development trends',
    'Debug and fix issues reported by QA team'
  ],
  ARRAY[
    'Experience with multiplayer game development',
    'Knowledge of shader programming',
    'Familiarity with game analytics and monetization',
    'Experience with VR/AR development'
  ],
  ARRAY[
    'Competitive salary with performance bonuses',
    'Comprehensive health insurance',
    'Flexible work arrangements',
    'Annual learning and development budget of NPR 50,000',
    'Latest MacBook Pro or high-end workstation',
    'Free courses from our academy',
    '20 days paid time off plus public holidays',
    'Team building activities and game nights',
    'Stock options for senior positions'
  ],
  '{
    "name": "Pasakasa Creations",
    "description": "At Pasakasa Creations, we''re building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact."
  }'::jsonb,
  '{
    "name": "Prashant Khanal",
    "title": "Co-Founder & CTO",
    "email": "careers@pasakasa.com",
    "photo": "/team/prashant.jpg",
    "linkedin": "https://www.linkedin.com/in/prashant-khanal"
  }'::jsonb,
  '[]'::jsonb,
  TRUE,
  '2025-01-10',
  '2025-03-31'
),
(
  'Game Design Intern',
  'game-design-intern',
  'Game Development',
  'Remote',
  'internship',
  'NPR 15,000 - 25,000 per month (Stipend)',
  'Not required for remote positions',
  'Learn game development from industry professionals. Work on real projects and gain hands-on experience in a supportive environment. This internship is perfect for students or recent graduates passionate about making games.',
  ARRAY[
    'Passion for game development and design',
    'Basic understanding of Unity or Unreal Engine',
    'Strong creative thinking and problem-solving skills',
    'Currently pursuing or recently completed degree in relevant field',
    'Good communication skills',
    'Ability to work independently and in a team'
  ],
  ARRAY[
    'Assist in designing game mechanics and levels',
    'Create game design documents and prototypes',
    'Playtest games and provide feedback',
    'Collaborate with the development team',
    'Research industry trends and best practices',
    'Learn from experienced game developers',
    'Contribute to brainstorming sessions'
  ],
  ARRAY[
    'Portfolio of game projects (personal or academic)',
    'Experience with game jams',
    'Knowledge of game engines beyond Unity',
    'Understanding of game monetization'
  ],
  ARRAY[
    'Monthly stipend',
    'Mentorship from industry professionals',
    'Certificate of completion',
    'Opportunity for full-time employment',
    'Flexible work hours',
    'Access to premium learning resources',
    'Work on published games'
  ],
  '{
    "name": "Pasakasa Creations",
    "description": "At Pasakasa Creations, we believe in nurturing talent. Our internship program is designed to give aspiring game developers real-world experience and the skills needed to succeed in the industry."
  }'::jsonb,
  '{
    "name": "HR Team",
    "title": "Human Resources",
    "email": "internships@pasakasa.com",
    "photo": "",
    "linkedin": ""
  }'::jsonb,
  '[]'::jsonb,
  TRUE,
  '2025-01-15',
  '2025-04-30'
);

-- =====================================================
-- SEED COMPLETE
-- =====================================================
-- You can now query these tables to see the data
-- =====================================================
