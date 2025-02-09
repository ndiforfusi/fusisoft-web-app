FROM ubuntu:24.04

RUN apt-get update -y && apt-get install -y nginx

WORKDIR /var/www/html

COPY index.html /var/www/html

ENV APP_ENV=Development

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
