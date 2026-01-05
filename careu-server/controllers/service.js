const Service = require("../models/service");

// ------------------------------
// GET: All Services
// ------------------------------
exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { is_active: true }
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// GET: Service by ID
// ------------------------------
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "ไม่มีบริการนี้" });

    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ------------------------------
// PUT: Update Service
// ------------------------------
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "ไม่พบบริการนี้" });

    await service.update(req.body);

    res.json({
      message: "อัปเดตบริการสำเร็จ",
      service
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------------------
// DELETE: Soft Delete Service
// ------------------------------
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: "ไม่พบบริการนี้" });

    service.is_active = false;
    await service.save();

    res.json({ message: "ปิดการใช้งานบริการแล้ว" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
