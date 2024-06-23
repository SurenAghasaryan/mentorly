## HOW TO RUN THE PROJECT

Install docker https://docs.docker.com/engine/install/
Install docker-compose https://docs.docker.com/compose/install/

## Go to Mentorly directory and run docker compose file
RUN docker-compose docker-compose up --build 

# Run migrations
docker exec -it api-mentorly npm run migrate

# Run seeds
docker exec -it api-mentorly npm run seeds

# If you want to run it for development 
# Remove from docker-compose file
    image: surenagha/api-mentorly:1.0
# Add to docker-compose file
    add build: ./api
