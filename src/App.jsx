import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import ScrollToTop, { BackToTop } from './components/ui/ScrollToTop'
import Loading from './components/ui/Loading'
import { pageTransition } from './lib/motion'
import HomePage from './components/pages/Home/HomePage'

// The homepage ships in the initial bundle; every other route is code-split.
const AboutPage = lazy(() => import('./components/pages/About/AboutPage'))
const AcademicsPage = lazy(() => import('./components/pages/Academics/AcademicsPage'))
const DepartmentsPage = lazy(() => import('./components/pages/Academics/DepartmentsPage'))
const ProgrammesPage = lazy(() => import('./components/pages/Programmes/ProgrammesPage'))
const ProgrammeCategoryPage = lazy(() => import('./components/pages/Programmes/ProgrammeCategoryPage'))
const ProgrammeDetailPage = lazy(() => import('./components/pages/Programmes/ProgrammeDetailPage'))
const GalleryPage = lazy(() => import('./components/pages/Gallery/GalleryPage'))
const CommitteePage = lazy(() => import('./components/pages/Committee/CommitteePage'))
const CommitteeDetailPage = lazy(() => import('./components/pages/Committee/CommitteeDetailPage'))
const FacilitiesPage = lazy(() => import('./components/pages/Facilities/FacilitiesPage'))
const ContactPage = lazy(() => import('./components/pages/Contact/ContactPage'))
const AdmissionPage = lazy(() => import('./components/pages/Admission/AdmissionPage'))
const BlogsPage = lazy(() => import('./components/pages/Blogs/BlogsPage'))
const BlogPostPage = lazy(() => import('./components/pages/Blogs/BlogPostPage'))
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'))

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={location.pathname} id="main" {...pageTransition}>
          <Suspense fallback={<Loading />}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/academics" element={<AcademicsPage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/programmes" element={<ProgrammesPage />} />
              <Route path="/programmes/:category" element={<ProgrammeCategoryPage />} />
              <Route path="/programmes/:category/:slug" element={<ProgrammeDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/committee" element={<CommitteePage />} />
              <Route path="/committees" element={<CommitteePage />} />
              <Route path="/committees/:slug" element={<CommitteeDetailPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admission" element={<AdmissionPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
