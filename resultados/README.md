# SVI Factsheet - Systematic Value Investing US Markets

A pixel-perfect web replica of the SVI institutional factsheet with real-time data integration from Yahoo Finance.

## Features

- Pixel-perfect visual replication of the original PDF
- Real-time NAV data from Yahoo Finance (auto-updates every 60 seconds)
- Fully editable content through JSON configuration
- Responsive design (desktop and mobile)
- Download original PDF button
- Interactive donut charts for sector allocation and duration exposure

## How to Update Content

All factsheet content is stored in `/content/factsheet.json`. This is the single source of truth for all text, tables, and data displayed on the website.

### Updating Basic Information

To update the month, year, or titles:

```json
{
  "month": "Enero",
  "year": "2026",
  "title": "SYSTEMATIC VALUE INVESTING US MARKETS",
  "subtitle": "Gestión Boutique VII"
}
```

### Updating Top Holdings

Edit the `topHoldings` array:

```json
"topHoldings": [
  { "name": "Company Name", "percentage": "6,37%" }
]
```

### Updating Monthly Returns

Edit the `monthlyReturns` array. Each row represents a year:

```json
"monthlyReturns": [
  {
    "year": "2026",
    "months": ["1,82%", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    "total": "1,82%"
  }
]
```

### Updating Fund Features

Edit `fundFeaturesLeft` and `fundFeaturesRight` arrays:

```json
"fundFeaturesLeft": [
  { "label": "Fund Manager", "value": "Andbank Wealth Management" }
]
```

### Updating Charts

For sector allocation and duration exposure, edit the respective arrays. Each entry must have:
- `name`: Display name
- `percentage`: Numeric value
- `color`: Hex color code

```json
"sectorAllocation": [
  { "name": "Cuidado de la salud", "percentage": 23.0, "color": "#b19cd9" }
]
```

### Updating Text Sections

The monthly update and important information sections use arrays of paragraphs:

```json
"monthlyUpdate": {
  "title": "Actualización Mensual de la Inversión",
  "paragraphs": [
    "First paragraph...",
    "Second paragraph..."
  ]
}
```

### Updating Contact Information

Edit the `contact` and `distributorInfo` sections:

```json
"contact": {
  "address": "Av. del Carrilet, 3, 08902 L'Hospitalet de Llobregat, Barcelona",
  "phone": "+34 935 95 23 71",
  "email": "david@svinvesting.com"
}
```

## How to Update Assets

### Replacing the PDF

Replace the file at `/public/svi-para-institucionales.pdf` with the new PDF.

### Changing the Logo

The logo is generated as SVG text. To use a custom logo image:

1. Add your logo to `/public/assets/`
2. Update the Header component to use an image instead of SVG

## Yahoo Finance Integration

The live quote data is fetched from Yahoo Finance through a server-side API route to avoid CORS issues.

- **Ticker**: Defined in `factsheet.json` as `yahooTicker`
- **Update Frequency**: Every 60 seconds
- **Cache Duration**: 30 seconds (server-side)
- **API Route**: `/app/api/yahoo-quote/route.ts`

To change the data source or ticker, update the `yahooTicker` value in the JSON file.

## Components

The application is built with modular, reusable components:

- `LiveQuoteCard`: Real-time NAV display with auto-refresh
- `Header`: Month, year, title, subtitle, and logo
- `RiskScale`: Visual risk indicator (1-7 scale)
- `TwoColumnIntro`: Description and investment objective
- `TopHoldings`: Top 5 holdings table
- `MonthlyReturnsTable`: Monthly performance table
- `FundFeatures`: Fund characteristics tables
- `DonutChartCard`: Interactive donut charts with Recharts
- `DistributorTable`: Distributor contact information
- `TextSection`: General text sections with title
- `Footer`: Page footer with legal text

## Tech Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Recharts (for charts)
- shadcn/ui components

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The design follows the exact visual style of the original PDF
- All colors, spacing, and typography are carefully matched
- Purple theme (#8b5cf6) is used throughout for consistency
- Tables and charts are fully responsive
