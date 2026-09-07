/**
 * Campus facilities and their photographs. Files live in
 * `src/assets/facilities`, add a photograph there, import it below and drop it
 * into the relevant facility's `photos` array.
 */
import classroom1 from '../assets/facilities/classroom-1.webp'
import classroom2 from '../assets/facilities/classroom-2.webp'
import classroom3 from '../assets/facilities/classroom-3.webp'
import classroom4 from '../assets/facilities/classroom-4.webp'
import classroom5 from '../assets/facilities/classroom-5.webp'
import classroom6 from '../assets/facilities/classroom-6.webp'
import classroom7 from '../assets/facilities/classroom-7.webp'
import classroom8 from '../assets/facilities/classroom-8.webp'
import hostel1 from '../assets/facilities/hostal-1.webp'
import hostel2 from '../assets/facilities/hostal-2.webp'
import hostel3 from '../assets/facilities/hostal-3.webp'
import lab1 from '../assets/facilities/lab1.webp'
import lab2 from '../assets/facilities/lab2.webp'
import lab3 from '../assets/facilities/lab3.webp'
import library1 from '../assets/facilities/lib1.webp'
import library2 from '../assets/facilities/lib2.webp'
import library3 from '../assets/facilities/lib3.webp'
import sports1 from '../assets/facilities/sp1.webp'
import sports2 from '../assets/facilities/sp2.webp'
import sports3 from '../assets/facilities/sp5.webp'
import sports4 from '../assets/facilities/sp6.webp'
import sports5 from '../assets/facilities/sp8.webp'
import sports6 from '../assets/facilities/spt4.webp'
import transport from '../assets/facilities/transport.webp'
import diningHall from '../assets/facilities/dininghall.webp'
import reception from '../assets/facilities/reception1.webp'
import helpDesk from '../assets/facilities/helpdesk.webp'
import temple from '../assets/facilities/temple.webp'

const photo = (src, alt) => ({ id: src, src, full: src, alt, ratio: 'natural' })

