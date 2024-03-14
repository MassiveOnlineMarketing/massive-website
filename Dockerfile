FROM node:20.9

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]


# docker build -t docker-massive-redo .
# docker run -p 3000:3000 -v ${PWD}:/app docker-massive-redo

# docker login
# docker tag docker-massive-redo:latest yourusername/docker-massive-redo:latest
# docker push yourusername/docker-massive-redo:latest

# docker pull yourusername/docker-massive-redo:latest
# docker run -p 3000:3000 yourusername/docker-massive-redo:latest
