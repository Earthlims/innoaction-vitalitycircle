import ReportHeader from '@/components/report/ReportHeader'
import ReportSection from '@/components/report/ReportSection'
import DiagnosticStep from '@/components/report/DiagnosticStep'
import CauseCard from '@/components/report/CauseCard'
import CodeBlock from '@/components/report/CodeBlock'
import FixCard from '@/components/report/FixCard'
import ReportSummary from '@/components/report/ReportSummary'

export const metadata = {
  title: 'Blank Page Diagnostic Report — Next.js',
  description:
    'A detailed diagnostic report for identifying and resolving a blank white page after website launch, covering build errors, routing, configuration, and runtime issues.',
}

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-background font-body">
      <div className="max-w-3xl mx-auto px-5 py-12 pb-20">

        <ReportHeader />

        {/* ── 1. Common Causes ─────────────────────────────── */}
        <ReportSection
          number="01"
          title="Common Causes"
          description="A blank white page can originate at any layer of the stack. These are the most frequent culprits, ranked by likelihood."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <CauseCard
              severity="critical"
              category="Build Error"
              title="Build failed silently"
              description="The production build exited with an error but the deployment proceeded anyway, serving an empty or malformed HTML shell with no JavaScript bundle attached."
            />
            <CauseCard
              severity="critical"
              category="Runtime Error"
              title="Unhandled JavaScript exception"
              description="A thrown error during the initial render — often from undefined props, missing environment variables, or a broken import — crashes the React tree before anything is painted."
            />
            <CauseCard
              severity="high"
              category="Routing"
              title="Missing or incorrect root route"
              description="In Next.js App Router, the absence of app/page.tsx, a misconfigured rewrite rule, or a redirect loop means the framework has no component to render at the root path."
            />
            <CauseCard
              severity="high"
              category="Configuration"
              title="Incorrect environment variables"
              description="Required environment variables (API keys, database URLs, feature flags) are undefined at runtime. Code that destructures or accesses them throws immediately, halting rendering."
            />
            <CauseCard
              severity="medium"
              category="Dependencies"
              title="Missing or mismatched packages"
              description="An import resolves to a module that was not installed, or a peer dependency version conflict causes the module graph to break silently during the build or at import time."
            />
            <CauseCard
              severity="medium"
              category="Configuration"
              title="next.config wrong output mode"
              description='Setting output: "export" and deploying to a Node.js host, or vice versa, results in assets that cannot be served or hydrated correctly, producing a blank document.'
            />
            <CauseCard
              severity="low"
              category="Hydration"
              title="Client / server HTML mismatch"
              description="When the server-rendered HTML and the client-side React tree differ (e.g. from browser-only APIs called during SSR), React 18 will throw a hydration error and unmount the entire tree."
            />
            <CauseCard
              severity="low"
              category="Deployment"
              title="Wrong root directory or build output"
              description='The deployment platform is configured to serve from the wrong folder (e.g. "/" instead of ".next") or the build output directory was not included in the deployment artifact.'
            />
          </div>
        </ReportSection>

        {/* ── 2. Identifying the Error ─────────────────────── */}
        <ReportSection
          number="02"
          title="Identifying the Error"
          description="Work through these diagnostic steps in order — each one narrows the problem space before you attempt any fix."
        >
          <div className="flex flex-col gap-3">
            <DiagnosticStep
              step={1}
              tool="Browser DevTools"
              title="Inspect the browser console"
              description='Open DevTools (F12 → Console). Any uncaught exception, failed network request, or React error boundary message will appear here. Look especially for "Cannot read properties of undefined", "Module not found", or React hydration warnings.'
            >
              <CodeBlock language="console">
{`// Common patterns to look for:
Uncaught TypeError: Cannot read properties of undefined
Uncaught SyntaxError: Unexpected token '<'
Warning: Text content did not match (hydration mismatch)
GET /static/chunks/main.js  net::ERR_ABORTED 404`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={2}
              tool="Browser DevTools"
              title="Inspect the Network tab"
              description="Filter by JS. Confirm that the main application bundle (e.g. _app.js, main.js, or page.js) loads with a 200 status. A 404 on a JavaScript chunk means the build output is not being served from the correct path."
            >
              <CodeBlock language="console">
{`// Expected responses
200  /_next/static/chunks/main-abc123.js
200  /_next/static/chunks/pages/index-def456.js

// Blank page symptoms
404  /_next/static/chunks/main.js
404  /static/js/main.chunk.js   ← wrong path (CRA pattern on Next.js host)`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={3}
              tool="Browser DevTools"
              title="View the raw page source"
              description='Press Ctrl+U (Cmd+U on Mac) to view the raw HTML. If the <body> is empty or contains only a <div id="__next"></div> with no children, the server returned a valid shell but React failed to render. If the entire document is empty, the server itself returned nothing.'
            >
              <CodeBlock language="html">
{`<!-- Healthy Next.js page source (abbreviated) -->
<html>
  <head>
    <script src="/_next/static/chunks/main.js" defer></script>
  </head>
  <body>
    <div id="__next">
      <main><!-- server-rendered content --></main>
    </div>
  </body>
</html>

<!-- Blank page: empty shell, no server content -->
<html><head></head><body><div id="__next"></div></body></html>`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={4}
              tool="Terminal / CI"
              title="Read the Next.js build output"
              description='Run next build locally and read the terminal output carefully. Any compilation error, type error (if using --strict), or missing module error will be printed here. Do not deploy until this command exits with code 0.'
            >
              <CodeBlock language="bash">
{`# Run the build and capture all output
pnpm next build 2>&1 | tee build.log

# Errors appear as:
error  ./app/page.tsx
Module not found: Can't resolve '@/components/Hero'

# A successful build ends with:
Route (app)                   Size    First Load JS
┌ ○ /                         5.2 kB       102 kB
└ ○ /about                    1.1 kB        98 kB
✓ Compiled successfully`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={5}
              tool="Deployment Platform"
              title="Check server-side / deployment logs"
              description="In Vercel, open the deployment's Function Logs or the Build Logs tab. In other platforms check stdout/stderr from the Node.js process. Runtime errors that occur during SSR (e.g. in a Server Component or getServerSideProps) are only visible here — they will not appear in the browser console."
            >
              <CodeBlock language="bash">
{`# Vercel CLI — stream function logs
vercel logs https://your-deployment.vercel.app --follow

# Common server-side error patterns
Error: NEXT_PUBLIC_API_URL is not defined
  at Object.<anonymous> (./lib/api.ts:3:15)

PrismaClientInitializationError: Can't reach database server
  Connection refused: DATABASE_URL not set in production`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={6}
              tool="Terminal"
              title="Verify installed dependencies"
              description='A missing node_modules directory or a lockfile mismatch between environments is a common deployment footgun. Confirm that the install step ran and that the lockfile was committed.'
            >
              <CodeBlock language="bash">
{`# Confirm node_modules exists and is complete
ls node_modules | head -20

# Check for missing peer dependencies
pnpm install --frozen-lockfile   # fails loudly if lockfile is out of sync
npm ls --depth=0                 # shows top-level installed packages

# If packages are missing:
pnpm install                     # reinstall from lockfile
pnpm dedupe                      # resolve version conflicts`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={7}
              tool="Codebase"
              title="Confirm the root page file exists and exports a component"
              description="In the App Router, every route segment must export a React component as the default export from page.tsx (or page.js). A missing default export, a named-only export, or a completely empty file will cause the framework to serve nothing."
            >
              <CodeBlock language="typescript">
{`// app/page.tsx — required structure
export default function HomePage() {
  return <main>Hello world</main>
}

// These will produce a blank page:
export const HomePage = () => <main>Hello</main>  // named, not default
export {}                                          // empty module
// (file is missing entirely)`}
              </CodeBlock>
            </DiagnosticStep>

            <DiagnosticStep
              step={8}
              tool="Environment"
              title="Audit environment variables"
              description='Compare the variables defined in your .env.local (or .env.production) against what is configured in the deployment platform. Any variable prefixed with NEXT_PUBLIC_ must be set at build time. Server-only variables must be present at runtime.'
            >
              <CodeBlock language="bash">
{`# List all env vars defined locally
cat .env.local

# List vars set in Vercel
vercel env ls

# Inside Next.js, log missing vars at startup:
# app/layout.tsx (Server Component)
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}`}
              </CodeBlock>
            </DiagnosticStep>
          </div>
        </ReportSection>

        {/* ── 3. Fixes ─────────────────────────────────────── */}
        <ReportSection
          number="03"
          title="Recommended Fixes"
          description="Targeted remedies for each root cause. Apply the fix that matches the diagnosis from Section 02, then re-deploy."
        >
          <div className="flex flex-col gap-4">
            <FixCard
              cause="Build failure"
              fix="Force a clean rebuild"
              steps={[
                'Delete .next/ and node_modules/.cache/',
                'Run pnpm install --frozen-lockfile to restore a clean dependency tree',
                'Run pnpm next build and confirm exit code 0 before deploying',
                'In Vercel, use the "Redeploy" button with "Clear cache" checked',
              ]}
            >
              <CodeBlock language="bash">
{`rm -rf .next node_modules/.cache
pnpm install --frozen-lockfile
pnpm next build`}
              </CodeBlock>
            </FixCard>

            <FixCard
              cause="Runtime exception"
              fix="Add an error boundary and fix the thrown error"
              steps={[
                "Wrap the root layout in a React error boundary to capture and display the error instead of showing a blank page",
                "Identify the specific error from the console (step 1 above) and fix the underlying issue (null check, missing import, etc.)",
                "Use optional chaining and nullish coalescing to guard against undefined values at runtime",
              ]}
            >
              <CodeBlock language="typescript">
{`// app/error.tsx — catches errors in Server & Client Components
'use client'
export default function Error({ error, reset }: {
  error: Error; reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  )
}`}
              </CodeBlock>
            </FixCard>

            <FixCard
              cause="Routing issue"
              fix="Verify the route file structure"
              steps={[
                "Confirm app/page.tsx exists and has a valid default export",
                "Check next.config.js for redirects or rewrites that may be intercepting the root path",
                "If using the Pages Router, confirm pages/index.tsx exists",
                "Remove any middleware.ts redirect that unconditionally redirects / to itself",
              ]}
            >
              <CodeBlock language="bash">
{`# Confirm the file exists
ls app/page.tsx

# Check for a redirect loop in next.config.js
async redirects() {
  return [
    // WRONG: redirects / → / indefinitely
    { source: '/', destination: '/', permanent: false },
  ]
}`}
              </CodeBlock>
            </FixCard>

            <FixCard
              cause="Environment variables"
              fix="Set all required variables in the deployment platform"
              steps={[
                "Copy all keys from .env.local to the platform's environment variable settings",
                "Ensure NEXT_PUBLIC_ variables are set before the build step runs",
                "After adding variables, trigger a full redeploy — environment changes are not hot-reloaded",
                "Use t3-env or a similar validation library to fail fast at startup when required vars are missing",
              ]}
            >
              <CodeBlock language="typescript">
{`// lib/env.ts — validate env vars at startup (t3-env pattern)
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    API_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: process.env,
})`}
              </CodeBlock>
            </FixCard>

            <FixCard
              cause="Hydration mismatch"
              fix="Isolate browser-only code with dynamic imports or useEffect"
              steps={[
                "Never access window, document, localStorage, or navigator directly during the initial render",
                "Wrap browser-only components with next/dynamic and ssr: false",
                "Move browser API access into useEffect hooks to ensure it only runs on the client",
                "Use suppressHydrationWarning on elements whose content legitimately differs (e.g. timestamps)",
              ]}
            >
              <CodeBlock language="typescript">
{`// Correct: defer browser-only code
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

// Correct: access browser APIs in useEffect only
useEffect(() => {
  const stored = localStorage.getItem('theme')
  setTheme(stored ?? 'light')
}, [])`}
              </CodeBlock>
            </FixCard>

            <FixCard
              cause="Wrong output / deployment config"
              fix="Align next.config.js output mode with the hosting environment"
              steps={[
                'Use output: "standalone" for containerised Node.js deployments (Docker, Fly.io)',
                'Use output: "export" only for fully static hosting (GitHub Pages, S3) — this disables SSR and API routes',
                'For Vercel, remove the output key entirely — Vercel auto-detects the optimal build output',
                'Confirm the platform is running next start (not serve or npx serve) for SSR deployments',
              ]}
            >
              <CodeBlock language="javascript">
{`// next.config.js — correct output modes by host
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel: omit output entirely
  // output: undefined,

  // Docker / self-hosted Node.js:
  // output: 'standalone',

  // Static export (S3, GitHub Pages) — no SSR:
  // output: 'export',
}
module.exports = nextConfig`}
              </CodeBlock>
            </FixCard>
          </div>
        </ReportSection>

        {/* ── 4. Prevention Checklist ──────────────────────── */}
        <ReportSection
          number="04"
          title="Prevention Checklist"
          description="Embed these practices into your deployment workflow to catch blank-page regressions before they reach production."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'CI gate on build', detail: 'Run next build in CI and fail the pipeline on any non-zero exit code. Never deploy from a broken build.' },
              { label: 'Error boundaries on every route', detail: 'Add app/error.tsx and app/global-error.tsx so any render failure is caught and surfaced with a useful message.' },
              { label: 'Env var validation at startup', detail: 'Use a library like t3-env to throw a descriptive error immediately if a required variable is absent or malformed.' },
              { label: 'Lockfile committed and frozen', detail: 'Commit pnpm-lock.yaml (or package-lock.json) and install with --frozen-lockfile in CI to guarantee reproducible builds.' },
              { label: 'Smoke test after each deploy', detail: 'Hit the root URL with a synthetic monitor or a simple Playwright test after every deployment to confirm the page renders non-empty content.' },
              { label: 'Source maps in production', detail: 'Enable productionBrowserSourceMaps: true in next.config.js to get readable stack traces from production error reports.' },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 bg-card border border-border rounded-2xl p-4">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </ReportSection>

        <ReportSummary />

      </div>
    </main>
  )
}
