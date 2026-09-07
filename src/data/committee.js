/**
 * The committees and clubs constituted by the college. `slug` drives the URL
 * at /committees/:slug.
 *
 * `summary` is the line shown on the committee index card; `overview` and
 * `responsibilities` are the detail page. Membership is not listed here, add a
 * `members: [{ name, role, designation }]` array to a committee once the
 * college publishes its list for the academic year, and the detail page will
 * render it.
 */
export const committees = [
  {
    slug: 'anti-ragging-committee',
    name: 'Anti-Ragging Committee',
    icon: 'ShieldCheck',
    summary: 'Our college has an Anti-Ragging Committee for a safe environment, promoting respect and inclusivity.',
    overview:
      'The Anti-Ragging Committee exists to ensure compliance with the provisions of the Regulations on Curbing the Menace of Ragging in Higher Education (Gazette of India dated 4 July 2009), as well as the provisions of any law for the time being in force concerning ragging, and to monitor and oversee the performance of the Anti-Ragging Squad in the prevention of ragging in the institution.',
    responsibilities: [
      'Display the anti-ragging warning on noticeboards and obtain the prescribed undertaking from every student and parent at admission.',
      'Conduct surprise inspections of the campus, canteen, transport and common areas, particularly in the opening weeks of the academic year.',
      'Receive complaints in confidence, from the student or from anyone acting on their behalf.',
      'Enquire promptly into every complaint and recommend action to the Principal under the UGC regulations.',
      'Run orientation and awareness sessions on respectful conduct for incoming cohorts.',
    ],
    members: [
      { name: 'Dr. V. Ramu', role: 'Principal and Chairman' },
      { name: 'R. Srinivasan', role: 'Vice Principal' },
      { name: 'R. Kotteswari', role: 'Librarian' },
      { name: 'Pauline Anucia Mary', role: 'Assistant Professor' },
      { name: 'E. Sakthivel', role: 'System Analyst' },
      { name: 'M. Kalaivani', role: 'Office Assistant' },
      { name: 'A. Rani', role: 'House Keeping' },
    ],
  },
  {
    slug: 'anti-drugs-committee',
    name: 'Anti-Drugs Committee',
    icon: 'HeartHandshake',
    summary: 'Our college has an Anti-Drugs Committee to promote a healthy campus. Saying no to drugs, yes to life.',
    overview:
      'The Anti-Drugs Committee has been constituted to ensure a drug-free campus by imposing a total ban on the possession, consumption or use of drugs and alcohol by students of the college, within or outside the campus and hostels. Its duties include organising awareness programmes in the college and hostels with the help of government-authorised agencies and organisations, educating students on the ill-effects of drugs and alcohol, encouraging peer policing among students against the use of drugs, and reporting any noticed use of drugs by students to the Anti-Drugs Committee / Students Welfare Office.',
    responsibilities: [
      'Maintain a drug-free campus and a drug-free perimeter around the college.',
      'Conduct awareness programmes, rallies and pledge-taking sessions with the departments and the NSS unit.',
      'Work with the district administration and the police on de-addiction and awareness drives.',
      'Provide confidential counselling and referral for any student who seeks help.',
      'Report and act on any instance of possession, use or supply within the campus.',
    ],
    members: [
      { name: 'Dr. V. Ramu', role: 'Principal and Chairman' },
      { name: 'R. Srinivasan', role: 'Vice Principal' },
      { name: 'Dr. V.S. Sheela', role: 'Head & Assistant Professor' },
      { name: 'M. Arun Prasath', role: 'Assistant Professor' },
      { name: 'M. Kalaivani', role: 'Office Assistant' },
    ],
  },
  {
    slug: 'discipline-committee',
    name: 'Discipline Committee',
    icon: 'Scale',
    summary: 'Our college has a Discipline Committee to maintain order and decorum, upholding values, promoting responsible behavior.',
    overview:
      'The Discipline Committee maintains the discipline, dignity, decorum and rapport of the institute, controlling students through rules and regulations and channelling their youthful energy into a positive and creative direction, and promoting good manners, personality, character and civility.',
    responsibilities: [
      'Make rules and regulations as per the disciplinary requirement.',
      'Make students aware of the standards of discipline expected of them.',
      'Ensure students follow the disciplinary rules.',
      'Take disciplinary action against any instance of misconduct.',
      'Coordinate with the legal cell of People’s Group in case of any major act of indiscipline.',
    ],
    members: [
      { name: 'Dr. V. Ramu', role: 'Principal and Chairman' },
      { name: 'R. Srinivasan', role: 'Vice Principal' },
      { name: 'R. Kotteswari', role: 'Librarian' },
      { name: 'Pauline Anucia Mary', role: 'Assistant Professor' },
      { name: 'E. Sakthivel', role: 'System Analyst' },
      { name: 'M. Kalaivani', role: 'Office Assistant' },
      { name: 'A. Rani', role: 'House Keeping' },
    ],
  },
  {
    slug: 'academic-committee',
    name: 'Academic Committee',
    icon: 'GraduationCap',
    summary: 'Our college has an Academic Committee to enhance learning excellence, fostering innovation and academic growth.',
    overview:
      'The Academic Committee consists of the Principal and the Heads of all departments of the institution. The committee is responsible for overseeing various aspects of academic affairs, including formulating academic policies, programme evaluation, considering student appeals, faculty evaluations, accreditation and preparing the institutional calendar. It plays a crucial role in ensuring the quality and integrity of academic programmes and policies within the institution.',
    responsibilities: [
      'Prepare the academic calendar and the semester teaching plan for every department.',
      'Monitor syllabus coverage, internal assessment and the conduct of model examinations.',
      'Review university results department by department and plan remedial coaching where needed.',
      'Approve seminars, guest lectures, industrial visits and value-added courses.',
      'Identify slow learners and advanced learners early and put the appropriate support in place.',
    ],
    members: [
      { name: 'Dr. V. Ramu', role: 'Principal and Chairman' },
      { name: 'R. Srinivasan', role: 'Vice Principal' },
      { name: 'Dr. V.S. Sheela', role: 'Assistant Professor & Head' },
      { name: 'M. Dharanisri', role: 'Assistant Professor & Head' },
      { name: 'A. Pauline Anucia Mary', role: 'Assistant Professor & Head' },
      { name: 'B. Alen Gamber', role: 'Assistant Professor & Head' },
      { name: 'S. Samraj', role: 'Assistant Professor & Head' },
    ],
  },
  {
    slug: 'placement-committee',
    name: 'Placement Committee',
    icon: 'Briefcase',
    summary: 'Our college has a Placement Committee to bridge campus and career, connecting students to dream opportunities.',
    overview:
      'A full-time experienced placement officer, together with other faculty members of the college and a team of trained students, works towards realising the objective of making students competent for the dynamic requirements of society. The aim of the placement cell is to pick and place all our students with quality recruiters based on their talent and skill. As a social commitment to the society, the placement cell takes initiatives to host and coordinate pooled campus recruitment drives of different companies for our students.',
    responsibilities: [
      'Run aptitude, soft-skills and communication training through the pre-final and final years.',
      'Conduct mock interviews, group discussions and résumé workshops.',
      'Invite recruiting partners for campus and pooled campus drives.',
      'Coordinate internships and industrial training with the departments.',
      'Guide students towards higher study and competitive examinations, and maintain the placement record.',
    ],
    members: [
      { name: 'B. Alen Gamber', role: 'Assistant Professor & Head' },
      { name: 'E. Sakthivel', role: 'System Administrator' },
    ],
  },
  {
    slug: 'women-welfare-committee',
    name: 'Women Welfare Committee',
    icon: 'Users',
    summary: 'Women Welfare Committee, which empowers women and ensures safety.',
    overview:
      'The Women Welfare Committee is a platform that gives every woman in the college community the opportunity to express concerns related to the betterment of the community and the institute, in particular matters concerning the welfare of women. The WWC addresses and takes care of welfare programmes and other concerns related to women students, faculty and staff members.',
    responsibilities: [
      'Work towards bringing the requirements of women on campus to the notice of the authorities.',
      'Initiate special programmes such as "Friend in Distress" to advise on available courses of action to any woman on campus who may be in distress.',
      'If the woman so chooses, facilitate access to appropriate doctors, counsellors, the legal cell and/or the Presiding Officer, ICC.',
      'Arrange for a Women’s Healthcare/Cancer Prevention Camp.',
      'Arrange for programmes on basic education for field women employees.',
      'Arrange for programmes on the financial empowerment of women.',
      'Organise a yearly stall with handicraft/food stalls.',
      'Arrange for meditation, yoga, activity and art classes, given by women for women.',
      'Help each other as a community in challenging times.',
    ],
    members: [
      { name: 'Dr. V. Ramu', role: 'Principal and Chairman' },
      { name: 'R. Srinivasan', role: 'Vice Principal' },
      { name: 'Dr. V.S. Sheela', role: 'Assistant Professor & Head' },
      { name: 'M. Dharanisri', role: 'Assistant Professor & Head' },
      { name: 'A. Pauline Anucia Mary', role: 'Assistant Professor & Head' },
      { name: 'S. Samraj', role: 'Assistant Professor & Head' },
    ],
  },
  {
    slug: 'internal-complaints-committee',
    name: 'Internal Complaints Committee',
    icon: 'ClipboardCheck',
    summary: 'Our college has an Internal Complaint Committee, addressing grievances, ensuring fairness.',
    overview:
      'The Internal Complaints Cell of this institution serves as a critical mechanism for addressing grievances related specifically to discrimination and other forms of misconduct within the academic community. Focusing specifically on the well-being and safety of women staff, the ICC plays a pivotal role in creating a conducive work environment that fosters dignity, respect and equality.',
    responsibilities: [
      'Ensuring a safe and supportive environment: create an environment where women staff feel safe and supported to raise concerns without fear of reprisal, fostering a culture where harassment and discrimination are not tolerated and individuals are empowered to speak up.',
      'Promoting gender equality: address systemic issues that disproportionately affect women in academia, including tackling gender bias, ensuring equitable access to opportunities and supporting the advancement of women in their careers.',
      'Facilitating fair and transparent processes: uphold fairness and transparency in investigating complaints, providing clear guidelines, conducting impartial investigations and ensuring all parties are treated with respect and dignity.',
    ],
    members: [
      { name: 'Dr. V. Ramu', role: 'Principal and Chairman' },
      { name: 'Dr. V.S. Sheela', role: 'Assistant Professor & Head' },
      { name: 'A. Pauline Anucia Mary', role: 'Assistant Professor & Head' },
      { name: 'B. Alen Gamber', role: 'Assistant Professor & Head' },
      { name: 'Dr. Parimala', role: 'Medical Officer' },
    ],
  },
  {
    slug: 'nirf-committee',
    name: 'National Institutional Ranking Framework',
    icon: 'LineChart',
    summary: 'Our college participates in NIRF, striving for excellence, benchmarking quality, driving growth.',
    overview:
      'The National Institutional Ranking Framework (NIRF) was approved by the MHRD and launched by the Honourable Minister of Human Resource Development on 29 September 2015. This framework outlines a methodology to rank institutions across the country. The committee prepares and submits the college’s data for the framework, and uses its parameters as an internal benchmark for improvement.',
    responsibilities: [
      'Collect and verify institutional data on teaching, learning and resources.',
      'Compile data on research, professional practice and graduation outcomes.',
      'Prepare and submit the NIRF return within the notified schedule.',
      'Analyse the parameter-wise scores and report the findings to the management.',
      'Recommend measurable improvements against each parameter for the coming year.',
    ],
    members: [{ name: 'A. Pauline Anucia Mary', role: 'Head & Assistant Professor' }],
  },
  {
    slug: 'red-ribbon-club',
    name: 'Red Ribbon Club',
    icon: 'LifeBuoy',
    summary: 'Our college has a Red Ribbon Club, spreading AIDS awareness, promoting health and well-being always matters.',
    overview:
      'The Red Ribbon Club is a movement started by the Government of India in schools and colleges through which students spread awareness of HIV/AIDS. The colour red was chosen as it symbolises blood and the idea of passion, not anger, but love. The Red Ribbon is the international symbol of HIV/AIDS awareness: wearing one shows care and concern for those living with HIV/AIDS, and support for the organisations that care for them. Motto of the RRC: "Let’s unite for a better India."',
    responsibilities: [
      'Reduce new HIV infection among youth by raising their risk perception through awareness on sex, sexuality and HIV & AIDS.',
      'Induce among youth the spirit to help and support people living with HIV/AIDS (PLHIV), thereby reducing stigma and discrimination against them.',
      'Motivate youth and build their capacity as peer educators and change agents by developing their skills in leadership, negotiation and team building.',
      'Promote voluntary, non-remunerated blood donation among youth.',
    ],
    members: [{ name: 'R. Kotteswari', role: 'Librarian' }],
  },
  {
    slug: 'cultural-committee',
    name: 'Cultural Committee',
    icon: 'Music',
    summary: 'Our college has a vibrant Cultural Committee, celebrating diversity, showcasing talent.',
    overview:
      'The Cultural Committee is one of the most dedicated and innovative platforms in the college. Its main purpose is to find inner talent and capabilities, offering students plenty of opportunities across a wide range of departments to choose from. The committee is more focused on growing and learning than any other aspect: social and cultural activities not only help students identify their talent but also assist them in developing themselves in a desired field, improving skills such as organisational ability, presentation, leadership and interpersonal communication.',
    responsibilities: [
      'Plan and conduct the college annual day and cultural festival.',
      'Organise literary, fine arts, music and dance competitions through the year.',
      'Coordinate observances of national and state days and of festivals on the campus.',
      'Select and prepare teams for inter-collegiate cultural competitions.',
      'Support the departmental associations in running their own events.',
    ],
    members: [
      { name: 'A. Pauline Anucia Mary', role: 'Assistant Professor & Head' },
      { name: 'M. Dharanisri', role: 'Assistant Professor & Head' },
      { name: 'V. Manikandan', role: 'Assistant Professor' },
    ],
  },
  {
    slug: 'sc-st-scholarship-committee',
    name: 'SC/ST Scholarship Committee',
    icon: 'BookOpenCheck',
    summary:
      'Our college is committed to inclusion and equity, empowering SC/ST students through guidance, support and opportunities.',
    overview:
      'The committee makes sure that every eligible student receives the government scholarships and welfare support they are entitled to, and that no student’s studies are interrupted for want of a form filed on time.',
    responsibilities: [
      'Provide guidance on academic, financial and personal matters to support the holistic development and well-being of SC/ST students.',
      'Assist SC/ST students in applying for government and institutional scholarships, grants and financial aid programmes.',
      'Establish a platform for SC/ST students to voice concerns or grievances related to discrimination, harassment or bias, and address these issues in a fair and timely manner.',
    ],
    members: [{ name: 'Mr. M. Arunprasath', role: 'Assistant Professor' }],
  },
]

export const getCommittee = (slug) => committees.find((committee) => committee.slug === slug)
