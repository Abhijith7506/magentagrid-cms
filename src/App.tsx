import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import EditPost from "./pages/EditPost";
import PreviewPost from "./pages/PreviewPost";
import NotFound from "./pages/NotFound";
import { PostsProvider } from "./context/PostsContext";



function App() {
  return (
    <AuthProvider>
       <PostsProvider>
    <BrowserRouter>
      
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />   
               
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>

          }
        />

        <Route
          path="/dashboard/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
  path="/dashboard/edit/:id"
  element={
    <ProtectedRoute>
      <EditPost />
    </ProtectedRoute>
  }
/>
<Route 
      path="/dashboard/preview/:id" 
      element={ 
        <ProtectedRoute> 
          <PreviewPost /> 
        </ProtectedRoute> 
      } 
    />  
    <Route path="*" element={<NotFound />} />
      </Routes>   

       
    </BrowserRouter>
    </PostsProvider>
    </AuthProvider>
   
  );
}

export default App;