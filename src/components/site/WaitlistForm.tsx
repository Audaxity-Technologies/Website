import { useState } from "react";
import { cn } from "@/lib/utils";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-border bg-background p-8 md:p-12">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-signal/10">
            <svg
              className="h-8 w-8 text-signal"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h3 className="display-md mb-3">You're on the list.</h3>
          <p className="text-muted-foreground">
            We'll reach out when Minutes is ready for your institution.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-background p-8 md:p-12">
      <div className="mb-8">
        <h3 className="display-md mb-3">Join the Minutes waitlist</h3>
        <p className="text-muted-foreground">
          Be among the first to bring academic intelligence to your department.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-signal focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-signal focus:outline-none"
              placeholder="you@institution.edu"
            />
          </div>
        </div>

        <div>
          <label htmlFor="interest" className="mb-2 block text-sm font-medium">
            I'M INTERESTED IN
          </label>
          <select
            id="interest"
            name="interest"
            required
            className="w-full border border-border bg-background px-4 py-3 text-foreground focus:border-signal focus:outline-none"
          >
            <option value="">Select an option</option>
            <option value="access">Early Access</option>
            <option value="partnership">Partnership</option>
            <option value="press">Press / Media</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full border border-border bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-signal focus:outline-none resize-none"
            placeholder="Tell us about your institution and use case..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "btn-base btn-solid w-full",
            loading && "opacity-50 cursor-not-allowed"
          )}
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-border">
        <p className="mb-4 text-sm font-medium text-muted-foreground">DIRECT</p>
        <div className="space-y-3">
          <a
            href="mailto:hello@audaxity.in"
            className="block text-foreground hover:text-signal transition-colors"
          >
            hello@audaxity.in
          </a>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-signal transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-signal transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Audaxity Technologies. Making messy human knowledge actionable.
        </p>
      </div>
    </div>
  );
}
