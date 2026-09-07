export const trustPoints = [
  { icon: 'BadgeCheck', label: 'Government Approved', detail: 'Government of Tamil Nadu' },
  { icon: 'Landmark', label: 'University Affiliated', detail: 'Thiruvalluvar University, Vellore' },
  { icon: 'Award', label: 'Academic Excellence', detail: 'Consistent university results' },
  { icon: 'HeartHandshake', label: 'Student-Centric', detail: 'Mentoring for every learner' },
]

export const stats = [
  { value: 2022, suffix: '', label: 'Established', caption: 'Serving the region since' },
  { value: 1000, suffix: '+', label: 'Students', caption: 'On campus each year' },
  { value: 7, suffix: '+', label: 'Programmes', caption: 'Across four disciplines' },
  { value: 100, suffix: '%', label: 'Commitment', caption: 'To academic excellence' },
]

/**
 * Institutional honours shown beside the About copy. `mark` names the artwork
 * in `brand` (src/data/images.js).
 */
export const awards = [
  {
    year: '1958',
    title: 'World Education Award',
    mark: 'awardStar',
    description:
      'Teachers play a critical role in education by instructing and guiding students through every stage of their learning.',
  },
  {
    year: '1999',
    title: 'Global Luminary Award',
    mark: 'awardMedal',
    description:
      'Teachers play a critical role in education by instructing and guiding students towards the goals they set for themselves.',
  },
]

export const whyChoose = [
  {
    number: '01',
    icon: 'BookMarked',
    title: 'Academic Excellence',
    description:
      'A curriculum delivered to university standard, with continuous internal assessment, remedial coaching and a results culture that has held for decades.',
  },
  {
    number: '02',
    icon: 'Building2',
    title: 'Industry Exposure',
    description:
      'Industrial visits, guest lectures from practitioners and live projects connect classroom theory to the way organisations actually work.',
  },
  {
    number: '03',
    icon: 'UserCheck',
    title: 'Experienced Faculty',
    description:
      'Qualified, long-serving teachers who know their students by name accessible well beyond scheduled class hours.',
  },
  {
    number: '04',
    icon: 'Target',
    title: 'Career & Placement Support',
    description:
      'A dedicated placement cell running aptitude training, mock interviews, résumé clinics and campus recruitment drives.',
  },
  {
    number: '05',
    icon: 'MonitorPlay',
    title: 'Modern Learning Environment',
    description:
      'Digital classrooms, an equipped computer laboratory and a growing library that together support independent learning.',
  },
  {
    number: '06',
    icon: 'Sparkles',
    title: 'Holistic Development',
    description:
      'NSS, sports, cultural forums and women empowerment initiatives that build character alongside qualifications.',
  },
]

export const pathway = [
  {
    number: '01',
    icon: 'Compass',
    title: 'Career Setup',
    description:
      'Focus on interdisciplinary learning, skill development (writing, critical thinking), internships, and networking in fields like media, education, and public administration.',
  },
  {
    number: '02',
    icon: 'Library',
    title: 'Support services',
    description:
      'College support services provide students with resources to succeed academically, personally, and professionally. These services may include academic advising, tutoring, counseling, career guidance, and disability support.',
  },
  {
    number: '03',
    icon: 'LifeBuoy',
    title: 'Career Development',
    description:
      'Students can connect with professionals in their desired field, potentially leading to internships, mentorship, or job opportunities. Also promotes students personal growth, self-improvement, and a sense of purpose.',
  },
  {
    number: '04',
    icon: 'Microscope',
    title: 'Educational Resources',
    description:
      'Incorporate a wide range of materials and tools that facilitate learning, including textbooks, online courses, educational software, videos, podcasts, and interactive simulations.',
  },
  {
    number: '05',
    icon: 'TrendingUp',
    title: 'Research and innovation',
    description:
      'Faculty and students engage in cutting-edge research, exploring new ideas and solutions that benefit society. The college supports innovation through funding, mentorship, and resources, helping students and faculty turn their ideas into reality and preparing them for the challenges of the future.',
  },
  {
    number: '06',
    icon: 'Handshake',
    title: 'Placement',
    description:
      'Encompasses matching students with career paths or educational programs that align with their skills, interests, and abilities.',
  },
]

