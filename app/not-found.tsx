import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-6xl font-extrabold text-accent">404</p>
      <h1 className="heading mt-4 text-3xl text-text">Page Not Found</h1>
      <p className="mt-3 max-w-md text-text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/booking" className="btn-outline">
          Get a Free Quote
        </Link>
      </div>
    </section>
  );
}
