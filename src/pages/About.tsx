function About() {
  return (
    <div className="about-page">
      <h1>About Us</h1>

      <section className="about-section">
        <h2>Welcome to MagentaGrid</h2>
        <p>
          <strong>MagentaGrid</strong> is a modern digital platform focused on
          making content creation and publishing simple, organized, and
          accessible.
        </p>

        <p>
          We believe managing content should not feel complicated. MagentaGrid
          brings the tools needed to create, edit, review, and publish content
          into one clean and easy-to-use platform.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Do</h2>

        <div className="about-features">
          <div className="about-feature">
            <span>✍️</span>
            <div>
              <h3>Create</h3>
              <p>
                Turn ideas into meaningful and engaging content.
              </p>
            </div>
          </div>

          <div className="about-feature">
            <span>📝</span>
            <div>
              <h3>Manage</h3>
              <p>
                Keep content organized and make updates whenever needed.
              </p>
            </div>
          </div>

          <div className="about-feature">
            <span>👀</span>
            <div>
              <h3>Review</h3>
              <p>
                Preview content before sharing it with your audience.
              </p>
            </div>
          </div>

          <div className="about-feature">
            <span>🚀</span>
            <div>
              <h3>Publish</h3>
              <p>
                Move finished content from draft to published with a simple
                workflow.
              </p>
            </div>
          </div>

          <div className="about-feature">
            <span>🔐</span>
            <div>
              <h3>Collaborate Securely</h3>
              <p>
                Manage access with different user roles and permissions.
              </p>
            </div>
          </div>

          <div className="about-feature">
            <span>📚</span>
            <div>
              <h3>Stay Organized</h3>
              <p>
                Keep your content structured and easy to manage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Approach</h2>
        <p>
          We focus on keeping things <strong>simple, clear, and efficient.</strong>
        </p>

        <p>
          A good content platform should provide the features teams need
          without making everyday tasks unnecessarily complicated. That's why
          MagentaGrid is designed with a clean interface and straightforward
          workflows that make content management easier.
        </p>
      </section>

      <section className="about-section">
        <h2>Built for Creators and Teams</h2>
        <p>
          Whether you're managing a personal blog, a business website, or a
          growing content platform, MagentaGrid provides a simple foundation
          for managing and sharing content.
        </p>

        <p>
          We want users to spend less time worrying about the publishing
          process and more time creating content that matters.
        </p>
      </section>

      <div className="about-tagline">
        <h2>Create. Manage. Review. Publish.</h2>
        <p>That's MagentaGrid.</p>
      </div>
    </div>
  );
}

export default About;