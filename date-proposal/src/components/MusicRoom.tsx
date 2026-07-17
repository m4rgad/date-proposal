import { motion } from "framer-motion";

const playlists = [
  {
    id: "2wZlKb8VXpuQU8OcoK9LLu",
    title: "Playlist 1",
    description: "A curated mood for quiet reflection."
  },
  {
    id: "4u9MlA2x1wIGwzpMGPANx6",
    title: "Playlist 2",
    description: "Soft melodies to keep the room feeling warm."
  }
];

export default function MusicRoom() {
  return (
    <section id="music" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">music room</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-blush sm:text-4xl">Her Spotify playlists</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111018]/100 p-8 shadow-paper"
      >
        <div className="space-y-6">
          <div className="rounded-[2.2rem] border border-white/10 bg-gradient-to-br from-[#2d2530] to-[#1c181f] p-6 shadow-inner">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-[1.8rem] border border-cream/20 bg-[#241f27] p-3 text-2xl text-cream">▸▸</div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cream/60">spotify playlists</p>
                <p className="mt-2 text-lg font-semibold text-cream">Her favorite mixes</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {playlists.map((playlist) => (
                <article key={playlist.id} className="rounded-[1.8rem] border border-driftwood/10 bg-[#19151b]/95 p-4 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.35em] text-cream/60">playlist</p>
                  <p className="mt-2 text-base font-semibold text-cream">{playlist.title}</p>
                  <p className="mt-3 text-sm leading-6 text-cream/80">{playlist.description}</p>
                  <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-cream/10 bg-black/70">
                    <iframe
                      src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
                      width="100%"
                      height="360"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="h-[360px] w-full bg-transparent"
                      style={{ backgroundColor: "transparent" }}
                      allowTransparency={true}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
