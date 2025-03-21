const axios = require('axios');

class CryptoTradingBot {
    constructor(apiUrl, shortTermPeriod = 5, longTermPeriod = 20, cryptoIds = ['bitcoin', 'ethereum', 'dogecoin']) {
        this.apiUrl = apiUrl;
        this.shortTermPeriod = shortTermPeriod;
        this.longTermPeriod = longTermPeriod;
        this.cryptoIds = cryptoIds;
        this.prices = {};
        this.trades = [];
    }

    async fetchPrices() {
        try {
            const response = await axios.get(`${this.apiUrl}/simple/price?ids=${this.cryptoIds.join(',')}&vs_currencies=usd`);
            this.cryptoIds.forEach(crypto => {
                const price = response.data[crypto].usd;
                this.updatePrices(crypto, price);
                console.log(`Fetched Price for ${crypto}: ${price}`);
            });
        } catch (error) {
            console.error("Error fetching prices:", error);
        }
    }

    updatePrices(crypto, price) {
        if (!this.prices[crypto]) this.prices[crypto] = [];
        this.prices[crypto].push(price);
        if (this.prices[crypto].length > this.longTermPeriod) {
            this.prices[crypto].shift(); // Maintain circular buffer
        }
        this.evaluateTradeSignals(crypto);
    }

    calculateSMA(crypto, period) {
        if (!this.prices[crypto] || this.prices[crypto].length < period) return null;
        const sum = this.prices[crypto].slice(-period).reduce((a, b) => a + b, 0);
        return sum / period;
    }

    evaluateTradeSignals(crypto) {
        const shortSMA = this.calculateSMA(crypto, this.shortTermPeriod);
        const longSMA = this.calculateSMA(crypto, this.longTermPeriod);

        if (shortSMA && longSMA) {
            if (shortSMA > longSMA) {
                this.executeTrade(crypto, "BUY");
            } else if (shortSMA < longSMA) {
                this.executeTrade(crypto, "SELL");
            }
        }
    }

    executeTrade(crypto, type) {
        const trade = {
            timestamp: new Date().toISOString(),
            crypto,
            type,
            price: this.prices[crypto][this.prices[crypto].length - 1],
            quantity: 1 // Example quantity
        };
        this.trades.push(trade);
        console.log("Executed Trade:", trade);
    }
}

const bot = new CryptoTradingBot('https://api.coingecko.com/api/v3');
setInterval(() => bot.fetchPrices(), 60000); // Fetch prices every minute
