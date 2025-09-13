const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Tenant = require('./models/Tenant');
const User = require('./models/User');


connectDB();

const seed = async () => {
  try {
    await Tenant.deleteMany();
    await User.deleteMany();

    const acme = await Tenant.create({ name: 'Acme Inc', slug: 'acme', plan: 'free' });
    const globex = await Tenant.create({ name: 'Globex Corp', slug: 'globex', plan: 'free' });

    await User.create([
      { email: 'admin@acme.test', password: 'password', role: 'admin', tenant: acme._id },
      { email: 'user@acme.test', password: 'password', role: 'member', tenant: acme._id },
      { email: 'admin@globex.test', password: 'password', role: 'admin', tenant: globex._id },
      { email: 'user@globex.test', password: 'password', role: 'member', tenant: globex._id },
    ]);

    console.log('Seeding successful');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