export const faqs = [
  {
    question: 'Where is A.N.R College of Arts and Science located?',
    answer:
      'A.N.R College of Arts and Science is located in Tamil Nadu and offers quality higher education in arts and science disciplines.',
  },
  {
    question: 'What courses are offered at A.N.R College of Arts and Science?',
    answer:
      'The college offers undergraduate and postgraduate programs in Arts, Science, Commerce, and Management streams.',
  },
  {
    question: 'Is the college affiliated with a university?',
    answer:
      'Yes, the college is affiliated with a recognized university and follows approved academic regulations.',
  },
  {
    question: 'Does the college provide placement assistance?',
    answer:
      'Yes, the college offers career guidance, skill development programs, and placement support.',
  },
  {
    question: 'Why choose A.N.R College of Arts and Science?',
    answer:
      'The institution focuses on academic excellence, industry exposure, and holistic student growth.',
  },
]

/**
 * The academic departments, in the order they appear on /departments.
 * `slug` matches the programme record in src/data/programmes.js, it supplies
 * the card image, icon and the link to the programme page.
 */
export const departments = [
  {
    name: 'BBA - Bachelor of Business Administration',
    slug: 'bba',
    category: 'humanities',
    summary:
      'A 3-year degree program that equips students with essential business skills, management and entrepreneurship.',
  },
  {
    name: 'BCOM Corporate Secretaryship',
    slug: 'corporate-secretaryship',
    category: 'commerce',
    summary:
      'A 3-year degree program. It equips students with corporate laws and governance practices.',
  },
  {
    name: 'BCOM - Bachelor of Commerce',
    slug: 'bcom',
    category: 'commerce',
    summary:
      'A 3-year degree program in commerce. It equips students with accounting, finance, and business skills.',
  },
  {
    name: 'BSC Computer Science',
    slug: 'computer-science',
    category: 'science',
    summary:
      'A 3-year degree program which equips students with programming, software development, and IT skills.',
  },
  {
    name: 'BSC Maths',
    slug: 'mathematics',
    category: 'science',
    summary:
      'A 3-year degree program. It equips students with advanced mathematical concepts and analytical skills.',
  },
  {
    name: 'Department of Tamil',
    slug: 'tamil',
    category: 'languages',
    summary:
      'A 3-year degree program. It equips students with Tamil language, literature, and cultural studies.',
  },
  {
    name: 'Department of English',
    slug: 'english',
    category: 'languages',
    summary:
      'A 3-year degree program. It equips students with literary analysis, language skills, and creative writing.',
  },
]

export const aboutPillars = [
  {
    icon: 'Eye',
    title: 'Our Vision',
    description:
      'To be a centre of higher education that transforms rural talent into confident, employable and socially responsible graduates.',
  },
  {
    icon: 'Flag',
    title: 'Our Mission',
    description:
      'To deliver quality education at a cost families can afford, to teach with integrity, and to support every student until they graduate with a plan.',
  },
  {
    icon: 'Gem',
    title: 'Our Values',
    description:
      'Discipline, curiosity and service. We measure ourselves by what our students become, not by what we advertise.',
  },
]

export const milestones = [
  { year: '1958', title: 'Foundation', detail: 'The institution is established to bring higher education within reach of Vadamavandal and the surrounding villages.' },
  { year: '1999', title: 'Global Luminary Award', detail: 'Recognition for sustained contribution to education, instructing and guiding students across the region.' },
  { year: '2010', title: 'Academic Expansion', detail: 'Commerce and management programmes are expanded, adding Corporate Secretaryship and Business Administration.' },
  { year: '2018', title: 'Postgraduate Studies', detail: 'M.Com is introduced, opening a research and teaching pathway for commerce graduates.' },
  { year: '2024', title: 'Digital Campus', detail: 'Digital classrooms, an upgraded computer laboratory and online learning resources are rolled out college-wide.' },
]

export const academicFramework = [
  {
    icon: 'CalendarDays',
    title: 'Semester Pattern',
    description:
      'All programmes follow the Thiruvalluvar University semester pattern with two semesters per academic year and a published academic calendar.',
  },
  {
    icon: 'ClipboardCheck',
    title: 'Continuous Assessment',
    description:
      'Internal assessment through cycle tests, assignments, seminars and model examinations carries alongside the university end-semester examination.',
  },
  {
    icon: 'Users2',
    title: 'Mentor System',
    description:
      'Every student is attached to a faculty mentor who tracks attendance, academic progress and personal wellbeing through the programme.',
  },
  {
    icon: 'BookOpenCheck',
    title: 'Remedial & Advanced Coaching',
    description:
      'Slow learners receive structured remedial support; advanced learners are prepared for competitive examinations and higher study.',
  },
  {
    icon: 'Presentation',
    title: 'Seminars & Projects',
    description:
      'Departmental seminars, industrial visits and supervised project work carry the curriculum beyond the prescribed syllabus.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Quality Assurance',
    description:
      'The IQAC reviews teaching, learning and evaluation each semester and acts on structured student feedback.',
  },
]
