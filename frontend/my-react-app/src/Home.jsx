import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      id="home"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#eef1f6",
        minHeight: "100vh",
        color: "#1a1a2e",
        scrollBehavior: "smooth",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap"
        rel="stylesheet"
      />

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: "64px",
          background: "#ffffff",
          borderBottom: "1px solid #d9dde6",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#1a4fa0",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.3px" }}>
            CivicConnect
          </span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { label: "Home", id: "home" },
            { label: "About", id: "about" },
            { label: "Services", id: "services" },
            { label: "Contact", id: "contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              style={{
                fontSize: 13,
                color: "#6b7280",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "1px solid #d9dde6",
              background: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              color: "#374151",
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: "#1a4fa0",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero / Home Section */}
      <section
        id="home"
        style={{
          background: "#ffffff",
          padding: "72px 40px 56px",
          borderBottom: "1px solid #d9dde6",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 600 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#eef3ff",
                color: "#1a4fa0",
                fontSize: 12,
                padding: "5px 12px",
                borderRadius: 20,
                marginBottom: 24,
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#1a4fa0",
                  display: "inline-block",
                }}
              ></span>
              Government Civic Platform
            </div>
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 44,
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#0f172a",
                marginBottom: 18,
                letterSpacing: "-0.5px",
              }}
            >
              Civic complaints,<br />
              <span style={{ color: "#1a4fa0" }}>resolved faster.</span>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "#6b7280",
                lineHeight: 1.8,
                maxWidth: 460,
                marginBottom: 32,
              }}
            >
              A unified platform connecting citizens with municipal authorities.
              Report issues, track resolutions, and build better communities — all in one place.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "12px 28px",
                  borderRadius: 10,
                  border: "none",
                  background: "#1a4fa0",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "-0.2px",
                }}
              >
                Get started free
              </button>
              <button
                onClick={() => navigate("/login")}
                style={{
                  padding: "12px 28px",
                  borderRadius: 10,
                  border: "1px solid #d9dde6",
                  background: "#fff",
                  color: "#374151",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Login to account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          padding: "60px 40px",
          background: "#eef1f6",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#1a4fa0",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            About
          </p>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 400,
              fontFamily: "'DM Serif Display', serif",
              marginBottom: 8,
              color: "#0f172a",
            }}
          >
            About CivicConnect
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#6b7280",
              lineHeight: 1.8,
              maxWidth: 700,
              marginBottom: 32,
            }}
          >
            CivicConnect is a government-backed civic platform that connects citizens with municipal
            authorities. We make it easier to report issues, track their resolution, and collectively
            build better communities. Our mission is to increase transparency, accountability, and
            community engagement in civic services.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {[
              {
                title: "Register & verify",
                desc:
                  "Sign up as Citizen or Officer. Officers submit Aadhaar, Voter ID, Passport, or Driving License for admin verification before access is granted.",
                icon:
                  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              },
              {
                title: "File a complaint",
                desc:
                  "Submit your complaint with description, priority level, GPS location, photo attachment, and an optional suggestion for resolution.",
                icon:
                  "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
              },
              {
                title: "Track status",
                desc:
                  "Follow your complaint through every stage — Pending, In Progress, Approved, Reassigned, Resolved, or Rejected — updated in real-time.",
                icon:
                  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Resolve & feedback",
                desc:
                  "Once resolved, receive an email and SMS notification. Share your rating and feedback to help improve civic services in your area.",
                icon:
                  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: 14,
                  padding: "24px 20px",
                  border: "1px solid #d9dde6",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#1a4fa0"
                  strokeWidth="1.5"
                  style={{ marginBottom: 12 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={s.icon}
                  />
                </svg>
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "#0f172a",
                  }}
                >
                  {s.title}
                </h4>
                <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{
          padding: "60px 40px",
          background: "#ffffff",
          borderTop: "1px solid #d9dde6",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#1a4fa0",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Services
          </p>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 400,
              fontFamily: "'DM Serif Display', serif",
              marginBottom: 4,
              color: "#0f172a",
            }}
          >
            Choose your account type
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>
            Select the role that fits your needs
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              {
                title: "Citizen",
                desc: "Report and track civic issues in your area",
                features: [
                  "File complaints easily",
                  "Track resolution status",
                  "Receive alerts & updates",
                  "View community issues",
                ],
                bg: "#eef3ff",
                tc: "#1a4fa0",
                btnBg: "#1a4fa0",
                btnLabel: "Register as citizen",
                route: "/citizen-register?role=citizen",
                icon:
                  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              },
              {
                title: "Municipal officer",
                desc: "Manage and resolve assigned complaints",
                features: [
                  "Manage citizen complaints",
                  "Update issue status",
                  "Assign to departments",
                  "Generate reports",
                ],
                bg: "#f0faf4",
                tc: "#16a34a",
                btnBg: "#16a34a",
                btnLabel: "Register as officer",
                route: "/officer-register?role=officer",
                icon:
                  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
              {
                title: "Admin",
                desc: "Oversee platform operations and all users",
                features: [
                  "Approve / reject users",
                  "Assign departments",
                  "Full dashboard access",
                  "Analytics & reports",
                ],
                bg: "#f5f3ff",
                tc: "#7c3aed",
                btnBg: "#7c3aed",
                btnLabel: "Admin login",
                route: "/login",
                icon:
                  "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  border: "1px solid #d9dde6",
                  overflow: "hidden",
                }}
              >
                <div style={{ background: r.bg, padding: "24px 24px 20px" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke={r.tc}
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={r.icon}
                      />
                    </svg>
                  </div>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {r.title}
                  </h4>
                  <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
                    {r.desc}
                  </p>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      marginBottom: 20,
                    }}
                  >
                    {r.features.map((f, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: 13,
                          color: "#374151",
                          padding: "5px 0",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={r.tc}
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate(r.route)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: 8,
                      border: "none",
                      background: r.btnBg,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {r.btnLabel}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          padding: "60px 40px",
          background: "#eef1f6",
          borderTop: "1px solid #d9dde6",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#1a4fa0",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Contact
          </p>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 400,
              fontFamily: "'DM Serif Display', serif",
              marginBottom: 8,
              color: "#0f172a",
            }}
          >
            Get in touch
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#6b7280",
              lineHeight: 1.8,
              maxWidth: 700,
              marginBottom: 32,
            }}
          >
            Have questions about CivicConnect, need support, or want to collaborate with your municipal
            department? Reach out to us and we’ll get back to you as soon as possible.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {[
              {
                title: "Location tracking",
                desc:
                  "Pin complaints on a map with precise GPS coordinates for faster resolution",
                color: "#eef3ff",
                tc: "#1a4fa0",
                icon:
                  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
              },
              {
                title: "Real-time notifications",
                desc:
                  "Get email and SMS alerts at every stage of your complaint's journey",
                color: "#f0faf4",
                tc: "#16a34a",
                icon:
                  "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
              },
              {
                title: "Analytics dashboard",
                desc:
                  "Officers see department performance, recurring issues, and resolution rates",
                color: "#f5f3ff",
                tc: "#7c3aed",
                icon:
                  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
              {
                title: "Document verification",
                desc:
                  "Secure Aadhaar, Voter ID, and Passport verification for officer accounts",
                color: "#fff7ed",
                tc: "#d97706",
                icon:
                  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "22px",
                  borderRadius: 14,
                  border: "1px solid #d9dde6",
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: f.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={f.tc}
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={f.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: "#0f172a",
                    }}
                  >
                    {f.title}
                  </h4>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "60px 40px",
          background: "#1a4fa0",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 32,
            fontWeight: 400,
            color: "#fff",
            marginBottom: 14,
          }}
        >
          Ready to transform your community?
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#a8c4e8",
            marginBottom: 32,
            lineHeight: 1.7,
          }}
        >
          Join thousands of citizens and officers making their communities better every day.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 32px",
              borderRadius: 10,
              border: "none",
              background: "#fff",
              color: "#1a4fa0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Get started free
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 32px",
              borderRadius: 10,
              border: "1px solid rgba(255, 255, 255, 0.4)",
              background: "transparent",
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Login now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#0f172a",
          padding: "32px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#1a4fa0",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
            CivicConnect
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Home", id: "home" },
            { label: "About", id: "about" },
            { label: "Services", id: "services" },
            { label: "Contact", id: "contact" },
          ].map((l) => (
            <a
              key={l.label}
              href={`#${l.id}`}
              style={{
                fontSize: 12,
                color: "#64748b",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#64748b" }}>
          © 2024 CivicConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;