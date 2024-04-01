import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe("API Test", () => {

  test('Create Token', async ({ request }) => {
    const data = await GetAuthToken(request);
    console.log(data.token)
  })

  test('Get Booking All Ids', async ({ request }) => {
    const res = await request.get('https://restful-booker.herokuapp.com/booking', {
      headers: {
        "Content-Type": "application/json",
      }
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })

  test('Get Booking by first name and last name', async ({ request }) => {
    const fname = "Jane";
    const lname = "Doe";
    const url = `https://restful-booker.herokuapp.com/booking?firstname=${fname}&lastname=${lname}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })
  test('Get Booking by first Name', async ({ request }) => {
    const fname = "Jane";
    const url = `https://restful-booker.herokuapp.com/booking?firstname=${fname}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    // const data = await res.json();
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })
  test('Get Booking by last name', async ({ request }) => {
    const lname = "Doe";
    const url = `https://restful-booker.herokuapp.com/booking?lastname=${lname}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    // const data = await res.json();
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })

  test('Get Booking by Checkin and Checkout Date', async ({ request }) => {
    const checkin = "2018-01-01";
    const checkout = "2019-01-01";
    const url = `https://restful-booker.herokuapp.com/booking?checkin=${checkin}&checkout=${checkout}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })
  test('Get Booking by Checkin Date', async ({ request }) => {
    const checkin = "2018-01-01";
    const url = `https://restful-booker.herokuapp.com/booking?checkin=${checkin}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })
  test('Get Booking by Checkout Date', async ({ request }) => {
    const checkout = "2019-01-01";
    const url = `https://restful-booker.herokuapp.com/booking?checkout=${checkout}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })

  test('Get Booking by Id', async ({ request }) => {

    const n = getRandom(100, 200);
    console.log(n)
    const url = `https://restful-booker.herokuapp.com/booking/${n}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
  })

  test('Create Booking', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const url = "https://restful-booker.herokuapp.com/booking";
    for(var obj of jobj){
      const jsondata = obj

      const res = await request.post(url, {
        headers: {
          "Content-Type": "application/json",
        },
        data: jsondata
      });
      const data = await res.json();
      console.log(data)
      expect(res.ok()).toBeTruthy();
      expect(res.status()).toBe(200);
      expect(data.booking).toHaveProperty("firstname", obj.firstname);
      expect(data.booking).toHaveProperty("lastname", obj.lastname);
      expect(data.booking).toHaveProperty("totalprice", obj.totalprice);
      expect(data.booking.depositpaid).toBeTruthy();
      expect(data.booking.bookingdates).toHaveProperty("checkin", obj.bookingdates.checkin);
      expect(data.booking.bookingdates).toHaveProperty("checkout", obj.bookingdates.checkout);
      expect(data.booking).toHaveProperty("additionalneeds", obj.additionalneeds);
    } 
  })

  test('Update Booking with BasicAuth', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "103"

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const jsondata = jobj[2]

    console.log(jsondata)

    const res = await request.put(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
      },
      data: jsondata
    });
    const data = await res.json();
    console.log(data)
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
    expect(data).toHaveProperty("firstname", jobj[2].firstname);
    expect(data).toHaveProperty("lastname", jobj[2].lastname);
    expect(data).toHaveProperty("totalprice", jobj[2].totalprice);
    expect(data.depositpaid).toBeTruthy();
    expect(data.bookingdates).toHaveProperty("checkin", jobj[2].bookingdates.checkin);
    expect(data.bookingdates).toHaveProperty("checkout", jobj[2].bookingdates.checkout);
    expect(data).toHaveProperty("additionalneeds", jobj[2].additionalneeds);
  })

  test('Update Booking with the Cookies', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "103"

    const tokendata = await GetAuthToken(request);

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const jsondata = jobj[3]

    console.log(jsondata)

    const res = await request.put(url, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${tokendata.token}`
      },
      data: jsondata
    });
    const data = await res.json();
    console.log(data)
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
    expect(data).toHaveProperty("firstname", jobj[3].firstname);
    expect(data).toHaveProperty("lastname", jobj[3].lastname);
    expect(data).toHaveProperty("totalprice", jobj[3].totalprice);
    expect(data.depositpaid).toBeTruthy();
    expect(data.bookingdates).toHaveProperty("checkin", jobj[3].bookingdates.checkin);
    expect(data.bookingdates).toHaveProperty("checkout", jobj[3].bookingdates.checkout);
    expect(data).toHaveProperty("additionalneeds", jobj[3].additionalneeds);
  })

  test('PartialUpdate Booking with Basic Auth', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "103"

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const jsondata = {
      "totalprice": jobj[4].totalprice,
      "bookingdates":
            {
                "checkin": jobj[4].bookingdates.checkin,
                "checkout": jobj[4].bookingdates.checkout
            }
    };

    console.log(jsondata)

    const res = await request.patch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
      },
      data: jsondata
    });
    const data = await res.json();
    console.log(data)
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
    expect(data).toHaveProperty("totalprice", jobj[4].totalprice);
    expect(data.bookingdates).toHaveProperty("checkin", jobj[4].bookingdates.checkin);
    expect(data.bookingdates).toHaveProperty("checkout", jobj[4].bookingdates.checkout);
  })

  test('PartialUpdate Booking with Cookies', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "103"

    const tokendata = await GetAuthToken(request);

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const jsondata = {
      "totalprice": jobj[3].totalprice,
      "bookingdates":
            {
                "checkin": jobj[3].bookingdates.checkin,
                "checkout": jobj[3].bookingdates.checkout
            }
    };

    console.log(jsondata)

    const res = await request.patch(url, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${tokendata.token}`
      },
      data: jsondata
    });
    const data = await res.json();
    console.log(data)
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(200);
    expect(data).toHaveProperty("totalprice", jobj[3].totalprice);
    expect(data.bookingdates).toHaveProperty("checkin", jobj[3].bookingdates.checkin);
    expect(data.bookingdates).toHaveProperty("checkout", jobj[3].bookingdates.checkout);
  })

  test('Delete Booking with Basic Auth', async ({ request }) => {
    const id = "153"

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const res = await request.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
      },
    });
    
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(201);
  })

  test('Delete Booking with Cookies', async ({ request }) => {
    const id = "154"

    const tokendata = await GetAuthToken(request);

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const res = await request.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${tokendata.token}`
      },
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(201);
  })

  test('Health Check', async ({ request }) => {

    const url = "https://restful-booker.herokuapp.com/ping";

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(res.ok()).toBeTruthy();
    expect(res.status()).toBe(201);
  })

});

async function GetAuthToken(request) {
  const res = await request.post('https://restful-booker.herokuapp.com/auth', {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      "username": "admin",
      "password": "password123"
    }
  });
  const data = await res.json();
  expect(res.ok()).toBeTruthy();
  expect(res.status()).toBe(200);
  return data;
}

function getRandom(min, max) {
  const floatRandom = Math.random()
  const difference = max - min
  // random between 0 and the difference
  const random = Math.round(difference * floatRandom)
  const randomWithinRange = random + min
  return randomWithinRange
}