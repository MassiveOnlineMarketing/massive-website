"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleResultPage from "./_components/google-results-page";

interface ResultSearchApiResponse {
    config: any;
    data: {
        comparedData: Data;
        currentData: Data;
        previousData: Data;
        data: {
            rows: {
                clicks: number;
                ctr: number;
                impressions: number;
                position: number;
                keys: string[];
            }[];
        }
    };
}
export type Data = {
    clicks: number;
    ctr: number;
    impressions: number;
    position: number;
    date: string;
};

const Page = () => {
    console.log("Page")

    const [data, setData] = React.useState<Data[]>();
    const [currentData, setCurrentData] = React.useState<Data>();
    const [previousData, setPreviousData] = React.useState<Data>();
    const [comparedData, setComparedData] = React.useState<Data>();

    const [start_date, setStartDate] = useState("2024-01-01");
    const [end_date, setEndDate] = useState("2024-01-30");

    const refresh_token = "1//09iO5KrdsZgDSCgYIARAAGAkSNwF-L9IrZE8bNXSA3hW6yLUSgrymsvl6kynIOmaFEjFr0no07kT-9Zi5El91uWBvtYD16rcFgig";
    const site_url = "https://baristart.nl/";

    const sstart_date = "2024-01-01";
    const send_date = "2024-01-30";

    const fetchData = async () => {
        // fetch data
        const res: ResultSearchApiResponse = await axios(
            `http://127.0.0.1:5000/api/results?site_url=${site_url}&refresh_token=${refresh_token}&start_date=${sstart_date}&end_date=${send_date}`
        );
        console.log("res", res);

        const formattedData = res.data.data.rows.map((row) => ({
            clicks: row.clicks,
            ctr: row.ctr,
            impressions: row.impressions,
            position: row.position,
            date: row.keys[0], // Assuming each 'keys' array contains only one element (date)
        }));

        setData(formattedData);
        setCurrentData(res.data.currentData)
        setComparedData(res.data.comparedData)
        setPreviousData(res.data.previousData)

        console.log("data", formattedData);
    };

    useEffect(() => {
        console.log('date changed')
    }, [start_date, end_date]);

    if (!data) return <div>Loading...<button onClick={fetchData}>Fetch Data</button></div>;

    return (
        <div className="w-full h-full">
            <GoogleResultPage 
                chartData={data} 
                currentData={currentData as Data} 
                comparedData={comparedData as Data}
                previousData={previousData as Data} 
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        </div>
    );
};

export default Page;













const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }: { startDate: string, endDate: string, setStartDate: (date: string) => void, setEndDate: (date: string) => void }) => {
    return (
        <div className="flex gap-2">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
    );
}


