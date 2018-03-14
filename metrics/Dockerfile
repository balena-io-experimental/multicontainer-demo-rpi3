FROM resin/armhf-alpine:latest

RUN apk add --no-cache \
    iputils ca-certificates && \
    update-ca-certificates

ENV TELEGRAF_VERSION 1.3.1

RUN set -ex && \
    apk add --no-cache --virtual .build-deps wget gnupg tar && \
    for key in \
        05CE15085FC09D18E99EFB22684A14CF2582E0C5 ; \
    do \
        gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" || \
        gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
        gpg --keyserver keyserver.pgp.com --recv-keys "$key" ; \
    done && \
    wget -q https://dl.influxdata.com/telegraf/releases/telegraf-${TELEGRAF_VERSION}_linux_armhf.tar.gz.asc && \
    wget -q https://dl.influxdata.com/telegraf/releases/telegraf-${TELEGRAF_VERSION}_linux_armhf.tar.gz && \
    gpg --batch --verify telegraf-${TELEGRAF_VERSION}_linux_armhf.tar.gz.asc telegraf-${TELEGRAF_VERSION}_linux_armhf.tar.gz && \
    mkdir -p /usr/src /etc/telegraf && \
    tar -C /usr/src -xzf telegraf-${TELEGRAF_VERSION}_linux_armhf.tar.gz && \
    mv /usr/src/telegraf*/etc/telegraf/telegraf.conf /etc/telegraf/ && \
    chmod +x /usr/src/telegraf*/usr/bin/* && \
    cp -a /usr/src/telegraf*/usr/bin/* /usr/bin/ && \
    rm -rf *.tar.gz* /usr/src /root/.gnupg && \
    apk del .build-deps wget gnupg tar

ENV INITSYSTEM=off
COPY telegraf.conf /etc/telegraf/telegraf.conf
CMD touch /var/run/utmp && telegraf
