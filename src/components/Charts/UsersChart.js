import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, Bar, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';

export default function Chart() {

  const useApi = useFetchWrapper();
  const [stats, setStats] = useState([])

  const fetchData = async () => {
    setStats(await useApi.post('/stats/newUsersPerMonths'))

  }
  useEffect(() => {
    fetchData();

  }, [])

  return (
    <React.Fragment>
      <Title>Ilość nowych użytkowników w roku</Title>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" name="Użytkownicy" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}