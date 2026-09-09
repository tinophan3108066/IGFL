/**
 * Script mock response Tada Driver
 * Tự động set online: true và giữ nguyên thông tin vị trí
 */

let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // Ghi đè trạng thái online
    obj.ok = true;
    obj.online = true;

    $done({ body: JSON.stringify(obj) });
  } catch (e) {
    // Nếu chưa có body hoặc parse lỗi, trả về JSON chuẩn
    let defaultResponse = {
      "ok": true,
      "online": true,
      "autoDispatch": true,
      "myDestinationDispatch": true,
      "myDestinationPoint": {
        "latitude": 10.794218063354492,
        "longitude": 106.6304931640625,
        "name": "273 Trương Vĩnh Ký",
        "address": "273 Trương Vĩnh Ký, Tân Sơn Nhì, Tân Phú, Thành phố Hồ Chí Minh, Việt Nam",
        "savedLocationId": "ChIJcaIIQVUpdTERRKNsfhdeBS4",
        "heading": null,
        "accuracy": null,
        "tmilliSecond": null
      },
      "hotpotDispatch": false,
      "petServiceAvailable": false
    };
    $done({ body: JSON.stringify(defaultResponse) });
  }
} else {
  $done({});
}
