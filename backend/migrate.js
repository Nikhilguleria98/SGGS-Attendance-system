const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' }); // load from backend dir
require('dotenv').config({ path: './.env.development' });

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const db = mongoose.connection.db;

    // 1. Rename 'groups' collection to 'sectionentities'
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (collectionNames.includes('groups') && !collectionNames.includes('sectionentities')) {
      await db.collection('groups').rename('sectionentities');
      console.log("Renamed 'groups' collection to 'sectionentities'.");
    } else if (collectionNames.includes('groups') && collectionNames.includes('sectionentities')) {
      // If sections already exists, move documents from groups to sectionentities
      const groupsDocs = await db.collection('groups').find().toArray();
      if (groupsDocs.length > 0) {
        await db.collection('sectionentities').insertMany(groupsDocs);
        await db.collection('groups').drop();
        console.log("Migrated documents from 'groups' to 'sectionentities' and dropped 'groups'.");
      }
    } else {
      console.log("'groups' collection does not exist or already migrated.");
    }

    // 2. Rename fields in 'users' collection
    const updateRes = await db.collection('users').updateMany(
      {},
      { $rename: { "groups": "sections", "group": "section" } }
    );
    console.log(`Renamed fields in users collection. Modified ${updateRes.modifiedCount} documents.`);

    console.log("Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
