const db = require('../config/db');
const { validationResult } = require('express-validator');

// Helper function to structure bookings with their associated tests
const structureBookingsWithTests = (rows) => {
    const bookingsMap = new Map();
    rows.forEach(row => {
        // Use the booking ID as the key
        const bookingId = row.booking_id || row.id;

        if (!bookingsMap.has(bookingId)) {
            bookingsMap.set(bookingId, {
                id: bookingId,
                full_name: row.full_name,
                email: row.email,
                phone: row.phone,
                appointment_type: row.appointment_type,
                appointment_date: row.appointment_date,
                time_slot: row.time_slot,
                total_price: row.total_price,
                created_at: row.created_at,
                address: row.address,
                city: row.city,
                zip_code: row.zip_code,
                locality: row.locality,
                status: row.status,
                discount_rate: row.discount_rate,
                tests: [],
            });
        }
        if (row.test_id) {
            bookingsMap.get(bookingId).tests.push({
                id: row.test_id,
                name: row.test_name,
                price: row.price,
                code: row.test_id,
            });
        }
    });
    return Array.from(bookingsMap.values());
};


// Handles creating a new booking
exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName, email, phone, appointmentType, appointmentDate, timeSlot,
    specialInstructions, address, city, zipCode, locality, paymentMethod, selectedTests, discountRate
  } = req.body;

  // Use a default value of 0 if discountRate is undefined or not a number
  const validDiscountRate = typeof discountRate === 'number' ? discountRate : 0;

  const testsTotal = selectedTests.reduce((total, test) => total + (Number(test.price) || 0), 0);
  const discountedTotal = testsTotal * (1 - validDiscountRate);
  const totalPrice = discountedTotal + (appointmentType === 'home-collection' ? 200 : 0);
  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');
    const bookingQuery = `
      INSERT INTO bookings (full_name, email, phone, appointment_type, appointment_date, time_slot, special_instructions, address, city, zip_code, locality, payment_method, total_price, discount_rate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id
    `;
    const bookingValues = [fullName, email, phone, appointmentType, appointmentDate, timeSlot, specialInstructions, address, city, zipCode, locality, paymentMethod, totalPrice, validDiscountRate];
    const bookingResult = await client.query(bookingQuery, bookingValues);
    const newBookingData = bookingResult.rows[0];
    const bookingId = newBookingData.id;

    const testInsertPromises = selectedTests.map(test => {
      const testQuery = 'INSERT INTO booking_tests (booking_id, test_id, test_name, price, category) VALUES ($1, $2, $3, $4, $5)';
      const testValues = [bookingId, test.id, test.name, test.price, test.category];
      return client.query(testQuery, testValues);
    });
    await Promise.all(testInsertPromises);


    await client.query('COMMIT');
        // --- NEW: EMIT REAL-TIME EVENT ---
const io = req.app.get('socketio');
    const finalBookingPayload = {
        ...newBookingData,
        tests: selectedTests
    };
    io.emit('new_booking', finalBookingPayload);

    res.status(201).json({ message: 'Booking created successfully', bookingId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error during booking creation' });
  } finally {
    client.release();
  }
};

// @desc    Edit a booking's details
// @route   PUT /api/bookings/:id
exports.editBooking = async (req, res) => {
  const { id } = req.params;
  const { fullName, phone, appointmentDate, timeSlot, tests } = req.body;

  if (!Array.isArray(tests)) {
      return res.status(400).json({ msg: 'Tests must be an array.' });
  }

  const client = await db.pool.connect();
  try {
      await client.query('BEGIN');

      // Step 1: Fetch the existing booking to get discount_rate and appointment_type
      const bookingDetailsResult = await client.query('SELECT discount_rate, appointment_type FROM bookings WHERE id = $1', [id]);
      if (bookingDetailsResult.rows.length === 0) {
          await client.query('ROLLBACK');
          return res.status(404).json({ msg: 'Booking not found.' });
      }
      const { discount_rate, appointment_type } = bookingDetailsResult.rows[0];

      // Step 2: Recalculate total price using the correct numeric conversion
      const testsTotal = tests.reduce((total, test) => total + (Number(test.price) || 0), 0);
      const discountedTotal = testsTotal * (1 - (discount_rate || 0));
      const newTotalPrice = discountedTotal + (appointment_type === 'home-collection' ? 200 : 0);

      // Step 3: Update the main booking record with new details and the recalculated price
      const updatedBookingResult = await client.query(
          'UPDATE bookings SET full_name = $1, phone = $2, appointment_date = $3, time_slot = $4, total_price = $5 WHERE id = $6 RETURNING *',
          [fullName, phone, appointmentDate, timeSlot, newTotalPrice, id]
      );

      // Step 4: Remove old tests associated with the booking
      await client.query('DELETE FROM booking_tests WHERE booking_id = $1', [id]);

      // Step 5: Insert the new list of tests
      const testInsertPromises = tests.map(test => {
          const testQuery = 'INSERT INTO booking_tests (booking_id, test_id, test_name, price, category) VALUES ($1, $2, $3, $4, $5)';
          const testValues = [id, test.id, test.name, test.price, test.category || null];
          return client.query(testQuery, testValues);
      });
      await Promise.all(testInsertPromises);

      await client.query('COMMIT');

      // Step 6: Emit a real-time event with the fully updated booking object
      const io = req.app.get('socketio');
      const finalUpdatedBooking = { ...updatedBookingResult.rows[0], tests };
      io.emit('booking_updated', finalUpdatedBooking);

      res.status(200).json(finalUpdatedBooking);
  } catch (err) {
      await client.query('ROLLBACK');
      console.error(err.message);
      res.status(500).send('Server Error');
  } finally {
      client.release();
  }
};

