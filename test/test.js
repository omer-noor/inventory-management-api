const { response } = require("express");
const request = require("supertest");
const app = require("../start");

it("Create an inventory item", () => {
    return request(app)
      .post("/api/inventory")
      .send({
        
        itemname: "Test",
        description: "Description",
        price: 21.75,
        count: 555,
        image_src: null
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        id = response.body.id;
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            itemname: "Test",
            description: "Description",
            price: 21.75,
            count: 555,
            image_src: null  
            
          })
        );
      });
});

it("Get an inventory item", () => {
    return request(app)
      .get("/api/inventory")      
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {        
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  itemname: expect.any(String),
                  description: expect.any(String),
                  price: expect.any(Number),
                  count: expect.any(Number),
                  image_src: expect.anything(),                  
                }),
              ])            
          );
      });
});

it("Update an inventory item", () => {
    return request(app)
      .put(`/api/inventory/${id}`)
      .send({
        id: id,
        itemname: "New Name",
        description: "New Description",
        price: 22.75,
        count: 565,
        image_src: null
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        id = response.body.id;
        expect(response.body).toEqual(
          expect.objectContaining({            
            itemname: "New Name",
            description: "New Description",
            price: 22.75,
            count: 565,
            image_src: null            
          })
        );
      });
});


it("Delete an inventory item", () => {
    return request(app)
      .delete(`/api/inventory/${id}`)      
      .expect(200)     
     
});