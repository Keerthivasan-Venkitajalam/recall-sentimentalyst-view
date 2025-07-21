import logging
from typing import Dict

class TradingClient:
    def __init__(self, api_key: str, api_secret: str):
        self.api_key = api_key
        self.api_secret = api_secret

    def execute_trade(self, pair: str, trade_type: str, amount_usd: float) -> Dict:
        print(f"[TRADE EXECUTED] - Type: {trade_type}, Pair: {pair}, Amount: ${amount_usd}")
        return {
            'status': 'success',
            'trade_type': trade_type,
            'order_id': 'simulated_12345',
            'pair': pair,
            'amount_usd': amount_usd
        }
