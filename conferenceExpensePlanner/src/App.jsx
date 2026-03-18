import { useState } from 'react'
import './App.css'
import ConferenceEventPlanner from './components/ConferenceEventPlanner'
import './components/ConferenceEventPlanner.css'
function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
  };
  return (
    <>
      <header className="index-container">
        <div className='content-box'>
          <div className='get-started'>
            <span className='badge'>Expense Management</span>
            <h1>Conference Expense Planner</h1>
            <div className='divider'></div>
            <p>Plan your conference expenses with ease.</p>
            <button className='get-started-button' onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className='welcome-section'>
            <p>Hey there, welcome to Conference Expense Planner! Whether you're heading to your first conference or you're a seasoned attendee, keeping track of expenses can be a real headache. That's why we built this, a simple, friendly tool to help you stay on top of your travel, meals, accommodation, and registration costs without the stress. Just add your expenses, set your budget, and let us do the heavy lifting. More time networking, less time worrying about receipts!</p>
          </div>
        </div>
      </header>
      <div className={`planner-container ${showVenue ? 'show' : ''}`}>
      <ConferenceEventPlanner />
      </div>
    </>
  )
}

export default App
