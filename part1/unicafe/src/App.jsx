import { useState } from 'react';

const Statistics = ({ good, neutral, bad, available }) => {
  const total = good + neutral + bad;
  const positive = (good / total) * 100;
  const negative = (bad / total) * 100;
  const average = (positive - negative) / 100;

  return (
    <div>
      <h2>Statistics</h2>
      {available ? (
        <table>
          <tbody>
            <StatisticLine text={'Good'} value={good} />
            <StatisticLine text={'Neutral'} value={neutral} />
            <StatisticLine text={'Bad'} value={bad} />
            <StatisticLine text={'All'} value={total} />
            <StatisticLine text={'Average'} value={average} />
            <StatisticLine text={'Positive'} value={`${positive} %`} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const isStatisticsAvailable = good !== 0 || neutral !== 0 || bad !== 0;

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={handleGoodClick} text={'Good'} />
      <Button onClick={handleNeutralClick} text={'Neutral'} />
      <Button onClick={handleBadClick} text={'Bad'} />
      <Statistics
        available={isStatisticsAvailable}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
