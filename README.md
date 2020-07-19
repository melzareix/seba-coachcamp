# Seba CoachCamp
CoachCamp is a platform to help instructors connect to aspiring students looking to learn and enhance their soft skills by providing a solution that facilitates the connection between both parties.

## How to run
1. Clone this repo.
2. Make sure to have mongodb running, we recommend having docker and starting a mongodb container

    ```docker run --rm -d -p 27017:27017 mongo```
    
3. Start the backend by installing dependencies and then running it

     ```cd backend && npm install && npm run start:dev```

4. Start the frontend by installing dependencies and then running it

     ```cd frontend && npm install && npm start```

5. The frontend should now be running on http://localhost:3001
