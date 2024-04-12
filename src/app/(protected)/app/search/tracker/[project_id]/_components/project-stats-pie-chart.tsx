
import { Cell, Pie, PieChart } from 'recharts'


type PieChartProps = {
    key: number
    data: { name: string, value: number }[]
    title: string
    pieColor: string
}

const ProjectStatsPieChart = ({ data, pieColor, title }: PieChartProps) => {
    return (
        <div className='py-4 px-6 bg-white rounded-xl shadow-sm w-full h-full flex gap-6 items-center'>
            <PieChart
                width={60}
                height={60}
            >
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={30}
                    fill="#8884d8"
                    dataKey="value"
                >
                    <Cell fill={pieColor} />
                    <Cell fill='#cbd5e1' />
                </Pie>
                <g>
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#28a745">
                        {data[0].value}
                    </text>
                </g>
            </PieChart>
            <div className='h-fit'>
                <h2 className='mr-auto text-lg font-semibold text-gray-800'>{title}</h2>
                <p className='text-sm text-gray-500 '>Vs Yesterday</p>
            </div>
        </div>
    )
}

export default ProjectStatsPieChart