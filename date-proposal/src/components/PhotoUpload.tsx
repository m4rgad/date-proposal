import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { uploadPhotoFile, savePhotoMetadata } from "../firebase";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface PhotoUploadProps {
  uploadedBy?: string;
  onUploadComplete: () => void;
}

export default function PhotoUpload({ uploadedBy = "guest", onUploadComplete }: PhotoUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateFile = (selectedFile: File) => {
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      return "Please choose a JPG, PNG, or WEBP image.";
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      return "Please select an image smaller than 4MB.";
    }
    return "";
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    const validation = validateFile(selected);
    if (validation) {
      setError(validation);
      setFile(null);
      setPreview("");
      return;
    }
    setError("");
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose an image before uploading.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    setProgress(0);

    try {
      const imageId = `${Date.now()}-${file.name}`;
      const imageUrl = await uploadPhotoFile(file, imageId, setProgress);
      await savePhotoMetadata({
        imageUrl,
        caption: caption.trim() || "A quiet moment captured.",
        uploadedBy
      });
      setSuccess(true);
      setFile(null);
      setPreview("");
      setCaption("");
      onUploadComplete();
    } catch (uploadError) {
      console.error("Photo upload failed:", uploadError);
      const message = uploadError instanceof Error ? uploadError.message : "Upload failed. Please try again later.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-[#f7efe7]/95 p-6 shadow-paper backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-driftwood/60">photo upload</p>
          <h2 className="mt-3 text-2xl font-semibold text-driftwood">Share a new keepsake.</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-driftwood/75">
            Choose a photo, write a soft caption, and save it to your private scrapbook archive.
          </p>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 rounded-[2rem] border border-driftwood/10 bg-white/90 p-5 shadow-sm">
          <label className="block text-sm font-medium text-driftwood">Select photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full rounded-3xl border border-driftwood/20 bg-[#faf4ef] px-4 py-3 text-sm text-driftwood outline-none transition focus:border-blush" />

          {preview && (
            <div className="overflow-hidden rounded-[1.75rem] border border-driftwood/10 bg-[#fff6f1] shadow-sm">
              <img src={preview} alt="preview" className="h-64 w-full object-cover" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-driftwood">Caption</label>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              rows={3}
              placeholder="A gentle note about this moment..."
              className="mt-2 w-full rounded-3xl border border-driftwood/20 bg-[#faf4ef] px-4 py-3 text-sm text-driftwood outline-none transition focus:border-blush"
            />
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border border-driftwood/10 bg-[#f6ebdf]/95 p-5 shadow-sm">
          <div className="rounded-[1.75rem] border border-driftwood/10 bg-[#fff7f2] p-5 text-sm text-driftwood shadow-inner">
            <p className="font-semibold text-driftwood">Upload details</p>
            <p className="mt-3 text-sm text-driftwood/75">Only approved visitors can see the upload form. This keeps your gallery private and gentle.</p>
          </div>

          <div className="rounded-[1.75rem] bg-white/90 p-5 text-sm text-driftwood shadow-sm">
            <p>Image type:</p>
            <p className="mt-1 font-medium">JPG, PNG, WEBP</p>
            <p className="mt-3">Max size:</p>
            <p className="mt-1 font-medium">4MB</p>
          </div>

          <div className="space-y-3">
            {error && <div className="rounded-3xl bg-blush/10 px-4 py-3 text-sm text-blush">{error}</div>}
            {success && <div className="rounded-3xl bg-sage/10 px-4 py-3 text-sm text-sage">Photo uploaded successfully.</div>}
            {loading && (
              <div className="rounded-3xl bg-[#f4ece5] px-4 py-3 text-sm text-driftwood">
                Uploading: {progress}%
                <div className="mt-2 h-2 rounded-full bg-driftwood/10">
                  <div className="h-full rounded-full bg-blush" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

              <button
            type="button"
            disabled={loading}
            onClick={handleUpload}
            className="inline-flex w-full items-center justify-center rounded-full bg-driftwood px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream/90 hover:text-driftwood disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload photo"}
          </button>
        </div>
      </div>
    </section>
  );
}
