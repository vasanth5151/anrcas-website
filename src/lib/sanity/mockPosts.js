/** Stand-in cover images until the college publishes its own posts. */
const unsplash = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`

/**
 * Fallback content used until the Sanity dataset is connected. The shape here
 * matches exactly what `queries.js` projects out of GROQ, so swapping in real
 * data requires no component changes.
 */
export const mockPosts = [
  {
    _id: 'mock-womens-day-2026',
    title: "Women's Day 2026 celebrated across the campus",
    slug: 'womens-day-2026',
    excerpt:
      'The Women Empowerment Committee marked International Women’s Day with a legal awareness session, a felicitation of women faculty and a cultural programme presented by students.',
    category: 'Events',
    publishedAt: '2026-03-08T09:30:00.000Z',
    author: 'Women Empowerment Committee',
    readingTime: 3,
    mainImage: { url: unsplash('1517457373958-b7bdd4587205', 1400), alt: "Women's Day celebration on campus" },
    seoTitle: "Women's Day 2026 at A.N. Radhakrishnan College of Arts and Science",
    seoDescription:
      'A legal awareness session, felicitation of women faculty and a student cultural programme marked International Women’s Day 2026 at ANR College.',
    body: [
      'International Women’s Day was observed on campus with a full morning of programmes organised by the Women Empowerment Committee. The session opened with an address on the constitutional and legal protections available to women, followed by a discussion on workplace rights and safe reporting.',
      'Women faculty members who have completed a decade of service were felicitated by the Principal. Students of the Tamil and English departments presented a short cultural programme built around the theme of education as the foundation of independence.',
      'The committee closed the morning by announcing a series of skill workshops for women students, covering digital literacy, financial planning and interview preparation, to run through the remainder of the semester.',
    ],
  },
  {
    _id: 'mock-laptop-distribution',
    title: 'Laptops issued to second year students',
    slug: 'laptops-issued-second-year-students',
    excerpt:
      'Under the Government of Tamil Nadu free laptop scheme, laptops were distributed to second year students of the college at a function held in the seminar hall.',
    category: 'Campus News',
    publishedAt: '2026-02-19T06:15:00.000Z',
    author: 'Office of the Principal',
    readingTime: 2,
    mainImage: { url: unsplash('1610484826967-09c5720778c7', 1400), alt: 'Students receiving laptops at the distribution function' },
    seoTitle: 'Free laptops distributed to second year students | ANR College',
    seoDescription:
      'Laptops were distributed to second year students of A.N. Radhakrishnan College of Arts and Science under the Government of Tamil Nadu scheme.',
    body: [
      'Laptops were distributed to the second year students of the college at a function held in the seminar hall, with faculty from every department present.',
      'Addressing the students, the Principal spoke about using the systems for coursework, project development and online learning resources rather than as devices for entertainment alone, and asked department heads to fold digital assignments into the semester plan.',
      'The Department of Computer Science has offered orientation sessions on basic maintenance, software installation and safe internet practice for students receiving a laptop for the first time.',
    ],
  },
  {
    _id: 'mock-social-welfare-awareness',
    title: 'Awareness programme conducted by the social welfare department',
    slug: 'social-welfare-awareness-programme',
    excerpt:
      'Officials from the district social welfare department conducted an awareness programme on welfare schemes, scholarships and legal protections available to students.',
    category: 'Activities',
    publishedAt: '2026-01-28T05:45:00.000Z',
    author: 'Student Welfare Committee',
    readingTime: 3,
    mainImage: { url: unsplash('1523580494863-6f3031224c94', 1400), alt: 'Awareness programme conducted on campus' },
    seoTitle: 'Social welfare awareness programme held at ANR College',
    seoDescription:
      'District social welfare officials conducted an awareness programme on scholarships, welfare schemes and legal protections for students at ANR College.',
    body: [
      'Officials from the district social welfare department visited the college to conduct an awareness programme for students across all departments.',
      'The session covered the scholarship schemes available to students from the region, the documentation required for each, and the timelines for application. Officials also outlined the legal protections and helplines available to students.',
      'The Student Welfare Committee has since opened a help desk at the administrative office to assist students with scholarship applications and document verification.',
    ],
  },
  {
    _id: 'mock-placement-drive',
    title: 'Campus placement drive concludes with strong participation',
    slug: 'campus-placement-drive-2026',
    excerpt:
      'The placement cell hosted a recruitment drive for final year commerce and computer science students, preceded by two weeks of aptitude and interview preparation.',
    category: 'Placements',
    publishedAt: '2026-01-12T04:30:00.000Z',
    author: 'Placement & Career Guidance Cell',
    readingTime: 3,
    mainImage: { url: unsplash('1517245386807-bb43f82c33c4', 1400), alt: 'Students attending a campus recruitment drive' },
    seoTitle: 'Campus placement drive 2026 | ANR College of Arts and Science',
    seoDescription:
      'The ANR College placement cell hosted a recruitment drive for final year commerce and computer science students following two weeks of preparation.',
    body: [
      'The Placement and Career Guidance Cell hosted a campus recruitment drive for final year students of the commerce and computer science departments.',
      'Preparation began a fortnight earlier with daily aptitude sessions, group discussion practice and one-to-one mock interviews conducted by faculty and alumni working in industry.',
      'Students who were not shortlisted received individual feedback on where their interview performance fell short, and have been enrolled in a follow-up training batch ahead of the next drive.',
    ],
  },
  {
    _id: 'mock-nss-camp',
    title: 'NSS unit completes seven-day special camp in Vadamavandal',
    slug: 'nss-special-camp-vadamavandal',
    excerpt:
      'Volunteers from the NSS unit spent a week on village cleanliness, tree planting, health awareness and a survey of local educational needs.',
    category: 'Activities',
    publishedAt: '2025-12-22T07:00:00.000Z',
    author: 'NSS Programme Officer',
    readingTime: 4,
    mainImage: { url: unsplash('1523240795612-9a054b0db644', 1400), alt: 'NSS volunteers during the special camp' },
    seoTitle: 'NSS special camp held at Vadamavandal | ANR College',
    seoDescription:
      'The NSS unit of ANR College completed a seven-day special camp covering cleanliness, tree planting, health awareness and an educational needs survey.',
    body: [
      'The NSS unit of the college completed its annual seven-day special camp in and around Vadamavandal, with volunteers drawn from every department.',
      'Work through the week covered village cleanliness, the planting and protection of saplings along the approach road, and a health awareness drive conducted with the primary health centre.',
      'Volunteers also carried out a household survey on schooling and dropout patterns in the surrounding hamlets. The findings have been shared with the local administration and will shape the unit’s outreach plan for the coming year.',
    ],
  },
  {
    _id: 'mock-symposium',
    title: 'Inter-departmental symposium brings together six colleges',
    slug: 'inter-departmental-symposium',
    excerpt:
      'Students from six neighbouring institutions took part in paper presentations, quizzes and technical events hosted by the departments of commerce and computer science.',
    category: 'Events',
    publishedAt: '2025-11-30T08:20:00.000Z',
    author: 'Department of Commerce',
    readingTime: 3,
    mainImage: { url: unsplash('1505373877841-8d25f7d46678', 1400), alt: 'Students presenting at the inter-collegiate symposium' },
    seoTitle: 'Inter-departmental symposium hosted at ANR College',
    seoDescription:
      'Six neighbouring institutions took part in the inter-departmental symposium hosted by ANR College of Arts and Science.',
    body: [
      'The departments of commerce and computer science jointly hosted an inter-collegiate symposium, with participation from six neighbouring institutions.',
      'Events included paper presentations, a business quiz, technical debugging rounds and a poster competition. Judging panels were drawn from faculty of the participating colleges.',
      'The organising committee has proposed making the symposium an annual fixture in the academic calendar, with a research paper track added for postgraduate students.',
    ],
  },
]

export const mockCategories = [...new Set(mockPosts.map((post) => post.category))]
