

// import { useState, useEffect } from "react";
// import API from "./axiosConfig";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [animationStep, setAnimationStep] = useState(0);
//   const [loginType, setLoginType] = useState(null); // 'citizen' or 'officer'

//   // Hero text animation
//   useEffect(() => {
//     const steps = ["Welcome Back", "Access Your Account", "Login to Continue"];
//     let step = 0;
//     const interval = setInterval(() => {
//       setAnimationStep(step);
//       step = (step + 1) % steps.length;
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const citizenRes = await API.post(
//         "http://127.0.0.1:8000/api/citizen/login/",
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       localStorage.setItem("accessToken", citizenRes.data.access);
//       localStorage.setItem("refreshToken", citizenRes.data.refresh);
//       localStorage.setItem("user_type", "citizen");
//       localStorage.setItem("name", citizenRes.data.name);

//       setLoginType("citizen");
//       setTimeout(() => {
//         navigate("/citizen-dashboard");
//       }, 2000);
//       return;

//     } catch (citizenError) {
//       try {
//         const officerRes = await API.post(
//           "http://127.0.0.1:8000/api/officer/login/",
//           {
//             email: formData.email,
//             password: formData.password,
//           }
//         );

//         localStorage.setItem("accessToken", officerRes.data.access);
//         localStorage.setItem("refreshToken", officerRes.data.refresh);
//         localStorage.setItem("user_type", "officer");
//         localStorage.setItem("name", officerRes.data.name);

//         setLoginType("officer");
//         setTimeout(() => {
//           navigate("/officer-dashboard");
//         }, 2000);
//         return;

//       } catch (officerError) {
//         setError("Invalid email or password. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const heroTexts = [
//     "Welcome Back 👋",
//     "Access Your Account 🔐",
//     "Login to Continue 🚀"
//   ];

//   const features = [
//     { icon: "🏛️", title: "Citizen Portal", desc: "File complaints, track progress" },
//     { icon: "👮", title: "Officer Dashboard", desc: "Manage issues, update status" },
//     { icon: "🔔", title: "Real-time Updates", desc: "Instant notifications" },
//     { icon: "📊", title: "Analytics", desc: "Track community issues" }
//   ];

//   return (
//     <div className="container-fluid vh-100 p-0">
//       {/* Success Overlay Animation */}
//       {loginType && (
//         <div className="animate__animated animate__fadeIn animate__faster fixed-top d-flex justify-content-center align-items-center"
//              style={{
//                height: '100vh',
//                backgroundColor: loginType === 'citizen' ? 'rgba(25, 135, 84, 0.95)' : 'rgba(13, 110, 253, 0.95)',
//                zIndex: 9999
//              }}>
//           <div className="text-center text-white">
//             <div className="display-1 mb-4 animate__animated animate__bounceIn">
//               {loginType === 'citizen' ? '👤' : '👮'}
//             </div>
//             <h2 className="animate__animated animate__fadeInUp">
//               {loginType === 'citizen' ? 'Welcome Citizen!' : 'Welcome Officer!'}
//             </h2>
//             <p className="animate__animated animate__fadeInUp animate__delay-1s">
//               Redirecting to dashboard...
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="row g-0 h-100">
//         {/* Left Side - Hero Section */}
//         <div className="col-lg-6 d-none d-lg-flex" 
//              style={{
//                background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)',
//                position: 'relative',
//                overflow: 'hidden'
//              }}>
//           <div className="position-absolute top-0 start-0 w-100 h-100"
//                style={{
//                  background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
//                }}>
//           </div>

//           <div className="position-relative z-1 d-flex flex-column justify-content-center text-white p-5">
//             {/* Animated Hero Text */}
//             <div className="mb-4" style={{ height: '80px' }}>
//               <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeIn">
//                 {heroTexts[animationStep]}
//               </h1>
//               <p className="lead opacity-75 animate__animated animate__fadeIn animate__delay-1s">
//                 Access your personalized dashboard and manage civic issues efficiently
//               </p>
//             </div>

//             {/* Features */}
//             <div className="row mt-5">
//               {features.map((feature, index) => (
//                 <div className="col-6 mb-4" key={index}>
//                   <div className="d-flex align-items-start animate__animated animate__fadeInUp"
//                        style={{ animationDelay: `${index * 0.1}s` }}>
//                     <div className="feature-icon rounded-circle bg-white-10 p-3 me-3 d-flex align-items-center justify-content-center"
//                          style={{ width: '60px', height: '60px' }}>
//                       <span className="fs-3">{feature.icon}</span>
//                     </div>
//                     <div>
//                       <h5 className="fw-semibold mb-1">{feature.title}</h5>
//                       <small className="opacity-75">{feature.desc}</small>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Testimonials Carousel */}
//             <div className="mt-auto pt-5">
//               <div className="d-flex align-items-center bg-white-10 p-4 rounded-4">
//                 <div className="flex-shrink-0">
//                   <div className="rounded-circle bg-white text-primary d-flex align-items-center justify-content-center"
//                        style={{ width: '50px', height: '50px' }}>
//                     <span>👤</span>
//                   </div>
//                 </div>
//                 <div className="ms-3">
//                   <p className="mb-1">"This platform has transformed how we handle civic issues!"</p>
//                   <small className="opacity-75">- Active Citizen</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5">
//           <div className="w-100" style={{ maxWidth: '420px' }}>
//             {/* Logo */}
//             <div className="text-center mb-4 animate__animated animate__fadeIn">
//               <div className="d-inline-block p-3 rounded-3 mb-3"
//                    style={{
//                      background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)',
//                      transform: 'rotate(45deg)'
//                    }}>
//                 <div style={{ transform: 'rotate(-45deg)' }}>
//                   <span className="text-white fs-2">🏛️</span>
//                 </div>
//               </div>
//               <h2 className="h4 text-muted">Civic Management System</h2>
//             </div>

//             {/* Login Card */}
//             <div className="card border-0 shadow-lg animate__animated animate__fadeInUp">
//               <div className="card-body p-4 p-md-5">
//                 <h3 className="h4 fw-bold mb-1">Login to Your Account</h3>
//                 <p className="text-muted mb-4">Enter your credentials to continue</p>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="alert alert-danger animate__animated animate__shakeX d-flex align-items-center"
//                        role="alert">
//                     <span className="me-2">⚠️</span>
//                     <div>{error}</div>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   {/* Email Field */}
//                   <div className="mb-4">
//                     <label htmlFor="email" className="form-label fw-semibold">
//                       <span className="me-2">📧</span>
//                       Email Address
//                     </label>
//                     <div className="input-group input-group-lg">
//                       <span className="input-group-text bg-light border-end-0">
//                         <span className="text-muted">@</span>
//                       </span>
//                       <input
//                         type="email"
//                         className="form-control border-start-0"
//                         id="email"
//                         name="email"
//                         placeholder="your.email@example.com"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         style={{
//                           transition: 'all 0.3s ease'
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = '#0d6efd';
//                           e.target.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.1)';
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = '#ced4da';
//                           e.target.style.boxShadow = 'none';
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Password Field */}
//                   <div className="mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <label htmlFor="password" className="form-label fw-semibold">
//                         <span className="me-2">🔒</span>
//                         Password
//                       </label>
//                       <button
//                         type="button"
//                         className="btn btn-link text-decoration-none p-0"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <small>{showPassword ? '🙈 Hide' : '👁️ Show'}</small>
//                       </button>
//                     </div>
//                     <div className="input-group input-group-lg">
//                       <span className="input-group-text bg-light border-end-0">
//                         <span className="text-muted">🔐</span>
//                       </span>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="form-control border-start-0"
//                         id="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         style={{
//                           transition: 'all 0.3s ease'
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = '#0d6efd';
//                           e.target.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.1)';
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = '#ced4da';
//                           e.target.style.boxShadow = 'none';
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Remember & Forgot */}
//                   <div className="d-flex justify-content-between align-items-center mb-4">
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="remember"
//                       />
//                       <label className="form-check-label text-muted" htmlFor="remember">
//                         Remember me
//                       </label>
//                     </div>
//                     <Link to="/forgot-password" className="text-decoration-none">
//                       <small className="text-primary">Forgot password?</small>
//                     </Link>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="d-grid mb-4">
//                     <button
//                       type="submit"
//                       className="btn btn-primary btn-lg fw-bold py-3"
//                       disabled={loading}
//                       style={{
//                         background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)',
//                         border: 'none',
//                         transition: 'all 0.3s ease',
//                         position: 'relative',
//                         overflow: 'hidden'
//                       }}
//                       onMouseEnter={(e) => {
//                         if (!loading) {
//                           e.target.style.transform = 'translateY(-2px)';
//                           e.target.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = 'none';
//                       }}
//                     >
//                       {loading ? (
//                         <span className="d-flex align-items-center justify-content-center">
//                           <span className="spinner-border spinner-border-sm me-2" 
//                                 role="status" 
//                                 aria-hidden="true"></span>
//                           Authenticating...
//                         </span>
//                       ) : (
//                         <span className="d-flex align-items-center justify-content-center">
//                           <span className="me-2">🚀</span>
//                           Login to Dashboard
//                         </span>
//                       )}
//                     </button>
//                   </div>

