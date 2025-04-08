import request from "supertest";
import app from "../server.js";
import { expect } from "chai";



describe("Running the api test",()=>{
    it("create User Signup",async()=>{
        const response = await request(app).post("/api/v1/signUp").send({name:"chandankumaryadav",email:"chandankumaryadav544@gamil.com",password:"Test@123"});

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message").that.equals("User created successfully")
    })
    // tested till here

    it("user login successfully",async ()=>{
        const response = await request(app).post("/api/v1/login").send({email: "chandankumaryadav544@gaml.comm", password: "Test@123"});

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message").that.equals("Login succcessfully")
    })

})