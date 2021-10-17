FROM openjdk:11

WORKDIR /app

USER root

COPY . .

RUN chmod a+x ./main.java
RUN chmod a+x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]