FROM alpine:3.12
EXPOSE 80
COPY ["dist/.", "/var/www/html/"]
CMD ["httpd-foreground"]