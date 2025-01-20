/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { parse } from "papaparse";
import { processCSV } from "./utils/processCSV";
import { summarizeData } from "./utils/summarizeData";
import { FileUploader } from "./components/FileUploader";
import { FilterControls } from "./components/FilterControls";
import { ToggleCompanyVisibility } from "./components/ToggleCompanyVisibility";
import { SalesChart } from "./components/SalesChart";
import { getCompanyListWithChange } from "./utils/getCompanyListWithChange";
import { Group, Paper, ScrollArea, Select, Stack, Title } from "@mantine/core";

const EMPTY_COMPARISON_YEAR = "Average of Past Years";

export const FrontPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [salesData, setSalesData] = useState<any[]>([]);
    const [salespersonOptions, setSalespersonOptions] = useState<string[]>([]);
    const [companyOptions, setCompanyOptions] = useState<string[]>([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [visibleCompanies, setVisibleCompanies] = useState<Set<string>>(new Set());
    const [plotData, setPlotData] = useState<any[]>([]);
    const [plotLayout, setPlotLayout] = useState<any>(null);
    const [summary, setSummary] = useState<any>(null); // Add this to store the summary
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [yearToCompare, setYearToCompare] = useState<number | null>(null);
    const [uniqueYears, setUniqueYears] = useState<number[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const handleFileUpload = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const csvData = reader.result as string;

            parse(csvData, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    const parsedData = result.data;
                    const { uniqueSalespeople, uniqueCompanies, uniqueYears } = processCSV(parsedData);
                    setUniqueYears(uniqueYears);
                    setSalesData(parsedData);
                    setSalespersonOptions(uniqueSalespeople);
                    setCompanyOptions(uniqueCompanies);
                    setVisibleCompanies(new Set());
                    setPlotLayout({
                        title: "Past Sales Data Summary by Company",
                        xaxis: { title: "Year", type: "linear", tickmode: "array", tickvals: uniqueYears.sort() },
                        yaxis: { title: "Subtotal Sales in $$" },
                        margin: { t: 50, l: 50, r: 50, b: 50 },
                    });
                },
            });
        };
        reader.readAsText(file);
        setIsDataLoaded(true);
    };

    const toggleAllCompanies = () => {
        if (visibleCompanies.size > 0) {
            setVisibleCompanies(new Set());
        } else {
            setVisibleCompanies(new Set(companyOptions));
        }
    };

    const toggleCompanyVisibility = (company: string) => {
        setVisibleCompanies((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(company)) newSet.delete(company);
            else newSet.add(company);
            return newSet;
        });
    };

    useEffect(() => {
        const { data, summary: newSummary } = summarizeData(
            salesData,
            selectedSalesperson,
            dateRange,
            visibleCompanies
        );
        setPlotData(data);
        setSummary(newSummary); // Store the summary for use in the company list
    }, [salesData, selectedSalesperson, dateRange, visibleCompanies]);

    return (
        <Stack gap="md" p="md" align="center">
            {isDataLoaded ? null : <FileUploader file={file} setFile={setFile} onUpload={handleFileUpload} />}
           <Paper>
                <Stack align="center">
                    {salespersonOptions.length > 0 && (
                        <FilterControls
                            salespersonOptions={salespersonOptions}
                            selectedSalesperson={selectedSalesperson}
                            setSelectedSalesperson={setSelectedSalesperson}
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                        />
                    )}
                </Stack>
            </Paper>
            <Group justify="center">
                {uniqueYears.length > 0 && (
                    <Select
                        label="Select a year to view..."
                        placeholder="Choose year"
                        data={uniqueYears.map((year) => ({ value: year.toString(), label: year.toString() }))}
                        value={selectedYear?.toString() ?? null}
                        onChange={(value) =>{ 
                            setSelectedYear(value == null ? null : Number(value)); 
                            setYearToCompare(null);
                        }}
                        w="25rem"
                    />
                )}
                {uniqueYears.length > 0 && (
                    <Select
                        label="Select a year to compare to..."
                        defaultValue={EMPTY_COMPARISON_YEAR}
                        data={[{label: EMPTY_COMPARISON_YEAR, value: EMPTY_COMPARISON_YEAR}, ...uniqueYears.filter((year) => year < (selectedYear ?? 0)).map((year) => ({ value: year.toString(), label: year.toString() }))]}
                        onChange={(value) =>{ setYearToCompare(value == EMPTY_COMPARISON_YEAR ? null : Number(value))}}
                        w="25rem"
                    />
                )}
            </Group>
            {companyOptions.length > 0 && summary && (
                <Paper shadow="sm" p="md" withBorder>
                    <Title order={5}>Toggle Company Visibility</Title>
                    <ScrollArea style={{ maxHeight: 500 }} scrollbars="y">
                        <ToggleCompanyVisibility
                            companyOptions={getCompanyListWithChange(summary, selectedYear, yearToCompare)} // Pass the summary here
                            visibleCompanies={visibleCompanies}
                            toggleCompanyVisibility={toggleCompanyVisibility}
                            toggleAllCompanies={toggleAllCompanies}
                        />
                    </ScrollArea>
                </Paper>
            )}
            {plotData.length > 0 && plotLayout && <SalesChart plotData={plotData} plotLayout={plotLayout} />}
        </Stack>
    );
};