//                   {/* Divider */}
//                   <div className="position-relative text-center my-4">
//                     <hr className="w-100" />
//                     <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
//                       OR CONTINUE WITH
//                     </span>
//                   </div>

//                   {/* Demo Accounts */}
//                   <div className="row g-2 mb-4">
//                     <div className="col-6">
//                       <button
//                         type="button"
//                         className="btn btn-outline-primary w-100"
//                         onClick={() => {
//                           setFormData({
//                             email: "citizen@example.com",
//                             password: "demo123"
//                           });
//                         }}
//                       >
//                         <span className="me-2">👤</span>
//                         Citizen Demo
//                       </button>
//                     </div>
//                     <div className="col-6">
//                       <button
//                         type="button"
//                         className="btn btn-outline-success w-100"
//                         onClick={() => {
//                           setFormData({
//                             email: "officer@example.com",
//                             password: "demo123"
//                           });
//                         }}
//                       >
//                         <span className="me-2">👮</span>
//                         Officer Demo
//                       </button>
//                     </div>
//                   </div>

//                   {/* Register Link */}
//                   <div className="text-center pt-3 border-top">
//                     <p className="text-muted mb-0">
//                       Don't have an account?{" "}
//                       <Link to="/register" className="text-primary fw-semibold text-decoration-none">
//                         Register here
//                       </Link>
//                     </p>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Security Badge */}
//             <div className="text-center mt-4">
//               <div className="d-inline-flex align-items-center bg-light rounded-pill px-3 py-1">
//                 <span className="text-success me-2">🔒</span>
//                 <small className="text-muted">Secure SSL Encryption</small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Elements */}
//       <div className="position-fixed top-0 start-0 w-100 h-100" style={{ pointerEvents: 'none', zIndex: 0 }}>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="position-absolute rounded-circle"
//                style={{
//                  width: `${Math.random() * 60 + 20}px`,
//                  height: `${Math.random() * 60 + 20}px`,
//                  top: `${Math.random() * 100}%`,
//                  left: `${Math.random() * 100}%`,
//                  background: 'radial-gradient(circle, rgba(13, 110, 253, 0.1) 0%, transparent 70%)',
//                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
//                  animationDelay: `${i * 2}s`
//                }}>
//           </div>
//         ))}
//       </div>

