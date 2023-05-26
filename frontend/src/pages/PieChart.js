import { useEffect, useState } from 'react';
import Highcharts, { Chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/dashboard');
                const data = await response.json();
                const filteredData = data.filter((item) => {
                    const createdAtYear = new Date(item.created_at).getFullYear();
                    return createdAtYear;
                });
                const activeUsers = filteredData.filter((item) => item.status === 'active').length;
                const inactiveUsers = filteredData.filter((item) => item.status === 'inactive').length;
                const disabledUsers = filteredData.filter((item) => item.status === 'disabled').length;

                const options = {
                    chart: {
                        type: 'pie',
                    },
                    title: {
                        text: 'User Status',
                    },
                    series: [
                        {
                            name: 'Users',
                            data: [
                                { name: 'Active', y: activeUsers },
                                { name: 'Inactive', y: inactiveUsers },
                                { name: 'Disabled', y: disabledUsers },
                            ],
                        },
                    ],
                };

                setChartOptions(options);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}


export default PieChart;