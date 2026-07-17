import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribePhotoGallery } from "../firebase";
import type { PhotoItem } from "../types/photo";
import PhotoModal from "./PhotoModal";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  useEffect(() => {
    const unsubscribe = subscribePhotoGallery((items) => setPhotos(items));
    return unsubscribe;
  }, []);

  return (
    <section className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">gallery</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">A private wall of treasured moments</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-cream/75">
          Each photo is a hand-tucked memory in your scrapbook, warm and soft like a note you keep close.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setActivePhoto(photo)}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5, scale: 1.01 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#f7efe7]/95 p-4 text-left shadow-paper transition"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-driftwood/10 bg-white shadow-[inset_0_-20px_40px_rgba(200,180,160,0.08)]">
              <img src={photo.imageUrl} alt={photo.caption} className="h-72 w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1b151b]/85 via-transparent to-transparent" />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-driftwood/60">{photo.uploadedBy}</p>
              <p className="text-base font-semibold text-driftwood">{photo.caption}</p>
              <p className="text-sm text-driftwood/70">{photo.createdAt?.toDate?.().toLocaleDateString()}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <PhotoModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </section>
  );
}
