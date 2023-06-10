# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /admin

# add `/app/node_modules/.bin` to $PATH
ENV PATH /admin/node_modules/.bin:$PATH

# COPY package.json and package-lock.json to ./
# COPY package.json package-lock.json ./
# install app dependencies
COPY . .
RUN npm install 

# add app
# COPY . ./

# Expose port
EXPOSE 3000

# start app
CMD ["npm", "run", "dev"]
