FROM ubuntu:24.04

RUN apt-get update -y && apt-get install -y nginx

WORKDIR /home/ubuntu/project

COPY index.html /home/ubuntu/project

ENV APP_ENV=Development

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