export const facilities = [
  {
    slug: 'classrooms',
    name: 'Class Rooms',
    icon: 'Presentation',
    summary: 'Naturally lit, well-ventilated rooms sized for genuine interaction.',
    description:
      'Classrooms are sized so that teaching stays conversational rather than one-directional. Every room is naturally lit and fully ventilated, and departmental rooms sit adjacent to the relevant staff rooms so a student can find a teacher between hours.',
    points: [
      'Comfortable cohort sizes',
      'Natural light and full ventilation',
      'Departmental rooms beside staff rooms',
      'Rooms equipped for digital presentation',
    ],
    photos: [
      photo(classroom1, 'A class in progress in one of the college classrooms'),
      photo(classroom2, 'Students at work during a classroom session'),
      photo(classroom3, 'A well-lit classroom with students seated for a lecture'),
      photo(classroom4, 'Faculty teaching at the board during a session'),
      photo(classroom5, 'Students in discussion during a classroom session'),
      photo(classroom6, 'A lecture under way in a departmental classroom'),
      photo(classroom7, 'Students working through an exercise in class'),
      photo(classroom8, 'A full classroom during the morning session'),
    ],
  },
  {
    slug: 'hostel',
    name: 'Hostel',
    icon: 'Building2',
    summary: 'Residential accommodation for students who travel from beyond the transport routes.',
    description:
      'The hostel houses students whose homes lie beyond the reach of the college transport, with supervised study hours, mess facilities and a warden on the premises.',
    points: ['Separate blocks with warden supervision', 'Supervised evening study hours', 'Mess and dining facility', 'Close to the academic blocks'],
    photos: [
      photo(hostel1, 'The college hostel block seen from the approach road'),
      photo(hostel2, 'Entrance to the hostel building'),
      photo(hostel3, 'The hostel block on the college campus'),
    ],
  },
  {
    slug: 'computer-laboratory',
    name: 'Computer Laboratory',
    icon: 'Cpu',
    summary: 'Networked workstations with supervised open-lab hours for every cohort.',
    description:
      'The computer laboratory supports programming practical work, computerised accounting and project development. Systems are networked with broadband access, and lab assistants supervise open hours outside scheduled sessions.',
    points: [
      'Networked systems with broadband',
      'Programming and accounting software',
      'Supervised open-lab hours',
      'Project development support',
    ],
    photos: [
      photo(lab1, 'Students at work in the computer laboratory'),
      photo(lab2, 'A practical session under way in the computer laboratory'),
      photo(lab3, 'Networked workstations in the computer laboratory'),
    ],
  },
  {
    slug: 'library',
    name: 'Library',
    icon: 'Library',
    summary: 'A quiet, well-stocked reading environment at the centre of academic life.',
    description:
      'The central library holds textbooks, reference volumes, journals and competitive examination material across every discipline taught at the college, with a separate reference section and a reading hall that stays open through the working day.',
    points: [
      'Open through college hours',
      'Reference and lending sections',
      'Journals and daily newspapers',
      'Competitive examination collection',
    ],
    photos: [
      photo(library1, 'The reading hall of the college library'),
      photo(library2, 'A student browsing the library stacks'),
      photo(library3, 'Shelves and reading tables in the college library'),
    ],
  },
  {
    slug: 'sports',
    name: 'Sports & Games',
    icon: 'Trophy',
    summary: 'An open ground for athletics and team games, with indoor games on the campus.',
    description:
      'The college ground carries the annual sports meet, inter-departmental tournaments and daily practice. Indoor games are available on the campus through the day for students between hours.',
    points: [
      'Open ground for athletics and team games',
      'Inter-departmental tournaments each year',
      'Indoor games on the campus',
      'Physical education staff on hand',
    ],
    photos: [
      photo(sports1, 'Students playing on the college sports ground'),
      photo(sports2, 'A game in progress on the college ground'),
      photo(sports3, 'Students at an indoor games table on the campus'),
      photo(sports4, 'Practice under way on the college ground'),
      photo(sports5, 'Students on the sports ground during a tournament'),
      photo(sports6, 'An indoor games session on the campus'),
    ],
  },
  {
    slug: 'transport',
    name: 'Transport',
    icon: 'Bus',
    summary: 'College buses serving the villages around Vadamavandal.',
    description:
      'College transport runs on fixed routes through the surrounding villages, so that distance from the campus is never the reason a student leaves a course. Routes and timings are published at the start of every academic year.',
    points: ['Fixed routes through the surrounding villages', 'Morning and evening services', 'Concessional fares', 'Routes reviewed every year'],
    photos: [photo(transport, 'College buses parked on the campus')],
  },
  {
    slug: 'dining-hall',
    name: 'Dining Hall',
    icon: 'UtensilsCrossed',
    summary: 'A clean dining hall serving students and staff through the working day.',
    description:
      'The dining hall serves hostel residents and day scholars alike, with hygienic preparation and seating within the campus so that no student needs to leave for a meal.',
    points: ['Hygienic preparation and service', 'Seating within the campus', 'Serves hostel residents and day scholars'],
    photos: [photo(diningHall, 'The dining hall on the college campus')],
  },
  {
    slug: 'reception-and-help-desk',
    name: 'Reception & Help Desk',
    icon: 'LifeBuoy',
    summary: 'The first point of contact for students, parents and visitors.',
    description:
      'The reception and help desk handle admission enquiries, certificates, fee queries and visitor guidance, and direct students to the right department or committee.',
    points: ['Admission and certificate enquiries', 'Fee and scholarship guidance', 'Visitor assistance', 'Open through office hours'],
    photos: [
      photo(reception, 'The reception at the entrance to the college'),
      photo(helpDesk, 'Staff at the college help desk assisting students'),
    ],
  },
  {
    slug: 'temple',
    name: 'Campus Temple',
    icon: 'Landmark',
    summary: 'A quiet corner of the campus kept for prayer and reflection.',
    description:
      'The campus temple is open to students and staff through the day, and is the setting for the observances that mark the college year.',
    points: ['Open through the day', 'Setting for campus observances'],
    photos: [photo(temple, 'The temple on the college campus')],
  },
]
