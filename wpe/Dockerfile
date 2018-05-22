FROM petrosagg/resin-wpe:raspberrypi3-42bbb24

COPY wpe-init /wpe-init

COPY public_html /var/lib/public_html

ENV WPE_URL="file:///var/lib/public_html/index.html"

CMD [ "/wpe-init" ]

