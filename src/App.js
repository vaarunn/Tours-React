import React, { useState, useEffect } from 'react';
import Tours from './Tours';
import Tour from './Tour';
import Loading from './Loading';
const url = 'https://course-api.com/react-tours-project';
const App = () => {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState('');

  const removeTours = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //we need fetchData to be invoked first time app is rendered
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchData()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTours={removeTours} />
    </main>
  );
};

export default App;
