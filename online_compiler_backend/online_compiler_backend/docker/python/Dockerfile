# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.
FROM python:3.8-alpine

WORKDIR /app

USER root

COPY . .

RUN apk add --no-cache bash
RUN chmod a+x ./main.py
RUN chmod a+x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
