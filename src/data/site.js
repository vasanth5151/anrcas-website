export const site = {
  name: 'A.N. Radhakrishnan College of Arts and Science',
  shortName: 'ANR College of Arts & Science',
  initials: 'ANR',
  tagline: 'Ignite. Rise. Curiosity. Explore. Education.',
  established: '2022',
  url: import.meta.env.VITE_SITE_URL || 'https://www.anrcas.edu.in',
  approvals: [
    'Approved by the Government of Tamil Nadu',
    'Affiliated to Thiruvalluvar University, Vellore',
  ],
  address: {
    lines: ['A.N. Radhakrishnan College of Arts and Science', 'Vadamavandal', 'Thiruvannamalai District, Tamil Nadu'],
    short: 'Vadamavandal, Thiruvannamalai District',
  },
  phones: ['04182-247518', '+91 8939804020'],
  email: 'admin@anrcas.edu.in',
  // The college's own Google Maps listing.
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.8964834132053!2d79.5937687!3d12.7852308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c583fea1a713%3A0xbce9e5fe619cce2e!2sANR%20COLLEGE%20OF%20ARTS%20AND%20SCIENCE!5e0!3m2!1sen!2sin!4v1788609493312!5m2!1sen!2sin',
  mapLink:
    'https://www.google.com/maps/dir/?api=1&destination=ANR+College+of+Arts+and+Science+Vembakkam+Main+Road+Tamil+Nadu+604410',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/people/ANR-College-Of-Arts-Science/61580819999002/', icon: 'Facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/anrcas_edu/', icon: 'Instagram' },
    { label: 'YouTube', href: 'https://www.youtube.com/@anrcas', icon: 'Youtube' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/a-n-r-college-of-arts-science/?viewAsMember=true', icon: 'Linkedin' },
  ],
}

/**
 * Single source of truth for the navbar, the mobile menu and the footer.
 * `children` renders as a dropdown (desktop) / accordion (mobile).
 */
export const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Blogs', href: '/blogs' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [{ label: 'Departments', href: '/departments' }],
  },
  {
    label: 'Programmes',
    href: '/programmes',
    mega: true,
    groups: [
      {
        label: 'Science',
        href: '/programmes/science',
        items: [
          { label: 'Computer Science', href: '/programmes/science/computer-science' },
          { label: 'Mathematics', href: '/programmes/science/mathematics' },
        ],
      },
      {
        label: 'Commerce',
        href: '/programmes/commerce',
        items: [
          { label: 'B.Com', href: '/programmes/commerce/bcom' },
          { label: 'Corporate Secretaryship', href: '/programmes/commerce/corporate-secretaryship' },
          { label: 'M.Com', href: '/programmes/commerce/mcom' },
        ],
      },
      {
        label: 'Humanities',
        href: '/programmes/humanities',
        items: [{ label: 'BBA', href: '/programmes/humanities/bba' }],
      },
      {
        label: 'Languages',
        href: '/programmes/languages',
        items: [
          { label: 'Tamil', href: '/programmes/languages/tamil' },
          { label: 'English', href: '/programmes/languages/english' },
        ],
      },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Committee', href: '/committee' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Contact', href: '/contact' },
]
