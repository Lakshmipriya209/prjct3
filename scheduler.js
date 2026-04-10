const cron = require("node-cron");
const db = require("./db");
const sendEmail = require("./services/emailService");
const sendSMS = require("./services/smsService");

// ⏰ DAILY
cron.schedule("*/10 * * * * *", () => {

  console.log("Running daily notification");

  db.query("SELECT * FROM farmers WHERE notify_type='daily'", (err, users) => {

    if(err){
      console.log(err);
      return;
    }

    // ✅ LOOP THROUGH USERS
    users.forEach(user => {

      console.log("User:", user.phone, user.email);

      // ✅ SMS
      if(user.phone){
        console.log("Sending SMS to:", user.phone);
        sendSMS(
          user.phone,
          "🌱 Irrigation Reminder: Check your farm today"
        );
      }

      // ✅ EMAIL (FIXED)
      if(user.email){
        console.log("Sending Email to:", user.email);
        const message = user.notify_type === "daily"
  ? "🌱 Check irrigation today"
  : "🌾 Irrigation reminder";

sendSMS(user.phone, message);
      }

    });

  });

});


// ⏰ WEEKLY
cron.schedule("*/10 * * * * *", () => {

  console.log("Running weekly notification");

  db.query("SELECT * FROM farmers WHERE notify_type='weekly'", (err, users) => {

    if(err){
      console.log(err);
      return;
    }

    // ✅ LOOP THROUGH USERS
    users.forEach(user => {

      console.log("User:", user.phone, user.email);

      if(user.phone){
        console.log("Sending SMS to:", user.phone);
        sendSMS(
          user.phone,
          "🌱 Irrigation Reminder: Check your farm today"
        );
      }

      if(user.email){
        console.log("Sending Email to:", user.email);
        sendEmail(
          user.email,
          "Weekly Reminder",
          "🌾 Weekly irrigation reminder"
        );
      }

    });

  });

});


// ⏰ MONTHLY
cron.schedule("*/10 * * * * *", () => {

  console.log("Running monthly notification");

  db.query("SELECT * FROM farmers WHERE notify_type='monthly'", (err, users) => {

    if(err){
      console.log(err);
      return;
    }

    // ✅ LOOP THROUGH USERS
    users.forEach(user => {

      console.log("User:", user.phone, user.email);

      if(user.phone){
        console.log("Sending SMS to:", user.phone);
        sendSMS(
          user.phone,
          "🌱 Irrigation Reminder: Check your farm today"
        );
      }

      if(user.email){
        console.log("Sending Email to:", user.email);
        sendEmail(
          user.email,
          "Monthly Reminder",
          "🌿 Monthly irrigation report"
        );
      }

    });

  });

});