//       {/* Custom CSS */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }

//         .bg-white-10 {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//         }

//         .feature-icon {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(5px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         .btn-outline-primary:hover {
//           background: linear-gradient(135deg, #0d6efd 0%, #198754 100%);
//           color: white !important;
//           border-color: transparent;
//         }

//         .btn-outline-success:hover {
//           background: linear-gradient(135deg, #198754 0%, #0d6efd 100%);
//           color: white !important;
//           border-color: transparent;
//         }

//         input::placeholder {
//           color: #adb5bd !important;
//           opacity: 0.7;
//         }

//         .form-control:focus {
//           border-color: #0d6efd !important;
//           box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1) !important;
//         }

//         .input-group-text {
//           transition: all 0.3s ease;
//         }

//         .input-group:focus-within .input-group-text {
//           background-color: #e9ecef;
//           border-color: #0d6efd;
//         }

//         .card {
//           border-radius: 20px !important;
//           overflow: hidden;
//         }

//         .btn {
//           border-radius: 12px !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;
// import { useState, useEffect } from "react";
// import API from "./axiosConfig";
// import { useNavigate, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [animationStep, setAnimationStep] = useState(0);
//   const [loginType, setLoginType] = useState(null); // 'citizen', 'officer', or 'staff'

//   // Hero text animation
//   useEffect(() => {
//     const steps = ["Welcome Back", "Access Your Account", "Login to Continue"];
//     let step = 0;
//     const interval = setInterval(() => {
//       setAnimationStep(step);
//       step = (step + 1) % steps.length;
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Try citizen login first
//       const citizenRes = await API.post("/accounts/citizen/login/", {
//         email: formData.email,
//         password: formData.password,
//       });

//       localStorage.setItem("accessToken", citizenRes.data.access);
//       localStorage.setItem("refreshToken", citizenRes.data.refresh);
//       localStorage.setItem("user_type", "citizen");
//       localStorage.setItem("name", citizenRes.data.name);

//       setLoginType("citizen");
//       setTimeout(() => {
//         navigate("/citizen-dashboard");
//       }, 2000);
//       return;

//     } catch (citizenError) {
//       try {
//         // Try officer login second
//         const officerRes = await API.post("/accounts/officer/login/", {
//           email: formData.email,
//           password: formData.password,
//         });

//         localStorage.setItem("accessToken", officerRes.data.access);
//         localStorage.setItem("refreshToken", officerRes.data.refresh);
//         localStorage.setItem("user_type", "officer");
//         localStorage.setItem("name", officerRes.data.name);

//         setLoginType("officer");
//         setTimeout(() => {
//           navigate("/officer-dashboard");
//         }, 2000);
//         return;

//       } catch (officerError) {
//         try {
//           // Try staff login third
//           const staffRes = await API.post("/accounts/staff/login/", formData);

//           // Staff login returns different structure (no JWT tokens)
//           localStorage.setItem("user_type", "staff");
//           localStorage.setItem("staff_id", staffRes.data.staff_id);
//           localStorage.setItem("staff_name", staffRes.data.full_name);

//           setLoginType("staff");
//           setTimeout(() => {
//             navigate("/staff/dashboard");
//           }, 2000);
//           return;

