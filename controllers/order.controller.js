const orderModel = require("../models/order.model");
const nodemailer = require("nodemailer");

module.exports = {
  create: async (req, res) => {
    try {
      const data = req.body;
      const payload = {
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        note: data?.note,
        ...(data?.user?._id && { user: data?.user?._id }),
        cart: data?.cart?.map((e) => ({
          product: e?.info?._id,
          amount: e?.amount,
          type: e?.type,
        })),
      };

      const order = await orderModel.create(payload);

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "akingvietnam@gmail.com",
          pass: "wolvdaeobrvxnsjw",
        },
      });

      const total = () => {
        return data?.cart?.reduce((totalPrice, item) => {
          const itemPrice =
            Number(item?.info?.discountPrice) * Number(item.amount);
          return totalPrice + itemPrice;
        }, 0);
      };

      await transporter.sendMail({
        from: "akingvietnam@gmail.com",
        to: "akingvietnam@gmail.com",
        subject: `JINVAPE - ĐƠN HÀNG MỚI`,
        html: `<h1>Đơn hàng JINVAPE</h1>
        <p>Mã đơn hàng: ${order?._id}</p>
        <p>Khách hàng: ${data?.name}</p>
        <p>Số điện thoại: ${data?.phone}</p>
        <p>Địa chỉ: ${data?.address}</p>
        <p>Ghi chú: ${data?.note}</p>
        <h3>Thông tin đơn hàng:</h3>
        <table style="border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid black; padding: 8px;">Tên sản phẩm</th>
            <th style="border: 1px solid black; padding: 8px;">Loại</th>
            <th style="border: 1px solid black; padding: 8px;">Giá</th>
            <th style="border: 1px solid black; padding: 8px;">Số lượng</th>
            <th style="border: 1px solid black; padding: 8px;">Thành tiền</th>
          </tr>
          ${data?.cart
            .map(
              (item) => `
          <tr>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.info?.name
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.type
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item?.info?.discountPrice
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              item.amount
            }</td>
            <td style="border: 1px solid black; padding: 8px;">${
              Number(item.amount) * Number(item?.info?.discountPrice)
            }</td>
          </tr>
        `
            )
            .join("")}
            <tr>
              <td style="border: 1px solid black; padding: 8px; font-weight:600" colspan="4">Tổng tiền</td>
              <td style="border: 1px solid black; padding: 8px; font-weight:600">${total()}</td>
            </tr>
        </table>
        <p style="color: red;">Vui lòng vào website admin để xem thông tin chi tiết</p>
        `,
      });

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
