

// export default Home;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./Home.css";

// Image URLs (Replace with your actual image URLs)
const images = {
  hero: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  citizen: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  officer: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  statistics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  community: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
};

const Home = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [stats, setStats] = useState({ complaints: 0, resolved: 0, users: 0, cities: 0 });

  const features = [
    { icon: "📋", title: "File Complaints", desc: "Report civic issues directly through our platform" },
    { icon: "📊", title: "Track Progress", desc: "Monitor your complaint status in real-time" },
    { icon: "🔔", title: "Get Updates", desc: "Receive instant notifications on issue resolution" },
    { icon: "👥", title: "Community", desc: "Join thousands of active citizens and officers" }
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Citizen", text: "This platform made reporting issues so easy!", avatar: "👩" },
    { name: "Officer Raj", role: "Municipal Officer", text: "Streamlined our workflow significantly", avatar: "👮" },
    { name: "Community Group", role: "Residents", text: "Transformed how we handle local issues", avatar: "👥" }
  ];

  // Animated statistics counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        complaints: prev.complaints >= 1247 ? 1247 : prev.complaints + 50,
        resolved: prev.resolved >= 987 ? 987 : prev.resolved + 40,
        users: prev.users >= 5432 ? 5432 : prev.users + 100,
        cities: prev.cities >= 24 ? 24 : prev.cities + 1
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Feature carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-background" 
             style={{
               backgroundImage: `linear-gradient(rgba(13, 110, 253, 0.85), rgba(25, 135, 84, 0.85)), url(${images.hero})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
        </div>
        
        <div className="container position-relative z-2 py-5 py-lg-6">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 text-white animate__animated animate__fadeInLeft">
              <h1 className="display-3 fw-bold mb-4">
                Transforming Civic Engagement <span className="text-warning">Digitally</span>
              </h1>
              <p className="lead mb-5 opacity-90">
                A unified platform connecting citizens with municipal authorities. 
                Report issues, track resolutions, and build better communities together.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button 
                  className="btn btn-light btn-lg fw-bold px-4 py-3"
                  onClick={() => navigate("/register")}
                  style={{
                    transition: 'all 0.3s ease',
                    borderRadius: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span className="me-2">🚀</span> Get Started
                </button>
                <button 
                  className="btn btn-outline-light btn-lg fw-bold px-4 py-3"
                  onClick={() => navigate("/login")}
                  style={{
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    borderRadius: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <span className="me-2">🔐</span> Login
                </button>
              </div>
            </div>
            
            <div className="col-lg-6 mt-5 mt-lg-0 animate__animated animate__fadeInRight">
              <div className="position-relative">
                {/* Animated feature showcase */}
                <div className="feature-showcase-card bg-white rounded-4 shadow-lg p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="feature-icon bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: '60px', height: '60px' }}>
                      <span className="text-white fs-3">{features[currentFeature].icon}</span>
                    </div>
                    <div>
                      <h3 className="h4 fw-bold mb-1">{features[currentFeature].title}</h3>
                      <p className="text-muted mb-0">{features[currentFeature].desc}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    {features.map((_, index) => (
                      <div 
                        key={index}
                        className={`dot mx-1 ${index === currentFeature ? 'active' : ''}`}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: index === currentFeature ? '#0d6efd' : '#dee2e6',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="floating-elements">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="floating-element"
              style={{
                animationDelay: `${i * 0.5}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">Our Impact in Numbers</h2>
              <p className="text-muted lead">Join thousands of users transforming their communities</p>
            </div>
          </div>
          
          <div className="row g-4">
            {[
              { icon: "📝", value: stats.complaints.toLocaleString(), label: "Complaints Filed", color: "primary" },
              { icon: "✅", value: stats.resolved.toLocaleString(), label: "Issues Resolved", color: "success" },
              { icon: "👥", value: stats.users.toLocaleString(), label: "Active Users", color: "warning" },
              { icon: "🏙️", value: stats.cities, label: "Cities Covered", color: "info" }
            ].map((stat, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="stat-card text-center p-4 rounded-4 bg-white shadow-sm border-0 h-100"
                     style={{ transition: 'all 0.3s ease' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-10px)';
                       e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                     }}>
                  <div className={`stat-icon bg-${stat.color}-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                       style={{ width: '70px', height: '70px' }}>
                    <span className={`text-${stat.color} fs-2`}>{stat.icon}</span>
                  </div>
                  <h3 className="display-6 fw-bold mb-2">{stat.value}</h3>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">How It Works</h2>
              <p className="text-muted lead">Simple steps to make your voice heard</p>
            </div>
          </div>

          <div className="row g-4">
            {[
              { step: "1", icon: "📝", title: "Register", desc: "Create your citizen or officer account", color: "primary" },
              { step: "2", icon: "🔍", title: "Report", desc: "File a complaint with details and photos", color: "success" },
              { step: "3", icon: "📊", title: "Track", desc: "Monitor your complaint status in real-time", color: "warning" },
              { step: "4", icon: "✅", title: "Resolve", desc: "Get notified when issue is resolved", color: "info" }
            ].map((step, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="step-card p-4 rounded-4 position-relative overflow-hidden h-100"
                     style={{
                       backgroundColor: `var(--bs-${step.color}-bg-subtle)`,
                       border: `2px solid var(--bs-${step.color})`,
                       transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-10px)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                     }}>
                  <div className="step-number position-absolute top-0 end-0 bg-white text-dark fw-bold rounded-bottom-start px-3 py-1">
                    {step.step}
                  </div>
                  <div className="text-center mb-4">
                    <div className="step-icon mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
                         style={{
                           width: '80px',
                           height: '80px',
                           backgroundColor: `var(--bs-${step.color})`,
                           color: 'white'
                         }}>
                      <span className="fs-2">{step.icon}</span>
                    </div>
                  </div>
                  <h4 className="h5 fw-bold text-center mb-2">{step.title}</h4>
                  <p className="text-muted text-center mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">Choose Your Role</h2>
              <p className="text-muted lead">Select the account type that fits your needs</p>
            </div>
          </div>

          <div className="row g-4">
            {/* Citizen Card */}
            <div className="col-lg-6">
              <div className="role-card card border-0 shadow-lg overflow-hidden h-100"
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-10px)';
                     e.currentTarget.style.boxShadow = '0 30px 50px rgba(13, 110, 253, 0.2)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                   }}>
                <div className="card-header bg-primary-gradient text-white py-4">
                  <div className="d-flex align-items-center">
                    <div className="role-icon bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: '60px', height: '60px' }}>
                      <span className="fs-3">👤</span>
                    </div>
                    <div>
                      <h3 className="h4 mb-1">Citizen</h3>
                      <p className="mb-0 opacity-75">Report issues, track progress</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><span className="text-success me-2">✓</span> File complaints easily</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Track resolution status</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Receive updates & alerts</li>
                    <li><span className="text-success me-2">✓</span> View community issues</li>
                  </ul>
                  <button 
                    className="btn btn-primary w-100 py-3 fw-bold"
                    onClick={() => navigate("/register?role=citizen")}
                  >
                    Register as Citizen
                  </button>
                </div>
              </div>
            </div>

            {/* Officer Card */}
            <div className="col-lg-6">
              <div className="role-card card border-0 shadow-lg overflow-hidden h-100"
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-10px)';
                     e.currentTarget.style.boxShadow = '0 30px 50px rgba(25, 135, 84, 0.2)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                   }}>
                <div className="card-header bg-success-gradient text-white py-4">
                  <div className="d-flex align-items-center">
                    <div className="role-icon bg-white text-success rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: '60px', height: '60px' }}>
                      <span className="fs-3">👮</span>
                    </div>
                    <div>
                      <h3 className="h4 mb-1">Municipal Officer</h3>
                      <p className="mb-0 opacity-75">Manage issues, update status</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><span className="text-success me-2">✓</span> Manage citizen complaints</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Update issue status</li>
                    <li className="mb-2"><span className="text-success me-2">✓</span> Assign to departments</li>
                    <li><span className="text-success me-2">✓</span> Generate reports & analytics</li>
                  </ul>
                  <button 
                    className="btn btn-success w-100 py-3 fw-bold"
                    onClick={() => navigate("/register?role=officer")}
                  >
                    Register as Officer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3">What Our Users Say</h2>
              <p className="text-muted lead">Join thousands of satisfied users</p>
            </div>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div className="col-lg-4" key={index}>
                <div className="testimonial-card p-4 rounded-4 bg-white shadow-sm h-100 animate__animated animate__fadeInUp"
                     style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="d-flex align-items-center mb-4">
                    <div className="testimonial-avatar bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: '60px', height: '60px' }}>
                      <span className="fs-3">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{testimonial.name}</h5>
                      <span className="badge bg-primary">{testimonial.role}</span>
                    </div>
                  </div>
                  <p className="text-muted mb-0">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary-gradient text-white">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">Ready to Transform Your Community?</h2>
              <p className="lead mb-5 opacity-90">
                Join thousands of citizens and officers making their communities better every day.
                Start your journey with us today!
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <button 
                  className="btn btn-light btn-lg fw-bold px-5 py-3"
                  onClick={() => navigate("/register")}
                >
                  <span className="me-2">🚀</span> Get Started Free
                </button>
                <button 
                  className="btn btn-outline-light btn-lg fw-bold px-5 py-3"
                  onClick={() => navigate("/login")}
                >
                  <span className="me-2">🔐</span> Login Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h4 className="fw-bold mb-3">Civic Services</h4>
              <p className="text-light opacity-75">
                Bridging the gap between citizens and municipal authorities through technology.
              </p>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#!" className="text-light opacity-75 text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#!" className="text-light opacity-75 text-decoration-none">About</a></li>
                <li className="mb-2"><a href="#!" className="text-light opacity-75 text-decoration-none">Services</a></li>
                <li><a href="#!" className="text-light opacity-75 text-decoration-none">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 mb-4">
              <h5 className="fw-bold mb-3">Contact</h5>
              <ul className="list-unstyled">
                <li className="mb-2 text-light opacity-75">📍 123 Civic Center, City</li>
                <li className="mb-2 text-light opacity-75">📧 support@civicservices.com</li>
                <li className="text-light opacity-75">📞 +91 98765 43210</li>
              </ul>
            </div>
          </div>
          <hr className="text-light opacity-25 my-4" />
          <div className="text-center">
            <p className="mb-0 text-light opacity-75">© 2024 Civic Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        .home-page {
          overflow-x: hidden;
        }
        
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .bg-primary-gradient {
          background: linear-gradient(135deg, #0d6efd 0%, #198754 100%);
        }
        
        .bg-success-gradient {
          background: linear-gradient(135deg, #198754 0%, #0d6efd 100%);
        }
        
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
        
        .floating-element {
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 20s infinite ease-in-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(180deg); }
        }
        
        .feature-showcase-card {
          transform: perspective(1000px) rotateY(5deg);
          animation: floatCard 6s ease-in-out infinite;
        }
        
        @keyframes floatCard {
          0%, 100% { transform: perspective(1000px) rotateY(5deg) translateY(0); }
          50% { transform: perspective(1000px) rotateY(5deg) translateY(-20px); }
        }
        
        .step-card:hover .step-icon {
          animation: bounce 0.5s ease;
        }
        
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .role-card {
          transition: all 0.3s ease;
        }
        
        .role-card:hover {
          transform: translateY(-10px);
        }
        
        .testimonial-card {
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
        }
        
        .btn {
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Home;