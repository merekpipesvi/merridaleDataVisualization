# Merridale Data Visualization - Sales Analysis Dashboard

## ⚠️ Important Disclaimer

**This project was built quickly as a specific client solution and is NOT representative of my typical development standards or best practices.** Please note that this was a rapid prototype built under tight time constraints for a very specific use case. **This was almost entirely built through AI**, and none of this code would see the light of day in applications requiring stricter needs.

## Project Overview

This Merridale data visualization is a client-specific sales visualization tool created for **Merridale Cidery** to help them better understand customer loss patterns across different regions. The client needed a way to quickly visualize sales data changes by area to identify where they were losing customers and by how much.

## Background

Merridale approached me with a need to visualize their sales data more effectively. They were struggling to identify patterns in customer loss across different regions and wanted a simple tool to:
- Compare sales performance year-over-year for specific time frames
- Filter data by geographic regions  
- Visualize percentage changes in sales by company
- Identify which areas were experiencing the biggest drops

## Technical Implementation

### Architecture
- **Frontend Only**: Pure React/Next.js application with no backend
- **Data Integration**: Direct CSV upload from EKOS (their existing system)
- **Processing**: Client-side CSV parsing and data manipulation
- **Visualization**: Plotly.js charts for interactive data display

### Key Features
- CSV file upload from EKOS reporting system
- Region-based filtering
- Date range selection for year-over-year comparisons
- Company visibility toggles with percentage change indicators
- Interactive sales trend charts

### Technology Stack
- Next.js 14
- React 18
- TypeScript
- Mantine UI components
- Plotly.js for charting
- PapaParse for CSV processing

## EKOS Integration

This tool specifically integrates with EKOS through a custom report called "Merek's Data Export". Users must:
1. Go to EKOS → Reporting → "Merek's Data Export"
2. Export as CSV
3. Upload the CSV file to this application

## Limitations & Technical Debt

**This is a hastily built prototype with significant limitations:**

- No data validation or error handling
- No backend persistence
- Hardcoded assumptions about CSV structure
- No user authentication or multi-tenancy
- No responsive design considerations
- Limited error states and user feedback
- No automated testing
- Quick-and-dirty state management
- Minimal TypeScript type safety

## Why This Approach?

This was built as a rapid solution to solve an immediate business need. The client needed something functional quickly rather than a robust, scalable application. The trade-offs made prioritized:
- Speed of delivery
- Direct integration with existing EKOS workflow
- Minimal complexity for the end user
- Zero infrastructure requirements

## Future Improvements (If This Were Production)

- Proper backend with database persistence
- User authentication and role management
- Data validation and comprehensive error handling
- Automated testing suite
- Proper TypeScript typing throughout
- Responsive design
- Performance optimization
- Security audit
- Documentation and user guides
- CI/CD pipeline

## Usage

1. Obtain the CSV export from EKOS using "Merek's Data Export" report
2. Upload the CSV file using the file uploader
3. Select a region to analyze
4. Choose a date range for comparison
5. Select years to compare (current vs. previous or average)
6. Toggle company visibility to focus on specific businesses
7. View the interactive chart showing sales trends

## Client Feedback

Despite the technical shortcuts, this tool successfully solved Merridale's immediate need and provided them with the insights they were looking for to make data-driven decisions about their sales strategy.
