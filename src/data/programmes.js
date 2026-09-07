import campusComputerLab from '../assets/images/22.webp'
import bbaPhoto from '../assets/images/bba.webp'
import corporateSecretaryshipPhoto from '../assets/images/bcom_cs.webp'
import bcomPhoto from '../assets/images/bcom.webp'
import computerSciencePhoto from '../assets/images/bsc_cs.webp'
import mathematicsPhoto from '../assets/images/bsc_maths.webp'
import tamilPhoto from '../assets/images/ba_tamil.webp'
import englishPhoto from '../assets/images/ba_english.webp'

/** Cover photograph for each programme, keyed by slug. */
const programmeImages = {
  'computer-science': { src: computerSciencePhoto, alt: 'B.Sc Computer Science at ANR College of Arts and Science' },
  mathematics: { src: mathematicsPhoto, alt: 'B.Sc Mathematics at ANR College of Arts and Science' },
  bcom: { src: bcomPhoto, alt: 'B.Com Bachelor of Commerce at ANR College of Arts and Science' },
  'corporate-secretaryship': {
    src: corporateSecretaryshipPhoto,
    alt: 'B.Com Corporate Secretaryship at ANR College of Arts and Science',
  },
  mcom: { src: bcomPhoto, alt: 'M.Com at ANR College of Arts and Science' },
  bba: { src: bbaPhoto, alt: 'BBA Bachelor of Business Administration at ANR College of Arts and Science' },
  tamil: { src: tamilPhoto, alt: 'Department of Tamil at ANR College of Arts and Science' },
  english: { src: englishPhoto, alt: 'Department of English at ANR College of Arts and Science' },
}

const fallbackImage = { src: campusComputerLab, alt: 'Faculty and students during a computer laboratory session' }

export const categories = [
  {
    slug: 'science',
    label: 'Science',
    headline: 'Analytical minds, built on rigour.',
    description:
      'The Science stream combines conceptual depth with hands-on laboratory practice, preparing students for technology roles, research and higher study.',
    icon: 'FlaskConical',
  },
  {
    slug: 'commerce',
    label: 'Commerce',
    headline: 'Business fluency for a changing economy.',
    description:
      'Our Commerce programmes cover accounting, taxation, corporate law and finance, taught with a strong emphasis on practical application and professional certification pathways.',
    icon: 'LineChart',
  },
  {
    slug: 'humanities',
    label: 'Humanities',
    headline: 'Leadership, communication, judgement.',
    description:
      'Management education at ANR develops decision-makers, students who can read an organisation, work with people and carry an idea from proposal to delivery.',
    icon: 'Users',
  },
  {
    slug: 'languages',
    label: 'Languages',
    headline: 'Literature, culture and expression.',
    description:
      'Language departments anchor the cultural life of the college, developing scholarship in Tamil and professional fluency in English across every programme.',
    icon: 'Languages',
  },
]

