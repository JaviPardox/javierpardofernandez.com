# Make production build
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=3072"
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Run Nginx with build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"] 