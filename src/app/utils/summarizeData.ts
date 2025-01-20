/* eslint-disable @typescript-eslint/no-explicit-any */
export const summarizeData = (
    data: any[],
    selectedSalesperson: string | null,
    dateRange: [Date | null, Date | null],
    visibleCompanies: Set<string>
) => {
    if (!selectedSalesperson || !dateRange[0] || !dateRange[1]) return {data: [], summary: {}};

    const [startMonth, endMonth] = [
        dateRange[0]?.getMonth() + 1,
        dateRange[1]?.getMonth() + 1,
    ];

    const filtered = data.filter((row) => {
        const salespersonMatches = row["Sales Person"] === selectedSalesperson;
        const rowDate = new Date(row["Delivery Date"]);
        const monthMatches = rowDate.getMonth() + 1 >= startMonth && rowDate.getMonth() + 1 <= endMonth;

        return salespersonMatches && monthMatches;
    });

    const summary = filtered.reduce((acc, row) => {
        const year = new Date(row["Delivery Date"]).getFullYear();
        const company = row["Company"];
        const sales = parseFloat(row["Subtotal"]) || 0;

        if (!acc[company]) acc[company] = {};
        if (!acc[company][year]) acc[company][year] = 0;

        acc[company][year] += sales;
        return acc;
    }, {} as Record<string, Record<number, number>>);

    // Ensure 0 values for missing years
    const allYears = Array.from(new Set((Object.values(summary) as object[]).flatMap(Object.keys))).map(Number).sort((a, b) => a - b);
    const returnData = Object.entries(summary)
        .filter(([company]) => visibleCompanies.has(company))
        .map(([company, years]) => {
            const xValues = allYears;
            const yValues = xValues.map((year) => (years as Record<number, number>)[year] || 0);
            console.log(years)

            return {
                x: xValues,
                y: yValues,
                type: "scatter",
                mode: "lines+markers",
                name: company,
            };
        });

    return {data: returnData, summary};
};