export const programmes = [
  {
    slug: 'computer-science',
    category: 'science',
    name: 'B.Sc Computer Science',
    degree: 'Bachelor of Science',
    duration: '3 Years / 6 Semesters',
    mode: 'Full Time',
    intake: '60 Seats',
    eligibility: 'A pass in the Higher Secondary (+2) examination with Mathematics or Computer Science as a subject.',
    tagline: 'Programming, systems and applied computing.',
    excerpt:
      'A practice-first computing degree covering programming, data structures, databases, networks and web technologies with continuous laboratory work.',
    description:
      'The B.Sc Computer Science programme builds a strong foundation in programming logic and computing fundamentals, then layers on the applied skills that industry hires for. Every theory paper is paired with laboratory hours, and students complete a supervised project in the final semester.',
    highlights: [
      'Dedicated computer laboratory with supervised open-lab hours',
      'Programming in C, C++, Java, Python and web technologies',
      'Mini projects each year, culminating in a final semester project',
      'Certification and internship guidance through the placement cell',
    ],
    subjects: [
      'Programming in C and C++',
      'Data Structures and Algorithms',
      'Object Oriented Programming with Java',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Web Technology and Python',
      'Software Engineering',
    ],
    careers: ['Software Developer', 'Web Developer', 'Systems and Support Engineer', 'Data Analyst', 'M.Sc / MCA'],
    icon: 'Cpu',
  },
  {
    slug: 'mathematics',
    category: 'science',
    name: 'B.Sc Mathematics',
    degree: 'Bachelor of Science',
    duration: '3 Years / 6 Semesters',
    mode: 'Full Time',
    intake: '60 Seats',
    eligibility: 'A pass in the Higher Secondary (+2) examination with Mathematics as a subject.',
    tagline: 'Pure and applied mathematics.',
    excerpt:
      'Algebra, calculus, statistics and operations research taught with an emphasis on problem solving and competitive examination readiness.',
    description:
      'The Mathematics programme develops the abstraction and problem-solving ability that underpins careers in analytics, teaching, banking and the civil services. Students are coached through classical mathematics alongside applied papers in statistics and operations research.',
    highlights: [
      'Structured coaching for banking and competitive examinations',
      'Statistics and operations research with computational practice',
      'Departmental mathematics forum, quizzes and seminars',
      'A clear pathway to M.Sc, B.Ed and research programmes',
    ],
    subjects: [
      'Classical Algebra and Theory of Equations',
      'Differential and Integral Calculus',
      'Analytical Geometry',
      'Differential Equations and Laplace Transforms',
      'Real and Complex Analysis',
      'Linear Algebra',
      'Statistics and Numerical Methods',
      'Operations Research',
    ],
    careers: ['Data and Business Analyst', 'Banking and Insurance', 'Teaching and Academia', 'Actuarial Pathways', 'M.Sc / B.Ed'],
    icon: 'Sigma',
  },
  {
    slug: 'bcom',
    category: 'commerce',
    name: 'B.Com (General)',
    degree: 'Bachelor of Commerce',
    duration: '3 Years / 6 Semesters',
    mode: 'Full Time',
    intake: '60 Seats',
    eligibility: 'A pass in the Higher Secondary (+2) examination in any stream.',
    tagline: 'Accounting, finance and taxation.',
    excerpt:
      'The complete commerce foundation, financial accounting, cost accounting, business law, taxation and corporate finance.',
    description:
      'B.Com (General) is the most broadly applicable degree offered by the college, giving students the accounting and regulatory grounding required by employers and by professional bodies. Practical accounting sessions and computerised accounting build workplace readiness alongside theory.',
    highlights: [
      'Computerised accounting practice using industry packages',
      'Income tax and GST papers aligned to current regulation',
      'Support for CA, CMA and CS foundation preparation',
      'Commerce association activities, quizzes and industry visits',
    ],
    subjects: [
      'Financial Accounting',
      'Corporate Accounting',
      'Cost and Management Accounting',
      'Business Law and Company Law',
      'Income Tax Law and Practice',
      'Banking Theory, Law and Practice',
      'Business Statistics',
      'Auditing and Corporate Finance',
    ],
    careers: ['Accountant', 'Audit Assistant', 'Tax Practitioner', 'Banking Services', 'M.Com / MBA / CA'],
    icon: 'Calculator',
  },
  {
    slug: 'corporate-secretaryship',
    category: 'commerce',
    name: 'B.Com Corporate Secretaryship',
    degree: 'Bachelor of Commerce',
    duration: '3 Years / 6 Semesters',
    mode: 'Full Time',
    intake: '40 Seats',
    eligibility: 'A pass in the Higher Secondary (+2) examination in any stream.',
    tagline: 'Corporate law, governance and compliance.',
    excerpt:
      'A specialised commerce degree focused on company law, secretarial practice, corporate governance and regulatory compliance.',
    description:
      'Corporate Secretaryship prepares students for the compliance and governance functions that every registered company depends on. The curriculum tracks the Companies Act, securities regulation and secretarial practice, and maps directly onto the Company Secretary professional route.',
    highlights: [
      'Curriculum aligned with the Company Secretary (CS) professional route',
      'Secretarial practice, meeting procedure and statutory records',
      'Corporate governance, ethics and securities law',
      'Guest sessions from practising company secretaries',
    ],
    subjects: [
      'Company Law and Secretarial Practice',
      'Corporate Governance and Ethics',
      'Financial and Corporate Accounting',
      'Securities Law and Capital Markets',
      'Business Regulatory Framework',
      'Income Tax Law and Practice',
      'Human Resource Management',
      'Financial Management',
    ],
    careers: ['Company Secretary (after CS)', 'Compliance Officer', 'Corporate Legal Assistant', 'Governance Analyst', 'M.Com / MBA'],
    icon: 'ScrollText',
  },
  {
    slug: 'mcom',
    category: 'commerce',
    name: 'M.Com',
    degree: 'Master of Commerce',
    duration: '2 Years / 4 Semesters',
    mode: 'Full Time',
    intake: '30 Seats',
    eligibility: 'A pass in B.Com, B.Com (CS), BBA or an equivalent degree recognised by Thiruvalluvar University.',
    tagline: 'Advanced commerce and research.',
    excerpt:
      'A postgraduate programme in advanced accounting, financial management, research methodology and strategic business analysis.',
    description:
      'The M.Com programme deepens the analytical and research capability of commerce graduates. Students undertake a research project, present seminars and work through advanced accounting, financial management and managerial economics, the standard preparation for NET and SET, doctoral study and teaching.',
    highlights: [
      'Research methodology, project work and seminar presentations',
      'Advanced corporate accounting and financial management',
      'NET and SET orientation for aspiring academics',
      'Small cohorts with close faculty supervision',
    ],
    subjects: [
      'Advanced Financial Accounting',
      'Advanced Cost and Management Accounting',
      'Financial Management',
      'Managerial Economics',
      'Research Methodology',
      'Strategic Management',
      'International Business',
      'Project Work and Viva Voce',
    ],
    careers: ['Assistant Professor (after NET/SET)', 'Financial Analyst', 'Senior Accountant', 'Research Scholar', 'M.Phil / Ph.D'],
    icon: 'GraduationCap',
  },
  {
    slug: 'bba',
    category: 'humanities',
    name: 'BBA',
    degree: 'Bachelor of Business Administration',
    duration: '3 Years / 6 Semesters',
    mode: 'Full Time',
    intake: '40 Seats',
    eligibility: 'A pass in the Higher Secondary (+2) examination in any stream.',
    tagline: 'Management, strategy and enterprise.',
    excerpt:
      'A management degree built on marketing, human resources, finance and entrepreneurship, taught through cases, presentations and field study.',
    description:
      'BBA at ANR is deliberately practical. Students learn management functions through live cases, group presentations and organisational study, and complete an institutional training report, building the communication and decision-making confidence that recruiters look for.',
    highlights: [
      'Case-based teaching with regular presentation practice',
      'Institutional training and organisational study report',
      'Entrepreneurship development and business plan work',
      'Soft skills, aptitude and interview preparation',
    ],
    subjects: [
      'Principles of Management',
      'Marketing Management',
      'Human Resource Management',
      'Financial Management',
      'Business Communication',
      'Organisational Behaviour',
      'Entrepreneurship Development',
      'Business Research Methods',
    ],
    careers: ['Management Trainee', 'Marketing Executive', 'HR Executive', 'Operations Associate', 'MBA'],
    icon: 'Briefcase',
  },
  {
    slug: 'tamil',
    category: 'languages',
    name: 'Tamil',
    degree: 'Language Department',
    duration: 'Part I Language / All Programmes',
    mode: 'Full Time',
    intake: 'All Undergraduate Cohorts',
    eligibility: 'Offered as the Part I language across undergraduate programmes.',
    tagline: 'Literature, grammar and cultural heritage.',
    excerpt:
      'The Department of Tamil teaches classical and modern literature, grammar and composition, and leads the cultural life of the campus.',
    description:
      'The Department of Tamil carries the literary and cultural heritage of the region into the classroom. Alongside the Part I language curriculum, the department runs the Tamil Mandram, organises literary competitions and anchors the cultural calendar of the college.',
    highlights: [
      'Classical Sangam literature and modern Tamil writing',
      'Grammar, composition and translation practice',
      'Tamil Mandram: debates, oratory and literary competitions',
      'Leads cultural programmes and commemorative days',
    ],
    subjects: [
      'Sangam Literature',
      'Bhakti and Epic Literature',
      'Modern Tamil Literature',
      'Tamil Grammar (Ilakkanam)',
      'History of Tamil Literature',
      'Prose and Composition',
      'Translation Studies',
      'Communication in Tamil',
    ],
    careers: ['Teaching', 'Journalism and Publishing', 'Translation', 'Content and Media', 'M.A Tamil'],
    icon: 'BookOpen',
  },
  {
    slug: 'english',
    category: 'languages',
    name: 'English',
    degree: 'Language Department',
    duration: 'Part II Language / All Programmes',
    mode: 'Full Time',
    intake: 'All Undergraduate Cohorts',
    eligibility: 'Offered as the Part II language across undergraduate programmes.',
    tagline: 'Communication, literature and employability.',
    excerpt:
      'The Department of English develops professional communication, reading and writing skills alongside the study of literature in English.',
    description:
      'For students from rural Tamil-medium backgrounds, English fluency is often the single largest determinant of placement outcomes. The department pairs literature with a sustained communicative English programme, spoken practice, listening, functional writing and interview technique.',
    highlights: [
      'Communicative English and spoken practice sessions',
      'Functional writing: resumes, reports and correspondence',
      'Literature in English: poetry, prose, drama and fiction',
      'Interview technique and group discussion coaching',
    ],
    subjects: [
      'Communicative English',
      'Poetry and Drama',
      'Prose and Fiction',
      'English for Competitive Examinations',
      'Grammar and Usage',
      'Functional and Business Writing',
      'Listening and Speaking Skills',
      'Soft Skills and Interview Preparation',
    ],
    careers: ['Teaching', 'Content Writing', 'Customer Success', 'Corporate Communication', 'M.A English'],
    icon: 'MessageSquareQuote',
  },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
export const getProgramme = (slug) => programmes.find((p) => p.slug === slug)
export const programmesByCategory = (slug) => programmes.filter((p) => p.category === slug)
export const programmeImage = (slug) => programmeImages[slug] ?? fallbackImage
export const programmePath = (p) => `/programmes/${p.category}/${p.slug}`
export const categoryLabel = (slug) => getCategory(slug)?.label ?? ''
