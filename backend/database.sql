-- Create a table for test bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    appointment_type VARCHAR(50) NOT NULL,
    appointment_date DATE,
    time_slot VARCHAR(50),
    special_instructions TEXT,
    address VARCHAR(255),
    city VARCHAR(100),
    zip_code VARCHAR(20),
    payment_method VARCHAR(50) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    location_id INTEGER REFERENCES locations(id),
    locality VARCHAR(100)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for the tests associated with each booking
CREATE TABLE booking_tests (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    test_id VARCHAR(50) NOT NULL,
    test_name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(255)
);

-- Create a table to store admin user credentials
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a table to store lab locations
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    operating_hours VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add the location reference to bookings table
ALTER TABLE bookings
ADD COLUMN location_id INTEGER REFERENCES locations(id);

-- Status column to your bookings table
ALTER TABLE bookings
ADD COLUMN status VARCHAR(50) DEFAULT 'pending' NOT NULL;

-- Create a table for contact form submissions
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    service_interest VARCHAR(100),
    message TEXT NOT NULL,
    newsletter BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add the locality column to the bookings table
ALTER TABLE bookings
ADD COLUMN locality VARCHAR(100);