/**
 * Script mock response cho Tada Driver
 * Xử lý riêng biệt cho 2 URL: set-online và status
 */

const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // 1. Xử lý cho URL set-online
    if (url.includes("/membersvc/api/v1/drivers/me/set-online")) {
      obj.ok = true;
      obj.online = true;
      obj.autoDispatch = true;
      obj.myDestinationDispatch = true;
    } 
    // 2. Xử lý cho URL status
    else if (url.includes("/dispatchsvc/v1/drivers/status")) {
      obj.online = true;
      obj.autoDispatch = true;
      obj.autoDispatchAvailable = true;
      obj.autoDispatchEligible = true;
      obj.myDestinationDispatch = true;
      obj.myDestinationAvailable = true;
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    $done({});
  }
} else {
  $done({});
}
