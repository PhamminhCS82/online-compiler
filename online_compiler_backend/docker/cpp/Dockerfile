FROM gcc:10-buster

WORKDIR /app

USER root

COPY . .

RUN chmod a+x ./main.cpp
RUN chmod a+x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]