//         } catch (staffError) {
//           setError("Invalid email or password. Please try again.");
//         }
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const heroTexts = [
//     "Welcome Back 👋",
//     "Access Your Account 🔐",
//     "Login to Continue 🚀"
//   ];

//   const features = [
//     { icon: "👤", title: "Citizen Portal", desc: "File complaints, track progress" },
//     { icon: "👮", title: "Officer Dashboard", desc: "Manage issues, update status" },
//     { icon: "👨‍💼", title: "Staff Portal", desc: "Internal operations & management" },
//     { icon: "🔔", title: "Real-time Updates", desc: "Instant notifications" }
//   ];

//   const getLoginTypeIcon = () => {
//     switch(loginType) {
//       case 'citizen': return '👤';
//       case 'officer': return '👮';
//       case 'staff': return '👨‍💼';
//       default: return '👤';
//     }
//   };

//   const getLoginTypeColor = () => {
//     switch(loginType) {
//       case 'citizen': return 'rgba(25, 135, 84, 0.95)';
//       case 'officer': return 'rgba(13, 110, 253, 0.95)';
//       case 'staff': return 'rgba(255, 193, 7, 0.95)';
//       default: return 'rgba(13, 110, 253, 0.95)';
//     }
//   };

//   return (
//     <div className="container-fluid vh-100 p-0">
//       {/* Success Overlay Animation */}
//       {loginType && (
//         <div className="animate__animated animate__fadeIn animate__faster fixed-top d-flex justify-content-center align-items-center"
//              style={{
//                height: '100vh',
//                backgroundColor: getLoginTypeColor(),
//                zIndex: 9999
//              }}>
//           <div className="text-center text-white">
//             <div className="display-1 mb-4 animate__animated animate__bounceIn">
//               {getLoginTypeIcon()}
//             </div>
//             <h2 className="animate__animated animate__fadeInUp">
//               {loginType === 'citizen' ? 'Welcome Citizen!' : 
//                loginType === 'officer' ? 'Welcome Officer!' : 
//                'Welcome Staff Member!'}
//             </h2>
//             <p className="animate__animated animate__fadeInUp animate__delay-1s">
//               Redirecting to dashboard...
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="row g-0 h-100">
//         {/* Left Side - Hero Section */}
//         <div className="col-lg-6 d-none d-lg-flex" 
//              style={{
//                background: 'linear-gradient(135deg, #0d6efd 0%, #ffc107 100%)',
//                position: 'relative',
//                overflow: 'hidden'
//              }}>
//           <div className="position-absolute top-0 start-0 w-100 h-100"
//                style={{
//                  background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
//                }}>
//           </div>

//           <div className="position-relative z-1 d-flex flex-column justify-content-center text-white p-5">
//             {/* Animated Hero Text */}
//             <div className="mb-4" style={{ height: '80px' }}>
//               <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeIn">
//                 {heroTexts[animationStep]}
//               </h1>
//               <p className="lead opacity-75 animate__animated animate__fadeIn animate__delay-1s">
//                 Unified login portal for citizens, officers, and staff members
//               </p>
//             </div>

//             {/* Features */}
//             <div className="row mt-5">
//               {features.map((feature, index) => (
//                 <div className="col-6 mb-4" key={index}>
//                   <div className="d-flex align-items-start animate__animated animate__fadeInUp"
//                        style={{ animationDelay: `${index * 0.1}s` }}>
//                     <div className="feature-icon rounded-circle bg-white-10 p-3 me-3 d-flex align-items-center justify-content-center"
//                          style={{ width: '60px', height: '60px' }}>
//                       <span className="fs-3">{feature.icon}</span>
//                     </div>
//                     <div>
//                       <h5 className="fw-semibold mb-1">{feature.title}</h5>
//                       <small className="opacity-75">{feature.desc}</small>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* User Role Indicators */}
//             <div className="row mt-4">
//               <div className="col-4">
//                 <div className="text-center">
//                   <div className="bg-white-10 rounded-3 p-3 mb-2">
//                     <span className="fs-1">👤</span>
//                   </div>
//                   <small>Citizen</small>
//                 </div>
//               </div>
//               <div className="col-4">
//                 <div className="text-center">
//                   <div className="bg-white-10 rounded-3 p-3 mb-2">
//                     <span className="fs-1">👮</span>
//                   </div>
//                   <small>Officer</small>
//                 </div>
//               </div>
//               <div className="col-4">
//                 <div className="text-center">
//                   <div className="bg-white-10 rounded-3 p-3 mb-2">
//                     <span className="fs-1">👨‍💼</span>
//                   </div>
//                   <small>Staff</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5">
//           <div className="w-100" style={{ maxWidth: '420px' }}>
//             {/* Logo */}
//             <div className="text-center mb-4 animate__animated animate__fadeIn">
//               <div className="d-inline-block p-3 rounded-3 mb-3"
//                    style={{
//                      background: 'linear-gradient(135deg, #0d6efd 0%, #ffc107 100%)',
//                      transform: 'rotate(45deg)'
//                    }}>
//                 <div style={{ transform: 'rotate(-45deg)' }}>
//                   <span className="text-white fs-2">🏛️</span>
//                 </div>
//               </div>
//               <h2 className="h4 text-muted">Unified Login Portal</h2>
//             </div>

//             {/* Login Card */}
//             <div className="card border-0 shadow-lg animate__animated animate__fadeInUp">
//               <div className="card-body p-4 p-md-5">
//                 <h3 className="h4 fw-bold mb-1">Login to Your Account</h3>
//                 <p className="text-muted mb-4">Enter your credentials to continue</p>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="alert alert-danger animate__animated animate__shakeX d-flex align-items-center"
//                        role="alert">
//                     <span className="me-2">⚠️</span>
//                     <div>{error}</div>
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   {/* Email Field */}
//                   <div className="mb-4">
//                     <label htmlFor="email" className="form-label fw-semibold">
//                       <span className="me-2">📧</span>
//                       Email Address
//                     </label>
//                     <div className="input-group input-group-lg">
//                       <span className="input-group-text bg-light border-end-0">
//                         <span className="text-muted">@</span>
//                       </span>
//                       <input
//                         type="email"
//                         className="form-control border-start-0"
//                         id="email"
//                         name="email"
//                         placeholder="your.email@example.com"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         style={{
//                           transition: 'all 0.3s ease'
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = '#0d6efd';
//                           e.target.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.1)';
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = '#ced4da';
//                           e.target.style.boxShadow = 'none';
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Password Field */}
//                   <div className="mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <label htmlFor="password" className="form-label fw-semibold">
//                         <span className="me-2">🔒</span>
//                         Password
//                       </label>
//                       <button
//                         type="button"
//                         className="btn btn-link text-decoration-none p-0"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         <small>{showPassword ? '🙈 Hide' : '👁️ Show'}</small>
//                       </button>
//                     </div>
//                     <div className="input-group input-group-lg">
//                       <span className="input-group-text bg-light border-end-0">
//                         <span className="text-muted">🔐</span>
//                       </span>
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         className="form-control border-start-0"
//                         id="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         style={{
//                           transition: 'all 0.3s ease'
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = '#0d6efd';
//                           e.target.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.1)';
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = '#ced4da';
//                           e.target.style.boxShadow = 'none';
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* User Type Info */}
//                   <div className="alert alert-info mb-4">
//                     <small className="d-flex align-items-center">
//                       <span className="me-2">ℹ️</span>
//                       This portal supports Citizen, Officer, and Staff accounts.
//                     </small>
//                   </div>

