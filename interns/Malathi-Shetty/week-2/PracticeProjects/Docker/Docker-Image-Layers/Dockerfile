FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

COPY index.html /var/www/html/index.html

CMD ["nginx", "-g", "daemon off;"]
