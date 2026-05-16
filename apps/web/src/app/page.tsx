import { PLATFORM_SCOPE } from "@tv-platform/shared";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">
          Licensed Player Platform
        </p>

        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white">
          TV Project Platform
        </h1>

        <p className="mb-6 text-lg leading-8 text-slate-300">
          A management platform for accounts, subscriptions, licenses, device
          activation, reseller credits, app version checks, remote config, and
          optional temporary encrypted user-owned playlist/profile transfer.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {PLATFORM_SCOPE.allowedBackendAreas.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-700 bg-slate-800 p-4 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-400">
          This platform does not provide, host, relay, transcode, sell, or
          source TV streams or channel lists.
        </p>
      </section>
    </main>
  );
}
