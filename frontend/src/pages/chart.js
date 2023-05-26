import { useEffect, useState } from 'react';
import Highcharts, { Chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const Charttable = () => {
    const [chart, setChart] = useState('column');
    const [chartOptions, setChartOptions] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8001/dashboard');
                const data = await response.json();


                const filteredData = data.filter((item) => {
                    const createdAtYear = new Date(item.created_at).getFullYear();
                    return createdAtYear === selectedYear;
                });
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                const categories = months.map((month) => `${month}`);
                const seriesData = months.map((month) => {
                    const monthData = filteredData.filter((item) => new Date(item.created_at).getMonth() === months.indexOf(month));
                    return monthData.length;
                });

                const options = {
                    chart: {
                        type: chart,
                    },
                    title: {
                        text: 'Signed-up Users by Month',
                    },
                    xAxis: {
                        categories: categories,
                    },
                    yAxis: {
                        title: {
                            text: 'User Count',
                        },
                    },
                    series: [
                        {
                            name: 'Users',
                            data: seriesData,
                            color: '#ac6bee'
                        },
                    ],
                };

                setChartOptions(options);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedYear]);

    const handleYearChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setSelectedYear(selectedValue);
    };

    const handleChartTypeChange = (event) => {
        const selectedChartType = event.target.value;
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            chart: {
                type: selectedChartType,
            },
        }));
        setChart(event.target.value);
    };


    return (<div className='chart'>
        <div>
            <label htmlFor="year">Select Year:</label>
            <select id="year" value={selectedYear} onChange={handleYearChange}>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
                <option value={2023}>2023</option>
            </select>
        </div>
        <div>
            <label htmlFor="chartType">Select Chart Type:</label>
            <select id="chartType" onChange={handleChartTypeChange} value={chart}>
                <option value="column">Column Chart</option>
                <option value="line">Line Chart</option>
            </select>
        </div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
    );
}


export default Charttable;