const Service = require("../models/service");

exports.createService = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      package_price,
      image,
      is_package,
      session_count
    } = req.body;

    if (!is_package) {
      session_count = null;
      package_price = null;
    } else {
      // ถ้ามี ต้องแปลงเป็นตัวเลข
      session_count = session_count ? Number(session_count) : null;
      package_price = package_price ? Number(package_price) : null;
    }

    const service = await Service.create({
      name,
      description,
      price,
      package_price,
      image,
      is_package,
      session_count
    });

    res.json({ message: "Service created successfully", data: service });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
