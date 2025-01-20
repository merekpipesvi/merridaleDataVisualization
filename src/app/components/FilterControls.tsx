
import React from "react";
import { Select, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

interface FilterControlsProps {
    salespersonOptions: string[];
    selectedSalesperson: string | null;
    setSelectedSalesperson: (salesperson: string | null) => void;
    dateRange: [Date | null, Date | null];
    setDateRange: (range: [Date | null, Date | null]) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
    salespersonOptions,
    selectedSalesperson,
    setSelectedSalesperson,
    dateRange,
    setDateRange,
}) => (
    <div style={{ marginTop: 20 }}>
        <Select
            label="Who are you?!"
            data={salespersonOptions}
            value={selectedSalesperson}
            onChange={setSelectedSalesperson}
            placeholder="Select Salesperson"
        />
        <Stack align="center" p="2rem">
            <Text fw="500">Pick a date range to compare across years</Text>
            <DatePicker
                type="range"
                monthLabelFormat={"MMMM"}
                value={dateRange}
                onChange={setDateRange}
                maxLevel="year"
                maxDate={new Date(new Date().getFullYear(), 11, 31)}
                minDate={new Date(new Date().getFullYear(), 0, 1)}
            />
        </Stack>
    </div>
);