//                   {/* Remember & Forgot */}
//                   <div className="d-flex justify-content-between align-items-center mb-4">
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         id="remember"
//                       />
//                       <label className="form-check-label text-muted" htmlFor="remember">
//                         Remember me
//                       </label>
//                     </div>
//                     <Link to="/forgot-password" className="text-decoration-none">
//                       <small className="text-primary">Forgot password?</small>
//                     </Link>
//                   </div>

//                   {/* Submit Button */}
//                   <div className="d-grid mb-4">
//                     <button
//                       type="submit"
//                       className="btn btn-primary btn-lg fw-bold py-3"
//                       disabled={loading}
//                       style={{
//                         background: 'linear-gradient(135deg, #0d6efd 0%, #ffc107 100%)',
//                         border: 'none',
//                         transition: 'all 0.3s ease',
//                         position: 'relative',
//                         overflow: 'hidden'
//                       }}
//                       onMouseEnter={(e) => {
//                         if (!loading) {
//                           e.target.style.transform = 'translateY(-2px)';
//                           e.target.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = 'none';
//                       }}
//                     >
//                       {loading ? (
//                         <span className="d-flex align-items-center justify-content-center">
//                           <span className="spinner-border spinner-border-sm me-2" 
//                                 role="status" 
//                                 aria-hidden="true"></span>
//                           Authenticating...
//                         </span>
//                       ) : (
//                         <span className="d-flex align-items-center justify-content-center">
//                           <span className="me-2">🚀</span>
//                           Login to Dashboard
//                         </span>
//                       )}
//                     </button>
//                   </div>

//                   {/* Divider */}
//                   <div className="position-relative text-center my-4">
//                     <hr className="w-100" />
//                     <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
//                       OR CONTINUE WITH
//                     </span>
//                   </div>

//                   {/* Demo Accounts */}
//                   <div className="row g-2 mb-4">
//                     <div className="col-4">
//                       <button
//                         type="button"
//                         className="btn btn-outline-success w-100"
//                         onClick={() => {
//                           setFormData({
//                             email: "citizen@example.com",
//                             password: "demo123"
//                           });
//                         }}
//                       >
//                         <span className="me-2">👤</span>
//                         Citizen
//                       </button>
//                     </div>
//                     <div className="col-4">
//                       <button
//                         type="button"
//                         className="btn btn-outline-primary w-100"
//                         onClick={() => {
//                           setFormData({
//                             email: "officer@example.com",
//                             password: "demo123"
//                           });
//                         }}
//                       >
//                         <span className="me-2">👮</span>
//                         Officer
//                       </button>
//                     </div>
//                     <div className="col-4">
//                       <button
//                         type="button"
//                         className="btn btn-outline-warning w-100"
//                         onClick={() => {
//                           setFormData({
//                             email: "staff@example.com",
//                             password: "demo123"
//                           });
//                         }}
//                       >
//                         <span className="me-2">👨‍💼</span>
//                         Staff
//                       </button>
//                     </div>
//                   </div>

