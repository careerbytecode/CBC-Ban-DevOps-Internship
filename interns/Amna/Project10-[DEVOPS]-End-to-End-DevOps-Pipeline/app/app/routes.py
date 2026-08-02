import os
import socket
from datetime import datetime, timezone

from flask import Blueprint, jsonify, render_template

main = Blueprint("main", __name__)

START_TIME = os.getenv(
    "DEPLOYMENT_TIME",
    datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC"),
)


def app_info():
    return {
        "name": os.getenv("APP_NAME", "DevOps Capstone Web App"),
        "version": os.getenv("APP_VERSION", "1.0.0"),
        "environment": os.getenv("APP_ENVIRONMENT", "development"),
        "hostname": socket.gethostname(),
        "deployment_time": START_TIME,
    }


@main.get("/")
def home():
    return render_template("index.html", app=app_info())


@main.get("/health")
def health():
    info = app_info()
    return jsonify(
        status="healthy",
        application=info["name"],
        version=info["version"],
        environment=info["environment"],
    ), 200


@main.get("/version")
def version():
    return jsonify(app_info()), 200


@main.get("/api/status")
def status():
    info = app_info()
    return jsonify(
        service=info["name"],
        status="running",
        version=info["version"],
        environment=info["environment"],
        hostname=info["hostname"],
        checked_at=datetime.now(timezone.utc).isoformat(),
    ), 200
