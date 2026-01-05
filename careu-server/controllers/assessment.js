// controllers/assessmentController.js
const Assessment = require("../models/Assessment");
const Booking = require("../models/booking");

exports.createOrUpdateAssessment = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const provider_id = req.user.id; // จาก token
    const {
      patient_name,
      patient_age,
      patient_dx,
      patient_disease,
      adl_scores,
      adl_total,
      adl_result_text,
      physical_data,
      progress_data
    } = req.body;

    // ตรวจสอบว่า Booking นี้เป็นของ provider จริงหรือไม่
    const booking = await Booking.findOne({
      where: { id: booking_id, provider_id }
    });

    if (!booking)
      return res.status(403).json({ message: "Access denied: Booking not yours" });

    // หา assessment เดิม
    let assessment = await Assessment.findOne({ where: { booking_id } });

    if (assessment) {
      // Update
      await assessment.update({
        patient_name,
        patient_age,
        patient_dx,
        patient_disease,
        adl_scores,
        adl_total,
        adl_result_text,
        physical_data,
        progress_data
      });

      return res.json({
        message: "Assessment updated successfully",
        data: assessment
      });
    }

    // Create ใหม่
    assessment = await Assessment.create({
      booking_id,
      provider_id,
      customer_id: booking.customer_id,
      patient_name,
      patient_age,
      patient_dx,
      patient_disease,
      adl_scores,
      adl_total,
      adl_result_text,
      physical_data,
      progress_data
    });

    res.json({
      message: "Assessment created successfully",
      data: assessment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getAssessmentByBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;

    const assessment = await Assessment.findOne({
      where: { booking_id }
    });

    if (!assessment)
      return res.status(404).json({ message: "No assessment found" });

    res.json(assessment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