//                   {/* Register Links */}
//                   <div className="text-center pt-3 border-top">
//                     <div className="row">
//                       <div className="col-4">
//                         <Link to="/register-citizen" className="text-decoration-none">
//                           <small className="text-success fw-semibold">Citizen Sign Up</small>
//                         </Link>
//                       </div>
//                       <div className="col-4">
//                         <Link to="/register-officer" className="text-decoration-none">
//                           <small className="text-primary fw-semibold">Officer Sign Up</small>
//                         </Link>
//                       </div>
//                       <div className="col-4">
//                         <Link to="/register-staff" className="text-decoration-none">
//                           <small className="text-warning fw-semibold">Staff Sign Up</small>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Security Badge */}
//             <div className="text-center mt-4">
//               <div className="d-inline-flex align-items-center bg-light rounded-pill px-3 py-1">
//                 <span className="text-success me-2">🔒</span>
//                 <small className="text-muted">Secure SSL Encryption</small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Elements */}
//       <div className="position-fixed top-0 start-0 w-100 h-100" style={{ pointerEvents: 'none', zIndex: 0 }}>
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="position-absolute rounded-circle"
//                style={{
//                  width: `${Math.random() * 60 + 20}px`,
//                  height: `${Math.random() * 60 + 20}px`,
//                  top: `${Math.random() * 100}%`,
//                  left: `${Math.random() * 100}%`,
//                  background: 'radial-gradient(circle, rgba(13, 110, 253, 0.1) 0%, transparent 70%)',
//                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
//                  animationDelay: `${i * 2}s`
//                }}>
//           </div>
//         ))}
//       </div>

//       {/* Custom CSS */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(180deg); }
//         }

//         .bg-white-10 {
//           background: rgba(255, 255, 255, 0.1);
//           backdrop-filter: blur(10px);
//         }

//         .feature-icon {
//           background: rgba(255, 255, 255, 0.15);
//           backdrop-filter: blur(5px);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//         }

//         .btn-outline-success:hover {
//           background: linear-gradient(135deg, #198754 0%, #0d6efd 100%);
//           color: white !important;
//           border-color: transparent;
//         }

//         .btn-outline-primary:hover {
//           background: linear-gradient(135deg, #0d6efd 0%, #ffc107 100%);
//           color: white !important;
//           border-color: transparent;
//         }

//         .btn-outline-warning:hover {
//           background: linear-gradient(135deg, #ffc107 0%, #198754 100%);
//           color: white !important;
//           border-color: transparent;
//         }

//         input::placeholder {
//           color: #adb5bd !important;
//           opacity: 0.7;
//         }

//         .form-control:focus {
//           border-color: #0d6efd !important;
//           box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1) !important;
//         }

//         .input-group-text {
//           transition: all 0.3s ease;
//         }

//         .input-group:focus-within .input-group-text {
//           background-color: #e9ecef;
//           border-color: #0d6efd;
//         }

//         .card {
//           border-radius: 20px !important;
//           overflow: hidden;
//         }

