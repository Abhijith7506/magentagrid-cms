function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">WELCOME TO MAGENTAGRID</p>

          <h1>
            Create. Manage.
            <br />
            <span>Share.</span>
          </h1>

          <p className="home-description">
            A simple and modern content platform designed to help you create,
            manage, and publish content with ease.
          </p>

          <div className="home-actions">
            <a href="/blog" className="home-primary-button">
              Explore Blog
            </a>

            <a href="/about" className="home-secondary-button">
              Learn More
            </a>
          </div>
        </div>

        <div className="home-hero-card">
          <div className="home-card-top">
            <span>MagentaGrid</span>
            <span>CMS</span>
          </div>

          <div className="home-card-content">
            <span className="home-card-label">CONTENT PLATFORM</span>
            <h2>Ideas into stories.</h2>
            <p>
              Create, organize, preview and publish your content from one
              place.
            </p>
          </div>

          <div className="home-card-bottom">
            <span>CREATE</span>
            <span>MANAGE</span>
            <span>PUBLISH</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;