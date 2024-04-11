'use client';

import React, { useState } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Label, TooltipProps, Rectangle, RectangleProps, CellProps, PieChart, Pie, Sector, AreaChart, Area } from 'recharts';
import { format, parse } from 'date-fns';
import { ActiveShape } from 'recharts/types/util/types';
import { cn } from '@/lib/utils';

interface ChartProps {
    id: string,
    projectId: string,
    improved: number,
    worsened: number,
    total: number,
    topThree: number,
    topTen: number,
    topHundred: number,
    noChange: number,
    notFound: number,
    averagePosition: number,
    createdAt: string
}


const BAR_CHART_DATA: ChartProps[] = [
    {
        "id": "clureyicr007jvvaozthml6nb",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 4,
        "worsened": 0,
        "total": 27,
        "topThree": 15,
        "topTen": 22,
        "topHundred": 26,
        "noChange": 1,
        "notFound": 1,
        "averagePosition": 8,
        "createdAt": "08/04/2024"
    },
    {
        "id": "clusbbk7w00fv11h88iwvu552",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 2,
        "worsened": 4,
        "total": 28,
        "topThree": 15,
        "topTen": 22,
        "topHundred": 26,
        "noChange": 22,
        "notFound": 2,
        "averagePosition": 8,
        "createdAt": "09/04/2024"
    },
    {
        "id": "cluu21pyz00gzzbcv7dtsea1p",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 3,
        "worsened": 2,
        "total": 28,
        "topThree": 14,
        "topTen": 23,
        "topHundred": 27,
        "noChange": 23,
        "notFound": 1,
        "averagePosition": 9,
        "createdAt": "10/04/2024"
    },
    {
        "id": "cluv33o0x00fvp5qusdfo1s5p",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 3,
        "worsened": 4,
        "total": 28,
        "topThree": 14,
        "topTen": 21,
        "topHundred": 26,
        "noChange": 21,
        "notFound": 2,
        "averagePosition": 9,
        "createdAt": "11/04/2024"
    },
    {
        "id": "clureyicr007jvvaozthml6nb",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 4,
        "worsened": 0,
        "total": 27,
        "topThree": 15,
        "topTen": 22,
        "topHundred": 26,
        "noChange": 1,
        "notFound": 1,
        "averagePosition": 8,
        "createdAt": "08/04/2024"
    },
    {
        "id": "clusbbk7w00fv11h88iwvu552",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 2,
        "worsened": 4,
        "total": 28,
        "topThree": 15,
        "topTen": 22,
        "topHundred": 26,
        "noChange": 22,
        "notFound": 2,
        "averagePosition": 8,
        "createdAt": "09/04/2024"
    },
    {
        "id": "cluu21pyz00gzzbcv7dtsea1p",
        "projectId": "clurewmbq00017th5m77papxn",
        "improved": 3,
        "worsened": 2,
        "total": 28,
        "topThree": 14,
        "topTen": 23,
        "topHundred": 27,
        "noChange": 23,
        "notFound": 1,
        "averagePosition": 9,
        "createdAt": "10/04/2024"
    }
]

const PIE_CHART_DATA = [
    { name: 'Improved', value: 2 },
    { name: 'Worsened', value: 4 },
    { name: 'NoChange', value: 22 },
    { name: 'NotFound', value: 2 },
];

const Charts = () => {
    return (
        <>
            <div className='flex gap-3'>
                <SimpleCardOne />
                <PieChartOne />
                <SimpleCardTwo />
            </div>
            <div className='flex gap-2 w-full h-[500px]'>
                <ChartOne barColor='#D1D5DB' activeBarColor='#1F2937' />
                <ChartOne barColor='#907EFE' activeBarColor='#6947DB' />
                <LineChartOne />
            </div>
        </>
    )
}

export default Charts



type ChartOneProps = {
    barColor?: string;
    activeBarColor?: string;
}

