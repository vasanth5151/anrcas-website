/**
 * Admission content: the introduction, the courses offered with their
 * sanctioned strength, the eligibility criteria prescribed by Thiruvalluvar
 * University, and the admission council.
 */

export const admissionIntro = [
  {
    title: 'Admission',
    body: 'The welfare and advancement of our students, and of the college, are the top priorities of a well-organised management system. The efficient management and administration of the college is aided by a Technical Advisory Committee, a Managing Committee and a Governing Council. These bodies establish the policies and programmes, and keep an eye on advancement. On academic matters, the technical advisory council makes suggestions and the managing committee implements those recommendations in every way.',
  },
  {
    title: 'Admission portal for all first year undergraduate (UG) courses',
    body: 'Admissions are open for all first year undergraduate courses. Students who have passed in all subjects in their 12th standard are eligible for first year admission in the Arts, Science and Commerce programmes. You can also visit the college for any guidance or help required related to admission.',
  },
]

/** Courses offered, with the strength sanctioned for each. */
export const coursesOffered = {
  undergraduate: [
    { name: 'B.Sc, Computer Science', strength: 'Allocated strength: 50' },
    { name: 'B.Sc, Mathematics', strength: 'Sanctioned strength: 70' },
    { name: 'B.Com (General)', strength: 'Sanctioned strength: 70' },
    { name: 'B.Com (Corporate Secretaryship)', strength: 'Sanctioned strength: 70' },
    { name: 'BBA', strength: 'Sanctioned strength: 70' },
    { name: 'B.A, Tamil', strength: 'Sanctioned strength: 70' },
  ],
  postgraduate: [{ name: 'M.Com', strength: 'Sanctioned strength: 40' }],
}

/** Eligibility as prescribed by the university, department by department. */
export const eligibilityCriteria = [
  {
    department: 'B.Sc Computer Science',
    criteria:
      'A candidate seeking admission to the first year of the UG degree course should have passed the Higher Secondary Course Examination (Academic or Vocational) conducted by the Government of Tamil Nadu with Mathematics, Business Mathematics, Statistics or Computer Science as a subject, or an examination of any other university accepted as equivalent thereto by the Syndicate, subject to such other conditions as may be prescribed. Such candidates shall be permitted to take the B.Sc degree examination of this university after the completion of the course of three academic years in this university or in colleges affiliated to it, and shall qualify for the B.Sc degree.',
  },
  {
    department: 'B.Sc Mathematics',
    criteria:
      'Candidates for admission to the first year of the degree course of Bachelor of Science shall be required to have passed the Higher Secondary Examination (Academic or Vocational stream) conducted by the Government of Tamil Nadu with Mathematics as a subject of study, or an examination accepted as equivalent thereto by the Syndicate of Thiruvalluvar University, subject to such other conditions as may be prescribed.',
  },
  {
    department: 'B.Com (General)',
    criteria:
      'Candidates for admission to the first year of the degree course of Bachelor of Commerce shall be required to have passed the Higher Secondary Course Examination (Academic or Vocational stream) conducted by the Government of Tamil Nadu with Mathematics, Business Mathematics, Statistics or Computer Science as a subject, or an examination of any other university accepted as equivalent thereto by the Syndicate, subject to such other conditions as may be prescribed. Such candidates shall be permitted to take the degree examination of this university after the completion of the course of three academic years in this university or in colleges affiliated to it.',
  },
  {
    department: 'B.Com (Corporate Secretaryship)',
    criteria:
      'Candidates for admission to the first year of the degree course of Bachelor of Commerce (Corporate Secretaryship) shall be required to have passed the Higher Secondary Course Examination (Academic or Vocational stream) conducted by the Government of Tamil Nadu, or an examination of any other university accepted as equivalent thereto by the Syndicate, subject to such other conditions as may be prescribed.',
  },
  {
    department: 'BBA',
    criteria:
      'Candidates for admission to the first year of the degree course of Bachelor of Business Administration shall be required to have passed the Higher Secondary Course Examination (Academic or Vocational stream) conducted by the Government of Tamil Nadu, or an examination accepted as equivalent thereto by the Syndicate of Thiruvalluvar University, subject to such other conditions as may be prescribed.',
  },
  {
    department: 'B.A Tamil',
    criteria:
      'Candidates for admission to the first year of the degree course of Bachelor of Arts in Tamil shall be required to have passed the Higher Secondary Course Examination (Academic or Vocational stream) conducted by the Government of Tamil Nadu with Tamil as a subject of study, or an examination accepted as equivalent thereto by the Syndicate of Thiruvalluvar University, subject to such other conditions as may be prescribed.',
  },
  {
    department: 'M.Com',
    criteria:
      'A candidate who has passed B.Com, B.Com (Corporate Secretaryship), B.C.S., B.B.A., B.Com (Bank Management), B.A (Co-operation), B.A (Economics), B.A (Corporate Economics), B.Sc Mathematics, B.Sc (Computer Science), B.C.A. or B.Sc (ISM) with any two core papers offered at the B.Com level of this university, or an examination of any other university accepted by the Syndicate as equivalent thereto, shall be permitted to take the Master of Commerce degree examination of this university for a course of two academic years in the university department or in colleges affiliated to Thiruvalluvar University.',
  },
]

export const admissionCouncil = {
  intro:
    'The Admission Council plays a critical role in shaping the institution’s admission policies and procedures. These are some of its key functions.',
  functions: [
    {
      title: 'Developing admission policies',
      icon: 'ScrollText',
      detail:
        'The council helps create and refine admission policies, ensuring they align with the college’s goals and standards.',
    },
    {
      title: 'Setting admission criteria',
      icon: 'ClipboardCheck',
      detail:
        'The council determines the criteria for admission, including academic requirements, entrance examinations and other relevant factors.',
    },
    {
      title: 'Reviewing applications',
      icon: 'Search',
      detail:
        'The council reviews applications, assessing each candidate’s qualifications and potential for success.',
    },
    {
      title: 'Making admission decisions',
      icon: 'CheckCircle2',
      detail: 'Based on the review process, the council makes informed decisions about which applicants to admit.',
    },
    {
      title: 'Ensuring diversity and inclusion',
      icon: 'Users2',
      detail:
        'The council strives to create a diverse and inclusive student body, considering factors such as socioeconomic background, community and geography.',
    },
    {
      title: 'Monitoring admission trends',
      icon: 'LineChart',
      detail:
        'The council analyses admission trends, identifying areas for improvement and making data-driven decisions.',
    },
    {
      title: 'Communicating with stakeholders',
      icon: 'MessageSquareQuote',
      detail:
        'The council informs stakeholders (applicants, parents and faculty) about admission policies, procedures and decisions.',
    },
    {
      title: 'Transparency and accountability',
      icon: 'Scale',
      detail:
        'The council promotes transparency and accountability in the admission process, so that decisions are made in the best interest of the college and its students.',
    },
  ],
  composition: [
    {
      title: 'Faculty members',
      icon: 'GraduationCap',
      detail: 'Heads of department and senior teaching staff, who assess academic eligibility programme by programme.',
    },
    {
      title: 'Admission staff',
      icon: 'ClipboardCheck',
      detail: 'The office staff who receive applications, verify documents and maintain the admission register.',
    },
    {
      title: 'Administrators',
      icon: 'Building2',
      detail: 'The Principal and management representatives, who approve policy and sanction the final list.',
    },
    {
      title: 'Student representatives',
      icon: 'Users',
      detail: 'Senior students who bring the applicant’s perspective to the counselling and orientation process.',
    },
  ],
}
