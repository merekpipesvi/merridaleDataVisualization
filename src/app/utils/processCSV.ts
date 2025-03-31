/* eslint-disable @typescript-eslint/no-explicit-any */
export const processCSV = (data: any[]) => {
    const uniqueAreas = Array.from(
        new Set(data.map((row) => row["Region"]).filter(Boolean))
    );

    const uniqueCompanies = Array.from(
        new Set(data.map((row) => row["Company"]).filter(Boolean))
    );

    const uniqueYears = Array.from(
        new Set(data.map((row) => new Date(row["Delivery Date"]).getFullYear()))
    ).filter((num) => !isNaN(num)).sort((a, b) => a - b);

    console.log({uniqueAreas, uniqueYears})
    return { uniqueAreas, uniqueCompanies, uniqueYears };
};
