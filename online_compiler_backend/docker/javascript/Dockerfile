FROM node:16-alpine3.11

WORKDIR /app

USER root

COPY . .

RUN chmod a+x ./main.js
RUN chmod a+x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]