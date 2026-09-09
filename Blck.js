/**
 * Script Blck.js - GSM Driver Mock
 * 1. Chỉ giữ lại Green Express - Siêu tốc (EXPRESS-ONDEMAND), loại bỏ Xanh chuyến và Express 2H
 * 2. Bypass face verification (checkin_status = SUCCESS)
 */

const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // 1. Xử lý lọc dịch vụ: Chỉ giữ lại Express Siêu tốc
    if (url.includes("/account-setting/v1/public/supplier/setting")) {
      if (obj.data && obj.data.services && Array.isArray(obj.data.services.enable)) {
        obj.data.services.enable = obj.data.services.enable.filter(item => item.name === "EXPRESS-ONDEMAND");
      }
    } 
    // 2. Xử lý xác thực khuôn mặt
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
