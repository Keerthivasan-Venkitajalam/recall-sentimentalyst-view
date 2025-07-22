import requests
import logging
from typing import Dict, Optional

class TradingClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.endpoint = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"

    def get_price(self, symbol: str) -> Optional[float]:
        headers = {"X-CMC_PRO_API_KEY": self.api_key}
        params = {"symbol": symbol}
        try:
            response = requests.get(self.endpoint, headers=headers, params=params)
            if response.status_code != 200:
                logging.error(f"CoinMarketCap API Error: {response.status_code} {response.text}")
                return None
            data = response.json()
            price = data["data"][symbol]["quote"]["USD"]["price"]
            return price
        except Exception as e:
            logging.error(f"CoinMarketCap API Exception: {e}")
            return None

    def execute_trade(self, pair: str, trade_type: str, amount_usd: float) -> Dict:
        # Extract symbol from pair (e.g., BTC/USD -> BTC)
        symbol = pair.split("/")[0]
        price = self.get_price(symbol)
        if price is None:
            logging.error("Failed to fetch price from CoinMarketCap.")
            return {'status': 'error', 'reason': 'Price fetch failed'}
        amount_crypto = amount_usd / price
        print(f"[TRADE EXECUTED] - Type: {trade_type}, Pair: {pair}, Amount: ${amount_usd} ({amount_crypto:.6f} {symbol} @ ${price:.2f})")
        return {
            'status': 'success',
            'trade_type': trade_type,
            'order_id': 'simulated_12345',
            'pair': pair,
            'amount_usd': amount_usd,
            'price': price,
            'amount_crypto': amount_crypto
        }
