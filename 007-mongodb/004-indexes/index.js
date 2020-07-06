const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);
const {Schema} = mongoose;

const dbName = 'mongoose_indexes';

const url = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});
mongoose.set('debug', true);

// B+ tree

const userSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
  aliases: [
    {
      type: String
    }
  ],
  login: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: 'email is required',
    match: /.*@.*/,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  foo: {
    bar: {
      baz: Boolean,
    }
  }
}, {});

userSchema.index({login: 1, password: -1});

const User = mongoose.model('user', userSchema);

(async function () {
  try {
    await User.deleteMany({});

    const paul = new User({
      name: 'Paul',
      email: 'paul@atredias.com',
      login: 'muaddib',
      dateOfBirth: new Date('2000-01-01'),
      password: 'alia',
      aliases: ["Usul", "Muad'Dib", "The Preacher"],
      foo: {
        bar: {
          baz: true,
        }
      }
    });

    await paul.save();

    paul.foo.bar.baz = false;
    await paul.save()

    paul.aliases.splice(1, 1);
    await paul.save()

    // paul.aliases[0] = '';
    // paul.markModified('aliases');
    // await paul.save();

  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect()
  }
})();