//         .btn {
//           border-radius: 12px !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from "react";
import API from "./axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [loginType, setLoginType] = useState(null); // 'citizen', 'officer', or 'staff'

  // Hero text animation
  useEffect(() => {
    const steps = ["Welcome Back", "Access Your Account", "Login to Continue"];
    let step = 0;
    const interval = setInterval(() => {
      setAnimationStep(step);
      step = (step + 1) % steps.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // FIRST: Try staff login (since you're having staff login issues)
      try {
        const staffRes = await API.post("/accounts/staff/login/", formData);
        console.log("Staff login response:", staffRes.data);

        // ✅ FIX: Store JWT tokens if they exist in staff response
        if (staffRes.data.access) {
          localStorage.setItem("accessToken", staffRes.data.access);
          localStorage.setItem("refreshToken", staffRes.data.refresh);
        }
        
        localStorage.setItem("user_type", "staff");
        localStorage.setItem("staff_id", staffRes.data.staff_id || "");
        localStorage.setItem("staff_name", staffRes.data.full_name || "");
        localStorage.setItem("name", staffRes.data.full_name || "");

        setLoginType("staff");
        setTimeout(() => {
          navigate("/staff/dashboard");
        }, 2000);
        return;

      } catch (staffError) {
        console.log("Staff login failed, trying citizen...");
        // Staff login failed, try citizen
      }

      // SECOND: Try citizen login
      try {
        const citizenRes = await API.post("/accounts/citizen/login/", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("accessToken", citizenRes.data.access);
        localStorage.setItem("refreshToken", citizenRes.data.refresh);
        localStorage.setItem("user_type", "citizen");
        localStorage.setItem("name", citizenRes.data.name);

        setLoginType("citizen");
        setTimeout(() => {
          navigate("/citizen-dashboard");
        }, 2000);
        return;

      } catch (citizenError) {
        console.log("Citizen login failed, trying officer...");
        // Citizen login failed, try officer
      }

      // THIRD: Try officer login
      try {
        const officerRes = await API.post("/accounts/officer/login/", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("accessToken", officerRes.data.access);
        localStorage.setItem("refreshToken", officerRes.data.refresh);
        localStorage.setItem("user_type", "officer");
        localStorage.setItem("name", officerRes.data.name);

        setLoginType("officer");
        setTimeout(() => {
          navigate("/officer-dashboard");
        }, 2000);
        return;

      } catch (officerError) {
        // All login attempts failed
        console.log("All login attempts failed");
        setError("Invalid email or password. Please try again.");
      }

    } catch (finalError) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const heroTexts = [
    "Welcome Back 👋",
    "Access Your Account 🔐",
    "Login to Continue 🚀"
  ];

  const features = [
    { icon: "👤", title: "Citizen Portal", desc: "File complaints, track progress" },
    { icon: "👮", title: "Officer Dashboard", desc: "Manage issues, update status" },
    { icon: "👨‍💼", title: "Staff Portal", desc: "Internal operations & management" },
    { icon: "🔔", title: "Real-time Updates", desc: "Instant notifications" }
  ];

  const getLoginTypeIcon = () => {
    switch(loginType) {
      case 'citizen': return '👤';
      case 'officer': return '👮';
      case 'staff': return '👨‍💼';
      default: return '👤';
    }
  };

  const getLoginTypeColor = () => {
    switch(loginType) {
      case 'citizen': return 'rgba(25, 135, 84, 0.95)';
      case 'officer': return 'rgba(13, 110, 253, 0.95)';
      case 'staff': return 'rgba(255, 193, 7, 0.95)';
      default: return 'rgba(13, 110, 253, 0.95)';
    }
  };

  return (
    <div className="container-fluid vh-100 p-0">
      {/* Success Overlay Animation */}
      {loginType && (
        <div className="animate__animated animate__fadeIn animate__faster fixed-top d-flex justify-content-center align-items-center"
             style={{
               height: '100vh',
               backgroundColor: getLoginTypeColor(),
               zIndex: 9999
             }}>
          <div className="text-center text-white">
            <div className="display-1 mb-4 animate__animated animate__bounceIn">
              {getLoginTypeIcon()}
            </div>
            <h2 className="animate__animated animate__fadeInUp">
              {loginType === 'citizen' ? 'Welcome Citizen!' : 
               loginType === 'officer' ? 'Welcome Officer!' : 
               'Welcome Staff Member!'}
            </h2>
            <p className="animate__animated animate__fadeInUp animate__delay-1s">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      )}

      <div className="row g-0 h-100">
        {/* Left Side - Hero Section */}
        <div className="col-lg-6 d-none d-lg-flex" 
             style={{
               background: 'linear-gradient(135deg, #0d6efd 0%, #ffc107 100%)',
               position: 'relative',
               overflow: 'hidden'
             }}>
          <div className="position-absolute top-0 start-0 w-100 h-100"
               style={{
                 background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
               }}>
          </div>

          <div className="position-relative z-1 d-flex flex-column justify-content-center text-white p-5">
            {/* Animated Hero Text */}
            <div className="mb-4" style={{ height: '80px' }}>
              <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeIn">
                {heroTexts[animationStep]}
              </h1>
              <p className="lead opacity-75 animate__animated animate__fadeIn animate__delay-1s">
                Unified login portal for citizens, officers, and staff members
              </p>
            </div>

            {/* Features */}
            <div className="row mt-5">
              {features.map((feature, index) => (
                <div className="col-6 mb-4" key={index}>
                  <div className="d-flex align-items-start animate__animated animate__fadeInUp"
                       style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="feature-icon rounded-circle bg-white-10 p-3 me-3 d-flex align-items-center justify-content-center"
                         style={{ width: '60px', height: '60px' }}>
                      <span className="fs-3">{feature.icon}</span>
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-1">{feature.title}</h5>
                      <small className="opacity-75">{feature.desc}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* User Role Indicators */}
            <div className="row mt-4">
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-white-10 rounded-3 p-3 mb-2">
                    <span className="fs-1">👤</span>
                  </div>
                  <small>Citizen</small>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-white-10 rounded-3 p-3 mb-2">
                    <span className="fs-1">👮</span>
                  </div>
                  <small>Officer</small>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center">
                  <div className="bg-white-10 rounded-3 p-3 mb-2">
                    <span className="fs-1">👨‍💼</span>
                  </div>
                  <small>Staff</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4 p-md-5">
          <div className="w-100" style={{ maxWidth: '420px' }}>
            {/* Logo */}
            <div className="text-center mb-4 animate__animated animate__fadeIn">
              <div className="d-inline-block p-3 rounded-3 mb-3"
                   style={{
                     background: 'linear-gradient(135deg, #0d6efd 0%, #ffc107 100%)',
                     transform: 'rotate(45deg)'
                   }}>
                <div style={{ transform: 'rotate(-45deg)' }}>
                  <span className="text-white fs-2">🏛️</span>
                </div>
              </div>
              <h2 className="h4 text-muted">Unified Login Portal</h2>
            </div>

            {/* Login Card */}
            <div className="card border-0 shadow-lg animate__animated animate__fadeInUp">
              <div className="card-body p-4 p-md-5">
                <h3 className="h4 fw-bold mb-1">Login to Your Account</h3>
                <p className="text-muted mb-4">Enter your credentials to continue</p>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger animate__animated animate__shakeX d-flex align-items-center"
                       role="alert">
                    <span className="me-2">⚠️</span>
                    <div>{error}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">
                      <span className="me-2">📧</span>
                      Email Address
                    </label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0">
                        <span className="text-muted">@</span>
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0d6efd';
                          e.target.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#ced4da';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label htmlFor="password" className="form-label fw-semibold">
                        <span className="me-2">🔒</span>
                        Password
                      </label>
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <small>{showPassword ? '🙈 Hide' : '👁️ Show'}</small>
                      </button>
                    </div>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light border-end-0">
                        <span className="text-muted">🔐</span>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-start-0"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#0d6efd';
                          e.target.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#ced4da';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* User Type Info */}
                  <div className="alert alert-info mb-4">
                    <small className="d-flex align-items-center">
                      <span className="me-2">ℹ️</span>
                      This portal supports Citizen, Officer, and Staff accounts.
                    </small>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />
                      <label className="form-check-label text-muted" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forgot-password" className="text-decoration-none">
                      <small className="text-primary">Forgot password?</small>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid mb-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg fw-bold py-3"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #0d6efd 0%, #ffc107 100%)',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {loading ? (
                        <span className="d-flex align-items-center justify-content-center">
                          <span className="spinner-border spinner-border-sm me-2" 
                                role="status" 
                                aria-hidden="true"></span>
                          Authenticating...
                        </span>
                      ) : (
                        <span className="d-flex align-items-center justify-content-center">
                          <span className="me-2">🚀</span>
                          Login to Dashboard
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="position-relative text-center my-4">
                    <hr className="w-100" />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                      OR CONTINUE WITH
                    </span>
                  </div>

                  {/* Demo Accounts */}
                  <div className="row g-2 mb-4">
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-outline-success w-100"
                        onClick={() => {
                          setFormData({
                            email: "citizen@example.com",
                            password: "demo123"
                          });
                        }}
                      >
                        <span className="me-2">👤</span>
                        Citizen
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100"
                        onClick={() => {
                          setFormData({
                            email: "officer@example.com",
                            password: "demo123"
                          });
                        }}
                      >
                        <span className="me-2">👮</span>
                        Officer
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        type="button"
                        className="btn btn-outline-warning w-100"
                        onClick={() => {
                          setFormData({
                            email: "staff@example.com",
                            password: "demo123"
                          });
                        }}
                      >
                        <span className="me-2">👨‍💼</span>
                        Staff
                      </button>
                    </div>
                  </div>

                  {/* Register Links */}
                  <div className="text-center pt-3 border-top">
                    <div className="row">
                      <div className="col-4">
                        <Link to="/register-citizen" className="text-decoration-none">
                          <small className="text-success fw-semibold">Citizen Sign Up</small>
                        </Link>
                      </div>
                      <div className="col-4">
                        <Link to="/register-officer" className="text-decoration-none">
                          <small className="text-primary fw-semibold">Officer Sign Up</small>
                        </Link>
                      </div>
                      <div className="col-4">
                        <Link to="/register-staff" className="text-decoration-none">
                          <small className="text-warning fw-semibold">Staff Sign Up</small>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Security Badge */}
            <div className="text-center mt-4">
              <div className="d-inline-flex align-items-center bg-light rounded-pill px-3 py-1">
                <span className="text-success me-2">🔒</span>
                <small className="text-muted">Secure SSL Encryption</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{ pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="position-absolute rounded-circle"
               style={{
                 width: `${Math.random() * 60 + 20}px`,
                 height: `${Math.random() * 60 + 20}px`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 background: 'radial-gradient(circle, rgba(13, 110, 253, 0.1) 0%, transparent 70%)',
                 animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                 animationDelay: `${i * 2}s`
               }}>
          </div>
        ))}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .bg-white-10 {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .feature-icon {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-outline-success:hover {
          background: linear-gradient(135deg, #198754 0%, #0d6efd 100%);
          color: white !important;
          border-color: transparent;
        }

        .btn-outline-primary:hover {
          background: linear-gradient(135deg, #0d6efd 0%, #ffc107 100%);
          color: white !important;
          border-color: transparent;
        }

        .btn-outline-warning:hover {
          background: linear-gradient(135deg, #ffc107 0%, #198754 100%);
          color: white !important;
          border-color: transparent;
        }

        input::placeholder {
          color: #adb5bd !important;
          opacity: 0.7;
        }

        .form-control:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1) !important;
        }

        .input-group-text {
          transition: all 0.3s ease;
        }

        .input-group:focus-within .input-group-text {
          background-color: #e9ecef;
          border-color: #0d6efd;
        }

        .card {
          border-radius: 20px !important;
          overflow: hidden;
        }

        .btn {
          border-radius: 12px !important;
        }
      `}</style>
    </div>
  );
};

export default Login;