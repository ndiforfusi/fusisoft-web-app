FROM ubuntu:24.04

RUN apt-get update -y && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy the whole site (including subdir)
WORKDIR /var/www/html
COPY site/ /var/www/html/

# Optional: replace default site config with a subdir-friendly one
#COPY nginx/default.conf /etc/nginx/sites-available/default

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
