import React from 'react';
import { Heart, Users, BookOpen, MessageCircle } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title funky-font">Welcome to Mommy's World</h1>
        <p className="hero-subtitle">
          A supportive community where mothers come together to share, learn, and grow
        </p>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto">
        <div className="mission-card">
          <h2 className="mission-title funky-font">Our Mission</h2>
          <p className="mission-text">
            To create a nurturing and supportive environment where mothers can connect, 
            share their experiences, track their children's growth, and access valuable 
            resources for their parenting journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-header">
              <Heart className="feature-icon" />
              <h3 className="feature-title funky-font">Supportive Community</h3>
            </div>
            <p className="feature-text">
              Connect with other mothers, share your experiences, and find support 
              in our warm and welcoming community.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <BookOpen className="feature-icon" />
              <h3 className="feature-title funky-font">Resource Hub</h3>
            </div>
            <p className="feature-text">
              Access helpful parenting tips, nutritious recipes, and expert advice 
              to support your family's well-being.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <MessageCircle className="feature-icon" />
              <h3 className="feature-title funky-font">Parents Helping Parents</h3>
            </div>
            <p className="feature-text">
              Share advice, ask questions, and learn from other parents' experiences 
              in our collaborative community forum.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-header">
              <Users className="feature-icon" />
              <h3 className="feature-title funky-font">Growth Tracking</h3>
            </div>
            <p className="feature-text">
              Document and celebrate your child's milestones, create beautiful photo 
              albums, and preserve precious memories.
            </p>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="join-section">
          <h2 className="join-title funky-font">Join Our Community</h2>
          <p className="join-text">
            Become part of a supportive network of mothers who understand and 
            celebrate the joys and challenges of parenthood.
          </p>
          <button 
            onClick={() => window.location.href = '/Login'}
            className="join-button"
          >
            Sign Up Now
          </button>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2 className="values-title funky-font">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title funky-font">Support</h3>
              <p className="value-text">
                Creating a safe and nurturing environment where every mother feels heard 
                and supported.
              </p>
            </div>
            <div className="value-card">
              <h3 className="value-title funky-font">Community</h3>
              <p className="value-text">
                Building meaningful connections and fostering a sense of belonging among 
                parents.
              </p>
            </div>
            <div className="value-card">
              <h3 className="value-title funky-font">Growth</h3>
              <p className="value-text">
                Encouraging personal development and celebrating every milestone in your 
                parenting journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;