const ChartOne = ({ barColor, activeBarColor }: ChartOneProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <ResponsiveContainer>
            <BarChart
                data={BAR_CHART_DATA}
                margin={{ top: 18 }}
            >
                <XAxis
                    dataKey="createdAt"
                    type="category"

                    tickFormatter={(tickItem) => {
                        if (tickItem === '0') return '';
                        const date = parse(tickItem, 'dd/MM/yyyy', new Date());
                        return format(date, 'dd');
                    }}
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />

                <Bar

                    background={false}
                    dataKey="improved"

                    shape={(props: any) => <Rectangle {...props} fill={props.index === activeIndex ? activeBarColor : barColor} radius={[10, 10, 10, 10]} />}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    <LabelList
                        dataKey="improved"
                        position="top"

                        content={({ x, y, width, value, index }) => {
                            return index !== activeIndex ? null : (
                                <text x={Number(x ?? 0) + Number(width ?? 0) / 2} y={Number(y)} fill="#666" textAnchor="middle" dy={-6}>
                                    {value}
                                </text>
                            );
                        }}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

const CustomTooltipChartOne = ({ active, payload, label }: TooltipProps<string, string>) => {
    if (active && payload && payload.length) {
        return (
            <div>
                <p>{payload[0].value}</p>
            </div>
        );
    }

    return null;
};

const CustomBarShapeChartOne: React.FC<Partial<RectangleProps & CellProps>> = ({ fill, x, y, width, height }) => {
    return (
        <Rectangle
            fill={'#D1D5DB'}
            x={x}
            y={y}
            width={width}
            height={height}
            radius={[10, 10, 10, 10]}
        />
    );
};

const SimpleCardOne = () => {
    const firstImproved = BAR_CHART_DATA[0].improved;
    const lastImproved = BAR_CHART_DATA[BAR_CHART_DATA.length - 1].improved;
    const difference = lastImproved - firstImproved;
    const percentage = (difference / firstImproved) * 100;

    return (
        <div className='p-4 bg-white w-fit rounded-xl shadow-sm'>
            <div className='flex items-center text-lg font-semibold leading-7 text-gray-800'>
                <p className='mr-2'>Improved:</p>
                <p>{lastImproved}</p>
                <p className={cn(
                    percentage > 0 ? "bg-green-100 text-green-500" : percentage < 0 ? "bg-red-100 text-red-500" : "bg-white text-gray-800",
                    'px-2 py-1 w-fit h-fit rounded-[4px] text-xs ml-auto font-normal'
                )}>{percentage}%</p>
            </div>

            <div className='w-[265px] h-[150px]'>
                <ChartOne barColor='#907EFE' activeBarColor='#6947DB' />
            </div>

        </div>
    );
}

const PieChartOne = () => {

    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };

    const COLORS = ['#28a745', '#dc3545', '#6c757d', '#007bff'];


    return (
        <div className='p-4 bg-white rounded-xl shadow-sm w-[297px] h-full'>
            <h2 className='text-lg font-semibold text-gray-800'>Keyword Changes</h2>
            <PieChart
                width={270}
                height={150}
                className='ml-auto'
            >
                <Pie

                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={PIE_CHART_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {PIE_CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    )
}

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius) * cos;
    const sy = cy + (outerRadius) * sin;
    const mx = cx + (outerRadius + 5) * cos;
    const my = cy + (outerRadius + 5) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 7;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={14}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{value}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${((100 / 27) * value).toFixed(2)}%`}
            </text>
        </g>
    );
};


const LineChartOne = () => {


    return (
        <div className='w-full h-full'>
            <ResponsiveContainer >
                <AreaChart data={BAR_CHART_DATA} margin={{ left: -30 }}>
                    <defs>
                        <linearGradient id={`colorClicks`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={'#8884d8'} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={'#8884d8'} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="createdAt" hide={true} />
                    <YAxis axisLine={false} hide={true} />
                    <Tooltip />
                    <Area type="monotone" dataKey={'averagePosition'} stroke={'#8884d8'} fill={`url(#colorClicks)`} />
                </AreaChart>
            </ResponsiveContainer>
        </div>

    )
}

const SimpleCardTwo = () => {
    const firstImproved = BAR_CHART_DATA[0].averagePosition;
    const lastImproved = BAR_CHART_DATA[BAR_CHART_DATA.length - 1].averagePosition;
    const difference = lastImproved - firstImproved;
    const percentage = (difference / firstImproved) * 100;

    return (
        <div className='p-4 bg-white w-fit rounded-xl shadow-sm'>
            <div className='flex items-center text-lg font-semibold leading-7 text-gray-800'>
                <p className='mr-2'>Average Position:</p>
                <p>{lastImproved}</p>
                <p className={cn(
                    percentage > 0 ? "bg-green-100 text-green-500" : percentage < 0 ? "bg-red-100 text-red-500" : "bg-white text-gray-800",
                    'px-2 py-1 w-fit h-fit rounded-[4px] text-xs ml-auto font-normal'
                )}>{percentage}%</p>
            </div>

            <div className='w-[265px] h-[150px]'>
                <LineChartOne />
            </div>

        </div>
    );
}

// use <Tooltip content={<CustomTooltip />} />
//const CustomTooltip = ({ active, payload, label, cursor, viewBox, coordinate, offset, position, }: TooltipProps<string, string>) => {
// console.log('active', active)
// console.log('payload', payload)
// console.log('label', label)
// console.log('cursor', cursor)
// console.log('viewBox', viewBox)
// console.log('coordinate', coordinate)
// console.log('offset', offset)
// console.log('position', position)
// return (
//     <div
//         className='bg-white shadow-md rounded-lg debug'
//         style={{
//             transform: 'translate(-80px,-110px)',
//         }}
//     >
//         tooltip content
//     </div>
// );

//return null;
//};