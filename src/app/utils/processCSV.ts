/* eslint-disable @typescript-eslint/no-explicit-any */
export const processCSV = (data: any[]) => {
    const uniqueSalespeople = Array.from(
        new Set(data.map((row) => row["Sales Person"]).filter(Boolean))
    );

    const uniqueCompanies = Array.from(
        new Set(data.map((row) => row["Company"]).filter(Boolean))
    );

    const uniqueYears = Array.from(
        new Set(data.map((row) => new Date(row["Delivery Date"]).getFullYear()))
    ).filter((num) => !isNaN(num)).sort((a, b) => a - b);

    return { uniqueSalespeople, uniqueCompanies, uniqueYears };
};
