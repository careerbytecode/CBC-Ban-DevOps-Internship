import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    greeting = os.environ.get("APP_GREETING", "Welcome to CBC Bank!")
    env = os.environ.get("APP_ENV", "local")
    return "%s (env: %s)" % (greeting, env)

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
