"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

import { useWebsiteDetailsStore } from "@/lib/zustand/website-details-store";
import useGoogleRefreshToken from "@/auth/hooks/use-google-refresh-token";

import BreadCrumbsSearchKeywords from "../../google-search/_components/bread-crumbs";
import GoogleResultPage from "../_components/google-results-page";

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

    const currentWebsite = useWebsiteDetailsStore(state => state.WebsiteDetails);
    const refresh_token = useGoogleRefreshToken('search-console');
    const site_url = currentWebsite?.gscUrl;

    const [data, setData] = React.useState<Data[]>();
    const [currentData, setCurrentData] = React.useState<Data>();
    const [previousData, setPreviousData] = React.useState<Data>();
    const [comparedData, setComparedData] = React.useState<Data>();

    const [start_date, setStartDate] = useState("2024-01-01");
    const [end_date, setEndDate] = useState("2024-01-30");

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    console.log("oneYearAgo", formatDate(oneYearAgo));
    console.log("start_date", formatDate(currentDate));


    useEffect(() => {
        fetchData();
    }, [currentWebsite])

    const fetchData = async () => {
        // fetch data
        if (!site_url || !refresh_token) return;
        try {
            const res: ResultSearchApiResponse = await axios(
                `${process.env.NEXT_PUBLIC_PYTHON_API_URL}/api/results?site_url=${site_url}&refresh_token=${refresh_token}&start_date=${formatDate(oneYearAgo)}&end_date=${formatDate(currentDate)}`
            );

            const formattedData = res.data.data.rows.map((row) => ({
                clicks: row.clicks,
                ctr: row.ctr * 100,
                impressions: row.impressions,
                position: row.position,
                date: row.keys[0], // Assuming each 'keys' array contains only one element (date)
            }));
    
            setData(formattedData);
            setCurrentData(res.data.currentData)
            setComparedData(res.data.comparedData)
            setPreviousData(res.data.previousData)
    
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        console.log('date changed')
    }, [start_date, end_date]);

    // TODO: Add loading state
    if (!data) return <div>Loading...</div>;

    return (
        <div className="w-full h-full px-6">
            <BreadCrumbsSearchKeywords />
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


