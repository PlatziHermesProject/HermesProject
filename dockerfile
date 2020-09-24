FROM node:12.18.2

COPY ["package.json","package-lock.json", "/usr/src/app/"]

WORKDIR /usr/src/app

RUN ["npm", "install"]

COPY [".", "/usr/src/app"]

RUN ["npm", "run", "build"]

COPY ["./dist", "/usr/src/app/dist"]

EXPOSE 3000

CMD ["npm", "run", "start"]
