# Spotter Flights (Day 2 Ready)

Google Flights–style MVP using React + Vite + Tailwind v4 + RapidAPI (Sky Scrapper).

## Quickstart
```bash
npm i
cp .env.example .env.local
# put your real key in .env.local
npm run dev
```

## Env
Create `.env.local`:
```
VITE_RAPIDAPI_KEY=YOUR_REAL_KEY
```

## Features
- From/To autosuggest (Sky Scrapper `/searchAirport`)
- One-way search (+ optional polling)
- Results list with price, duration, stops
- Max price filter
- Responsive UI, loading skeletons, error/empty states
