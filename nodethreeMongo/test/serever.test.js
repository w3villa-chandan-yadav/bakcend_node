import request from "supertest"
import app from "../server.js"
import { expect } from "chai";

describe("Expected API",()=>{
    it("it should return User created successfully",async()=>{
        const response = await request(app).get("/api/v1/userLogin");

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message").that.equals("User created successfully")
    })

    it("return a created user",async ()=>{
        const response = await request(app).post("/api/v1/createUser").send({userName:"anda", fullName:"xyz"});

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message").that.equals("User created successfully")
    })
})


// const userPayload = {
//     userName: 'johndoe',
//     fullName: 'John Doe'
//   };

//   // Send POST request to create a new user
//   const response = await request(app)
//     .post('/api/users')
//     .send(userPayload);  // Send the user data in the request body

//   // Assertions
//   expect(response.status).to.equal(200);  // Check that status is 200
//   expect(response.body).to.have.property('success').that.equals(true);  // Check success flag
//   expect(response.body).to.have.property('message').that.equals('User created successfully');  // Check message
//   expect(response.body).to.have.property('newUser');  // Check if the newUser object is present
//   expect(response.body.newUser).to.have.property('userName').that.equals('johndoe');  // Check if the newUser has the correct userName
//   expect(response.body.newUser).to.have.property('fullName').that.equals('John Doe');  // Check if the newUser has the correct fullName
//   expect(response.body.newUser).to.have.property('id');  // Ensure the user has an id (even if it's a mock)
// });