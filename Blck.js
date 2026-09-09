/**
 * Script Blck.js - GSM Driver Mock
 * 1. Tắt Green Express - Siêu tốc & Green Express - 2H
 * 2. Bypass face verification (checkin_status = SUCCESS)
 */

const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // 1. Xử lý tắt dịch vụ Express Siêu tốc và Express 2H
    if (url.includes("/account-setting/v1/public/supplier/setting")) {
      if (obj.data && obj.data.services && Array.isArray(obj.data.services.enable)) {
        // Loại bỏ các dịch vụ có name là EXPRESS-ONDEMAND hoặc EXPRESS-SAMEDAY
        obj.data.services.enable = obj.data.services.enable.filter(item => {
          const name = item.name || "";
          return name !== "EXPRESS-ONDEMAND" && name !== "EXPRESS-SAMEDAY";
        });
      }
    } 
    // 2. Xử lý xác thực khuôn mặt (checkin_status = SUCCESS)
    else if (url.includes("/account/v1/public/supplier/face-verification")) {
      if (obj.data) {
        obj.data.checkin_status = "SUCCESS";
        obj.data.checkin_matching_rate = 100;
      }
    }

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    $done({});
  }
} else {
  $done({});
}
