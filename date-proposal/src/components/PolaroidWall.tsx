import { motion } from "framer-motion";
import UploadPhotoSection from "./UploadPhotoSection";
import PhotoUpload from "./PhotoUpload";
import PhotoGallery from "./PhotoGallery";

export default function PolaroidWall() {
  return (
    <section id="polaroids" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">polaroid wall</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-blush sm:text-4xl">Pinned memories on a cork board</h2>
      </div>

      <UploadPhotoSection />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <PhotoUpload uploadedBy="guest" onUploadComplete={() => {}} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[2.25rem] border border-blush/10 bg-[rgba(20,10,18,0.45)] backdrop-blur-xl p-8 shadow-2xl shadow-black/10"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cream/60">soft notice</p>
          <h3 className="mt-3 text-2xl font-semibold text-cream">Your private gallery</h3>
          <p className="mt-4 text-sm leading-7 text-cream/75">
            The whole site is protected by the password you entered on the landing page. Add a photo whenever you like.
          </p>
        </motion.div>
      </div>

      <div className="mt-12">
        <PhotoGallery />
      </div>
    </section>
  );
}
