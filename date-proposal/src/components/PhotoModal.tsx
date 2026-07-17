import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { PhotoItem } from "../types/photo";

interface PhotoModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-dusk/90" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="relative mx-auto mt-16 flex max-w-5xl flex-col gap-6 rounded-[2.5rem] border border-white/10 bg-[#f7efe7] p-6 shadow-soft lg:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-driftwood/15 bg-white text-driftwood transition hover:bg-blush/10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[2rem] border border-driftwood/10 bg-[#fff8f4] shadow-[inset_0_12px_40px_rgba(255,235,225,0.25)]">
              <img src={photo.imageUrl} alt={photo.caption} className="h-full w-full object-cover" />
            </div>
            <div className="space-y-5 rounded-[2rem] border border-driftwood/10 bg-[#fff2eb] p-6 text-driftwood shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-driftwood/60">memory note</p>
                <h2 className="mt-3 text-3xl font-semibold text-driftwood">{photo.caption}</h2>
              </div>
              <div className="space-y-3 rounded-[1.75rem] bg-white/90 p-5 shadow-sm">
                <p className="text-sm font-semibold text-driftwood/70">Uploaded by</p>
                <p className="text-base text-driftwood">{photo.uploadedBy}</p>
                <p className="text-sm font-semibold text-driftwood/70">Date</p>
                <p className="text-base text-driftwood">{photo.createdAt?.toDate?.().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
