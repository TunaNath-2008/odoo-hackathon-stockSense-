from fastapi import FastAPI

app = FastAPI(title="StockSense API")


@app.get("/")
def home():
    return {
        "message": "StockSense API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }