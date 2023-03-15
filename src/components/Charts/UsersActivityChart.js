import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Title from '../Title';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';


export default function UsersHorsesChart() {

  const useApi = useFetchWrapper();
  const [stats, setStats] = useState([])

  const fetchData = async () => {
    setStats(await useApi.post('/stats/usersActivityPerDays'))

  }
  useEffect(() => {
    fetchData();

  }, [])
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7d17b6'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {stats[index].value}
      </text>
    );
  };

  return (
    <React.Fragment>
      <div style={{ height: 40 }}>
        <Title style={{ height: 50 }}>Dzienna aktywność użytkowników</Title>
      </div>
      <ResponsiveContainer height="80%">

        <AreaChart
          width={500}
          height={200}
          data={stats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amount" name="Ilość użytkowników" stroke="#00498F" fill="#00498F" activeDot={{ r: 8 }} />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}