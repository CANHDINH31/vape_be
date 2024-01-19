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
        user: data?.user?._id,
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
          user: "dinhphamcanh@gmail.com",
          pass: "zimxlcsohmqvqmto",
        },
      });

      await transporter.sendMail({
        from: "dinhphamcanh@gmail.com",
        to: "dinhphamcanh@gmail.com",
        subject: `JINVAPE - ĐƠN HÀNG MỚI`,
        html: `<h1>Đơn hàng JINVAPE</h1>
        <p>Mã đơn hàng: ${order?._id}</p>
        <p>Khách hàng: ${data?.name}</p>
        <p>Số điện thoại: ${data?.phone}</p>
        <p>Địa chỉ: ${data?.address}</p>
        <p>Ghi chú: ${data?.note}</p>
        <p>Vui lòng vào website admin đẻ xem thông tin chi tiết</p>
        `,
      });

      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
