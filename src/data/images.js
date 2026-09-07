/**
 * Every photograph used across the site is registered here so the college can
 * swap in its own campus photography from a single file.
 *
 * Photographs supplied by the college live in `src/assets/images` and are
 * imported below. Where the college has not yet supplied a photograph for a
 * slot, an optimised stock frame stands in, replace the `unsplash(...)` call
 * with an import of the real file and update the alt text with it.
 *
 * <SmartImage /> renders a branded placeholder if any source fails to load.
 */
import campusCeremony from '../assets/images/11.webp'
import campusInauguration from '../assets/images/17.webp'
import campusComputerLab from '../assets/images/22.webp'
import campusGroupPhoto from '../assets/images/img-01.webp'
import campusStudents from '../assets/images/img-02.webp'
import founderPortrait from '../assets/images/founder-anr.webp'
import pathwayIllustration from '../assets/images/middle-image.webp'
import collegeLogo from '../assets/images/anrcas.webp'
import groupLogo from '../assets/images/meenakshi-group-logo.png'
import awardStar from '../assets/images/award-img-1.webp'
import awardMedal from '../assets/images/award-img-2.webp'

const unsplash = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`

const photo = (id, alt, w) => ({ src: unsplash(id, w), alt })
const local = (src, alt) => ({ src, alt })

/** Brand marks and figures supplied by the college. */
export const brand = {
  logo: local(collegeLogo, 'A.N. Radhakrishnan College of Arts and Science'),
  groupLogo: local(groupLogo, 'Meenakshi Group of Institutions, K.K. Nagar, Chennai'),
  founder: local(founderPortrait, 'A.N. Radhakrishnan, founder of the college'),
  awardStar: local(awardStar, ''),
  awardMedal: local(awardMedal, ''),
}

export const images = {
  heroPrimary: local(campusStudents, 'Students and faculty at a college programme on campus'),
  heroSecondary: photo(
    '1522202176988-66273c2fd55f',
    'Three students preparing together for a semester examination',
    900,
  ),
  heroTertiary: local(campusComputerLab, 'Students at work in the college computer laboratory'),

  aboutPrimary: local(campusComputerLab, 'Faculty and students during a computer laboratory session'),
  aboutSecondary: local(campusInauguration, 'Inauguration of a college programme by the management and faculty'),
  aboutTertiary: local(campusCeremony, 'A traditional ceremony held on the college campus'),

  admissionCta: photo(
    '1541339907198-e08756dedf3f',
    'Graduates throwing their caps in the air at the convocation ceremony',
    1800,
  ),
  faq: photo('1543269865-cbf427effbad', 'Students discussing coursework around a study table', 900),
  pathway: local(pathwayIllustration, 'Illustration of a student climbing a stack of books'),

  campus: [
    local(campusStudents, 'Students and faculty at an awareness programme on campus'),
    local(campusComputerLab, 'A computer laboratory session in progress'),
    local(campusInauguration, 'Inauguration of a college programme by the management and faculty'),
    local(campusCeremony, 'A traditional ceremony held on the college campus'),
    local(campusGroupPhoto, 'Students and staff gathered for a departmental group photograph'),
    photo('1461896836934-ffe607ba8211', 'Athletics practice ahead of the annual sports meet', 800),
  ],

  programmes: {
    'computer-science': local(campusComputerLab, 'Computer science students at work in the laboratory'),
    mathematics: photo('1509228468518-180dd4864904', 'Mathematical working written across a whiteboard', 900),
    bcom: photo('1454165804606-c3d57bc86b40', 'Commerce students reviewing financial statements', 900),
    'corporate-secretaryship': photo('1521791136064-7986c2920216', 'A corporate governance discussion in progress', 900),
    mcom: photo('1517245386807-bb43f82c33c4', 'Postgraduate students in a case study discussion', 900),
    bba: photo('1552581234-26160f608093', 'Business administration students presenting a group project', 900),
    tamil: photo('1519682337058-a94d519337bc', 'A collection of literature texts held for a reading session', 900),
    english: photo('1544716278-ca5e3f4abd8c', 'An open literature text and reading notes', 900),
  },

  facilities: {
    library: photo('1521587760476-6c12a4b040da', 'Reading hall of the college central library', 1100),
    computerLab: local(campusComputerLab, 'Students working at the computer laboratory workstations'),
    classrooms: photo('1580582932707-520aed937b7b', 'A well-lit classroom prepared for the morning session', 1100),
    laboratories: photo('1532094349884-543bc11b234d', 'Apparatus set up for a practical session in the laboratory', 1100),
    sports: photo('1461896836934-ffe607ba8211', 'The athletics track on the college sports ground', 1100),
    transport: photo('1544620347-c4fd4a3d5957', 'College transport serving the surrounding villages', 1100),
    canteen: photo('1555396273-367ea4eb4db5', 'The student canteen during the lunch break', 1100),
    digital: photo('1610484826967-09c5720778c7', 'A student attending a digital learning session', 1100),
    seminar: local(campusInauguration, 'A college function under way in the seminar hall'),
    support: photo('1544027993-37dbfe43562a', 'A mentoring conversation between faculty and student', 1100),
  },

  blogFallback: local(campusInauguration, 'College event coverage photograph'),
  pageHero: local(campusComputerLab, 'Students at work in the college computer laboratory'),
}

export { unsplash }
