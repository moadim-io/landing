import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 py-24 sm:px-10">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            404
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            This page isn&apos;t on the schedule.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            The page you were looking for doesn&apos;t exist or may have moved.
            Let&apos;s get you back to something that runs.
          </p>
        </header>

        <div>
          <Link
            className="flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200"
            href="/"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
