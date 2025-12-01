const Booking = require("../models/booking");
const ProviderProfile = require("../models/providerProfile");
const CustomerProfile = require("../models/customerProfile");
const User = require("../models/user");
const Review = require("../models/Review");
const Service = require("../models/service");

exports.createBooking = async (req, res) => {
  try {
    const {
      service_id,
      description,
      extra_detail,
      location,
      latitude,
      longitude,
      date,
      time,
      province_name,
      district_name,
      subdistrict_name
    } = req.body;

    if (!service_id || !date || !time) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    if (!location) {
      return res.status(400).json({ message: "กรุณาเลือกสถานที่ให้ครบ" });
    }

    const service = await Service.findByPk(service_id);
    if (!service) {
      return res.status(404).json({ message: "ไม่พบบริการที่เลือก" });
    }

    const booking = await Booking.create({
      customer_id: req.user.id,
      service_id,
      description,
      extra_detail,
      location,
      latitude,
      longitude,
      date,
      time,
      province_name,
      district_name,
      subdistrict_name
    });

    res.json({ message: "สร้างรายการสำเร็จ", booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.subnitReview = async (req, res) => {
  try {
    const { booking_id, rating, comment } = req.body;
    const booking = await Booking.findByPk(booking_id);

    if (!booking || booking.status !== req.user.id) {
      return res.status(400).json({ message: "Unable to review work" });
    }

    const review = await Review.create({
      booking_id,
      rating,
      comment,
      customer_id: req.user.id,
      provider_id: booking.provider_id,
    });

    res.json({ message: "Review submitted successfully", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { customer_id: req.user.id },
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["id", "name", "email"]
        },
        {
          model: Service,
          as: "service",
          attributes: ["id", "name", "price"]   
        }
      ],
      order: [["date", "DESC"]]
    });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingDetail = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "name", "email"],
          include: [{ model: CustomerProfile }]
        },
        {
          model: User,
          as: "provider",
          attributes: ["id", "name", "email"],
          include: [{ model: ProviderProfile }]
        }
      ]
    });

    if (!booking) {
      return res.status(404).json({ message: "ไม่พบข้อมูลการจอง" });
    }

    // ป้องกันลูกค้าดูงานของคนอื่น
    if (booking.customer_id !== req.user.id) {
      return res.status(403).json({ message: "ไม่มีสิทธิ์เข้าถึงงานนี้" });
    }

    res.json(booking);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};













// provider
exports.getPendingBookings = async (req, res) => {
  try {
    // 1) หา provider profile ของผู้ใช้
    const provider = await ProviderProfile.findOne({ where: { user_id: req.user.id } });

    if (!provider || !provider.latitude || !provider.longitude) {
      return res.status(400).json({ message: "ไม่มีข้อมูลตำแหน่งผู้ให้บริการ" });
    }

    // 2) ดึงงานที่ยัง pending ทั้งหมด
    const bookings = await Booking.findAll({
      where: { status: "pending" },
    });

    const providerLat = provider.latitude;
    const providerLng = provider.longitude;

    // ฟังก์ชันแปลง degree → radian
    const toRad = (deg) => (deg * Math.PI) / 180;

    const result = bookings.map((b) => {
      if (!b.latitude || !b.longitude) {
        return { ...b.toJSON(), distance: null };
      }

      const dLat = toRad(b.latitude - providerLat);
      const dLon = toRad(b.longitude - providerLng);

      const lat1 = toRad(providerLat);
      const lat2 = toRad(b.latitude);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

      const R = 6371; // รัศมีโลก (km)
      const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return {
        ...b.toJSON(),
        distance: Number(distance.toFixed(2)),
      };
    });

    // 4) เรียงงานตามระยะทางใกล้ → ไกล
    result.sort((a, b) => (a.distance ?? 999999) - (b.distance ?? 999999));

    // 5) ส่งผลลัพธ์
    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking || booking.status !== "pending") {
      return res.status(400).json({ message: "ไม่สามารถรับงานนี้ได้" });
    }

    if (booking.customer_id === req.user.id) {
      return res.status(400).json({ message: "คุณไม่สามารถรับงานของตัวเองได้" });
    }

    booking.provider_id = req.user.id;
    booking.status = "accepted";
    await booking.save();

    res.json({ message: "รับงานสำเร็จ", booking });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setProviderLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "ต้องมี latitude และ longitude" });
    }

    const provider = await ProviderProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!provider) {
      return res.status(404).json({ message: "ไม่พบข้อมูลผู้ให้บริการ" });
    }

    provider.latitude = latitude;
    provider.longitude = longitude;

    await provider.save();

    res.json({ message: "อัปเดตตำแหน่งสำเร็จ", provider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.setProviderLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "ต้องมี latitude และ longitude" });
    }

    const provider = await ProviderProfile.findOne({
      where: { user_id: req.user.id }
    });

    if (!provider) {
      return res.status(404).json({ message: "ไม่พบข้อมูลผู้ให้บริการ" });
    }

    provider.latitude = latitude;
    provider.longitude = longitude;

    await provider.save();

    res.json({ message: "อัปเดตตำแหน่งสำเร็จ", provider });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyAcceptedJobs = async (req, res) => {
  try {
    const providerId = req.user.id;

    const jobs = await Booking.findAll({
      where: {
        provider_id: providerId,
        status: "accepted"
      }
    });

    res.json(jobs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProviderProfile = async (req, res) => {
  try {
    const provider = await ProviderProfile.findOne({
      where: { user_id: req.user.id },
      attributes: [
        "id",
        "nickname",
        "full_name",
        "phone",
        "email",
        "latitude",
        "longitude"
      ]
    });

    if (!provider) {
      return res.status(404).json({ message: "ไม่พบข้อมูลผู้ให้บริการ" });
    }

    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



