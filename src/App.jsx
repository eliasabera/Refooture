// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimationProvider } from "./contexts/AnimationContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import ScrollToTopWrapper from "./components/ScrollToTopWrapper";
import { Home, About, Projects, Insights, Contact } from "./pages";

function App() {
  return (
    <Router>
      <AnimationProvider>
        <NavigationProvider>
          <ScrollToTopWrapper>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/contact" element={<Contact />} />

                {/* Fallback route - redirect to home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </ScrollToTopWrapper>
        </NavigationProvider>
      </AnimationProvider>
    </Router>
  );
}

export default App;
