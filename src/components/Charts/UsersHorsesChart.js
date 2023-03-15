import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import Title from '../Title';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';


export default function UsersHorsesChart() {
  const theme = useTheme();

  const useApi = useFetchWrapper();
  const [stats, setStats] = useState([])

  const fetchData = async () => {
    setStats(await useApi.post('/stats/usersType'))
    // setStats([
    //   {
    //     "name": "Group A",
    //     "value": 400
    //   },
    //   {
    //     "name": "Group B",
    //     "value": 300
    //   },
    //   {
    //     "name": "Group C",
    //     "value": 300
    //   },
    //   {
    //     "name": "Group D",
    //     "value": 200
    //   },
    //   {
    //     "name": "Group E",
    //     "value": 278
    //   },
    //   {
    //     "name": "Group F",
    //     "value": 189
    //   }
    // ])
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
      <div style={{  height: 0 }}>
        <Title style={{height: 50}}>Ilości użytkowników względem rodzaju podpięcia</Title>
      </div>
      <ResponsiveContainer>

        <PieChart width={730} height={250}>
          <Pie
            data={stats}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {stats.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>

      </ResponsiveContainer>
    </React.Fragment>
  );
}