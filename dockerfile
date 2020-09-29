FROM node:12.18.2

COPY ["package.json","package-lock.json", "/usr/src/app/"]

WORKDIR /usr/src/app

RUN ["npm", "install"]

COPY [".", "/usr/src/app"]

RUN ["npm", "run", "build"]

EXPOSE 7500

CMD ["npm", "run", "start"]
