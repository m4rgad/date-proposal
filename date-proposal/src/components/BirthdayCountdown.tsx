const birthdayMonth = 7;
const birthdayDay = 9;

function getDaysUntilNextBirthday(today: Date) {
  const normalizedToday = new Date(today);
  normalizedToday.setHours(0, 0, 0, 0);

  const thisYearBirthday = new Date(normalizedToday.getFullYear(), birthdayMonth - 1, birthdayDay);
  if (thisYearBirthday < normalizedToday) {
    thisYearBirthday.setFullYear(normalizedToday.getFullYear() + 1);
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((thisYearBirthday.getTime() - normalizedToday.getTime()) / msPerDay);
}

function formatDaysLabel(days: number) {
  if (days === 0) {
    return "Happy birthday!";
  }

  return `${days} day${days === 1 ? "" : "s"} until her birthday`;
}

export default function BirthdayCountdown() {
  const daysLeft = getDaysUntilNextBirthday(new Date());
  const progress = Math.max(0, Math.min(100, Math.round((365 - daysLeft) / 365 * 100)));

  return (
    <section id="birthday-countdown" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">birthday countdown</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-blush sm:text-4xl">A quiet moment for the day ahead</h2>
      </div>
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-[#14101a]/95 p-8 shadow-paper">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#111018]/95 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-cream/50">
              <span className="inline-block h-1 w-8 rounded-full bg-blush" />
              <span className="uppercase tracking-[0.35em] text-xs">birthday countdown</span>
            </div>
            <h3 className="text-3xl font-semibold text-cream">{formatDaysLabel(daysLeft)}</h3>
            <p className="max-w-2xl text-sm leading-7 text-cream/75">
              The countdown is set for her special day and updates automatically each morning.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-[#1b1520]/95 p-4 text-center">
            <span className="text-xs uppercase tracking-[0.35em] text-cream/50">days left</span>
            <span className="text-5xl font-semibold text-cream">{String(daysLeft).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-full bg-cream/10 p-3">
            <div className="h-3 overflow-hidden rounded-full bg-[#14101a]">
              <div className="h-full rounded-full bg-cream" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-2 rounded-full bg-cream/15">
              <div className="h-full rounded-full bg-cream" style={{ width: `${Math.max(20, Math.round(progress * 0.72))}%` }} />
            </div>
            <div className="h-2 rounded-full bg-cream/15">
              <div className="h-full rounded-full bg-blush" style={{ width: `${Math.max(14, Math.round(progress * 0.52))}%` }} />
            </div>
            <div className="h-2 rounded-full bg-cream/15">
              <div className="h-full rounded-full bg-sage" style={{ width: `${Math.max(9, Math.round(progress * 0.3))}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
