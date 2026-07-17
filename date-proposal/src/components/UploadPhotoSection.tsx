import { Upload } from "lucide-react";

export default function UploadPhotoSection() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[rgba(255,246,236,0.08)] p-6 shadow-paper">
      <div className="mb-5 flex items-center justify-between gap-4 rounded-[2rem] border border-blush/10 bg-white/10 px-5 py-4 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cream/60">photo area</p>
          <h3 className="mt-2 text-xl font-semibold text-cream">Upload a memory</h3>
        </div>
        <Upload className="h-6 w-6 text-blush/70" />
      </div>
      <div className="space-y-4">
        <p className="text-sm leading-6 text-cream/80">This wall is secured by the site password. Add a new photo below whenever you're ready.</p>
        <p className="rounded-3xl border border-blush/10 bg-white/10 px-4 py-4 text-sm text-cream shadow-sm">
          All uploads stay private inside this gift.
        </p>
      </div>
    </div>
  );
}
