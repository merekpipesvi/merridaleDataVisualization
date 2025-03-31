
import React from "react";
import { Select, Stack, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

interface FilterControlsProps {
    areaOptions: string[];
    selectedArea: string | null;
    setSelectedArea: (area: string | null) => void;
    dateRange: [Date | null, Date | null];
    setDateRange: (range: [Date | null, Date | null]) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
    areaOptions,
    selectedArea,
    setSelectedArea,
    dateRange,
    setDateRange,
}) => (
    <div style={{ marginTop: 20 }}>
        <Select
            label="Region"
            data={areaOptions}
            value={selectedArea}
            onChange={setSelectedArea}
            placeholder="Select Area"
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
