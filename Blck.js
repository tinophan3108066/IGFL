/**
 * Script Blck.js - GSM Driver Mock
 * 1. Set stop_accept = false, auto_accept = false
 * 2. Chỉ giữ lại Green Express - Siêu tốc (EXPRESS-ONDEMAND)
 * 3. Bypass face verification (checkin_status = SUCCESS)
 */

const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // 1. Xử lý cài đặt tài khoản & lọc dịch vụ
    if (url.includes("/account-setting/v1/public/supplier/setting")) {
      if (obj.data) {
        // Ghi đè trạng thái nhận chuyến
        obj.data.stop_accept = false;
        obj.data.auto_accept = false;

        // Chỉ giữ lại Express Siêu tốc trong danh sách enable
        if (obj.data.services && Array.isArray(obj.data.services.enable)) {
          obj.data.services.enable = obj.data.services.enable.filter(
            item => item.name === "EXPRESS-ONDEMAND"
          );
        }
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