// Handles fetching all bookings for the admin dashboard
exports.getAllBookings = async (req, res) => {
  try {
    const query = `
        SELECT 
            b.id as booking_id, b.full_name, b.email, b.phone, b.appointment_type, 
            b.appointment_date, b.time_slot, b.total_price, b.created_at,
            b.address, b.city, b.zip_code, b.locality, b.status, b.discount_rate,
            bt.test_id, bt.test_name, bt.price
        FROM bookings b
        LEFT JOIN booking_tests bt ON b.id = bt.booking_id
        ORDER BY b.created_at DESC;
    `;
    const { rows } = await db.query(query);
    const structuredData = structureBookingsWithTests(rows);
    res.status(200).json(structuredData);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Handles finding bookings by phone number for the "Track Booking" page
exports.findBookingsByPhone = async (req, res) => {
    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    try {
      const query = `
        SELECT 
            b.id as booking_id, b.full_name, b.email, b.phone, b.appointment_type, 
            b.appointment_date, b.time_slot, b.total_price, b.created_at,
            b.address, b.city, b.zip_code, b.locality, b.discount_rate, -- Added discount_rate here
            bt.test_id, bt.test_name, bt.price
        FROM bookings b
        LEFT JOIN booking_tests bt ON b.id = bt.booking_id
        WHERE b.phone = $1
        ORDER BY b.created_at DESC;
      `;
      const { rows } = await db.query(query, [phone]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this phone number.' });
      }
      const structuredData = structureBookingsWithTests(rows);
      res.status(200).json(structuredData);
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ message: 'Server error while finding bookings' });
    }
};

// @desc    Get booking statistics grouped by city
// @route   GET /api/bookings/stats/by-city
exports.getBookingStatsByCity = async (req, res) => {
  try {
    const query = `
        SELECT city, COUNT(*) as count 
        FROM bookings 
        WHERE city IS NOT NULL AND city <> '' 
        GROUP BY city 
        ORDER BY count DESC;
    `;
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching location stats' });
  }
};

// @desc Get booking statistics based of Locality
// @route GET /api/stats/bookings-by-locality
exports.getBookingStatsByLocality = async (req, res) => {
  try {
    const query = `
        SELECT locality, COUNT(*) as count 
        FROM bookings 
        WHERE locality IS NOT NULL AND locality <> '' 
        GROUP BY locality
        ORDER BY count DESC;
    `;
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching locality stats' });
  }
};


// @desc    Update a booking's status
// @route   PUT /api/bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Basic validation for status
    if (status !== 'pending' && status !== 'completed') {
        return res.status(400).json({ msg: 'Invalid status value.' });
    }

    try {
        const { rows } = await db.query(
            'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Booking not found.' });
        }

        const updatedBooking = rows[0];

        // Emit a real-time event to all connected admins
        const io = req.app.get('socketio');
        io.emit('booking_updated', updatedBooking);

        res.status(200).json(updatedBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
exports.deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteOp = await db.query('DELETE FROM bookings WHERE id = $1', [id]);

        if (deleteOp.rowCount === 0) {
            return res.status(404).json({ msg: 'Booking not found.' });
        }

        // Emit a real-time event to all connected admins
        const io = req.app.get('socketio');
        io.emit('booking_deleted', parseInt(id, 10)); // Send the ID of the deleted booking

        res.status(200).json({ msg: 'Booking removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get booking statistics grouped by zip code
// @route   GET /api/bookings/stats/by-zipcode
exports.getBookingStatsByZipCode = async (req, res) => {
  try {
    const query = `
        SELECT zip_code, COUNT(*) as count 
        FROM bookings 
        WHERE zip_code IS NOT NULL AND zip_code <> '' 
        GROUP BY zip_code 
        ORDER BY count DESC;
    `;
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching zip code stats' });
  }
};

// @desc    Get booking statistics grouped by month
// @route   GET /api/bookings/stats/by-month
exports.getBookingStatsByMonth = async (req, res) => {
  try {
    const query = `
        SELECT 
            TO_CHAR(appointment_date, 'YYYY-MM') as month, 
            COUNT(*) as count 
        FROM bookings 
        GROUP BY month 
        ORDER BY month;
    `;
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching monthly stats' });
  }
};

// @desc    Get most popular tests
// @route   GET /api/bookings/stats/popular-tests
exports.getMostPopularTests = async (req, res) => {
  try {
    const query = `
        SELECT test_name, COUNT(*) as count 
        FROM booking_tests 
        GROUP BY test_name 
        ORDER BY count DESC 
        LIMIT 5;
    `;
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Server error while fetching popular tests' });
  }
};