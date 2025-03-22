# Crypto Trading Simulator 13

## Overview
This project is a cryptocurrency trading simulator that fetches live price data from the CoinGecko API and executes simulated trades based on Simple Moving Averages (SMA). It uses a circular buffer for efficient data handling and logs trade activities.

## Features
- **Real-time Price Fetching:** Polls the CoinGecko API for cryptocurrency prices every minute.
- **SMA Calculation:** Computes short-term (5 prices) and long-term (20 prices) SMAs.
- **Trading Signals:**
  - **Buy Signal:** Triggered when the short-term SMA rises above the long-term SMA.
  - **Sell Signal:** Triggered when the short-term SMA falls below the long-term SMA.
- **Trade Execution:** Logs trades with timestamps, price, and type (buy/sell).
- **Efficient Data Handling:** Uses a circular buffer to maintain recent price data for calculations.
- **Error Handling & Logging:** Includes detailed logging for debugging and monitoring.

## Installation
### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/crypto-trading-bot.git
   cd crypto-trading-bot
   ```
2. Install dependencies:
   ```sh
   npm install axios
   ```
3. Run the application:
   ```sh
   node bot.js
   ```

## How It Works
1. The bot fetches live prices for Bitcoin, Ethereum, and Dogecoin from CoinGecko.
2. It maintains a circular buffer storing the most recent prices.
3. It calculates the short-term and long-term SMAs.
4. When a buy or sell signal is detected, it logs a simulated trade.

## Configuration
- You can modify the cryptocurrencies being tracked by updating the `cryptoIds` array in `bot.js`.
- Adjust the short-term and long-term SMA periods as needed.

## Future Enhancements
- Support for more cryptocurrencies.
- Database integration for trade history storage.
- Advanced trading strategies (e.g., RSI, MACD).

## Time Estimation
This project is designed to be completed in **3–5 hours**.

## License
MIT License.

## Contact
For any issues or feature requests, open an issue on GitHub.

  
