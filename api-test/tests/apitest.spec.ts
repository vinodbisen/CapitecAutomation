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
    const data = await res.json();
    console.log(data)
  })

  test('Get Booking by Name', async ({ request }) => {
    const fname = "Jane";
    const lname = "Doe";
    const url = `https://restful-booker.herokuapp.com/booking?firstname=${fname}&lastname=${lname}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    console.log(data)
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
    const data = await res.json();
    console.log(data)
  })

  test('Get Booking by Id', async ({ request }) => {

    const n = getRandom(100, 110);
    console.log(n)
    const url = `https://restful-booker.herokuapp.com/booking/${n}`;

    console.log(url);

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    console.log(data)
  })

  test('Create Booking', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const url = "https://restful-booker.herokuapp.com/booking";

    const jsondata = jobj[0]

    console.log(jsondata)

    const res = await request.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
      data: jsondata
    });
    const data = await res.json();
    console.log(data)
  })

  test('Update Booking with Basic Auth', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "101"

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
  })

  test('Update Booking with Cookies', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "101"

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
  })

  test('Partial Update Booking with Basic Auth', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "101"

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const jsondata = {
      "totalprice": jobj[4].totalprice,
      "bookingdates":
            {
                "checkin": jobj[4].bookingdates.checkin,
                "checkout": jobj[4].bookingdates.checkout
            },
        "additionalneeds": jobj[4].bookingdates.additionalneeds
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
  })

  test('Partial Update Booking with Cookies', async ({ request }) => {

    const fs = require('fs');
    const filedata = fs.readFileSync(path.resolve(__dirname, './data/newdata.json'), 'utf8');
    const jobj = JSON.parse(filedata);

    const id = "95"

    const tokendata = await GetAuthToken(request);

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const jsondata = {
      "totalprice": jobj[3].totalprice,
      "bookingdates":
            {
                "checkin": jobj[3].bookingdates.checkin,
                "checkout": jobj[3].bookingdates.checkout
            },
        "additionalneeds": jobj[3].bookingdates.additionalneeds
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
  })

  test('Delete Booking with Basic Auth', async ({ request }) => {
    const id = "101"

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const res = await request.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
      },
    });
    const data = await res.json();
    console.log(data)
  })

  test('Delete Booking with Cookies', async ({ request }) => {
    const id = "101"

    const tokendata = await GetAuthToken(request);

    const url = `https://restful-booker.herokuapp.com/booking/${id}`;

    const res = await request.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${tokendata.token}`
      },
    });
    const data = await res.json();
    console.log(data)
  })

  test('Health Check', async ({ request }) => {

    const url = "https://restful-booker.herokuapp.com/ping";

    const res = await request.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status())
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