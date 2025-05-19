import { Link } from "react-router-dom";
import "../index.css";

const Home = () => {
  return (
    <div className="home-container">
      <main>
        <section className="intro">
          <div className="content">
            <p className="caption">
              Did you end up overspending for 3 months in a row?<br />
              Or need help planning a budget for that new Camera?
            </p>
            <h2>Your one-stop solution for all your financial tracking needs!</h2>
            <Link to="/signup" className="gs-button">Get Started</Link>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Why Choose FinTrack?</h2>
          <div className="features">
            <div className="feature">
              <h3>Track Expenses</h3>
              <p>Easily monitor where your money goes every month.</p>
            </div>
            <div className="feature">
              <h3>Set Goals</h3>
              <p>Create financial goals and track your progress in real-time.</p>
            </div>
            <div className="feature">
              <h3>Insights</h3>
              <p>Receive personalized budgeting insights to optimize your spending.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How does FinTrack work?</h3>
            <p>FinTrack tracks and analyzes your income and expenses to help you manage your finances efficiently.</p>
          </div>
          <div className="faq-item">
            <h3>How do I set savings goals?</h3>
            <p>Go to the "Goals" section in the website, specify your savings target, and track progress.</p>
          </div>
          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>Absolutely! FinTrack uses end-to-end encryption to ensure your data remains private and secure.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
