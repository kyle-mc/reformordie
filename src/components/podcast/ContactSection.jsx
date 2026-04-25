import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const inputClass =
  "bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-300 text-sm w-full";

export default function ContactSection() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          from_name: formData.name,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData(INITIAL_FORM);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 border-t border-border">
      <div className="px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-px bg-primary" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Get In Touch
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] mb-16"
        >
          Send A
          <br />
          <span className="text-primary">Message</span>
        </motion.h2>

        <div className="max-w-2xl">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start gap-4 py-16"
            >
              <CheckCircle className="w-10 h-10 text-primary" />
              <p className="text-2xl font-black uppercase tracking-[-0.02em]">Message Sent</p>
              <p className="text-sm text-muted-foreground tracking-wide">
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              {/* Honeypot — hidden from users, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                readOnly
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-destructive text-xs"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="relative overflow-hidden border border-foreground/20 rounded-full px-8 py-3 text-xs tracking-[0.1em] uppercase text-foreground/80 hover:text-primary-foreground transition-colors duration-500 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
