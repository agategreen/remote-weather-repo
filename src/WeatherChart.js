import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherChart = (props) => {
    const chartData = props.forecast_data.map(item => ({
      dt_txt: item.dt_txt,
      temp_min: item.temp_min,
      temp_max: item.temp_max
    }))
    .sort((a, b) => a.dt_txt.localeCompare(b.dt_txt));
  
    return (
      <div style={{ width: '80%' , height: '400px' }}>
      <ResponsiveContainer>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dt_txt" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar dataKey="temp_min" name="temp_min" fill="#8884d8" yAxisId="left" />
          <Bar dataKey="temp_max" name="temp_max" fill="#82ca9d" yAxisId="left" />
          <Line type="monotone" dataKey="temp_min" name="temp_min" stroke="#8884d8" strokeWidth={5} yAxisId="left" />
          <Line type="monotone" dataKey="temp_max" name="temp_max" stroke="#82ca9d" strokeWidth={5} yAxisId="left" />
        </ComposedChart>
      </ResponsiveContainer>

      </div>
    );
  };
  
  export default WeatherChart;
  